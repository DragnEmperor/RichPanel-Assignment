const axios = require('axios');
const Conversation = require('../models/conversationSchema');
const mongoose = require('mongoose');


const processConversations=async(fbPageData)=>{
    const session = await mongoose.startSession();
    try{
    const response = await axios.get(`https://graph.facebook.com/${fbPageData?.id}/conversations?fields=participants,messages{id,message,created_time,from,to}&access_token=${fbPageData?.access_token}`);
    const pageConversations = response.data.data.map((item)=>{
        return {
            convId:item.id,
            messages:item.messages.data,
            participants:item.participants.data
        }
    })
    pageConversations.forEach((conversation) => {
        conversation.messages.sort((a, b) => {
            const timeA = new Date(a.created_time).getTime();
            const timeB = new Date(b.created_time).getTime();
            return timeA - timeB;
        });
    });
    for (const conversation of pageConversations){
        const existingConversation = await Conversation.findOne({conversationId:conversation.convId});
        if(existingConversation){
            const lastMessageExisting = existingConversation.messages[existingConversation.messages.length - 1];
            const cutoffTime = new Date(lastMessageExisting.created_time).getTime() + 24 * 60 * 60 * 1000; // 24 hours in ms
             // Find the index of the message that has created_time more than 24 hours
            const newIndex = conversation.messages.findIndex((message) => {
                const messageTime = new Date(message.created_time).getTime();
                return messageTime > cutoffTime;
            });

            if (newIndex !== -1) {
                // Create a new conversation starting from the new index
                session.startTransaction();
                const newMessages = conversation.messages.slice(newIndex);
                const newConversation = new Conversation({
                    pageId: fbPageData?.id,
                    conversationId: conversation.convId,
                    messages: newMessages,
                    participants: conversation.participants
                });
                await newConversation.save({session});
                await session.commitTransaction();
            }
            continue;
        }
        session.startTransaction();
        const newConversation = new Conversation({
            pageId:fbPageData?.id,
            conversationId:conversation.convId,
            messages:conversation.messages,
            participants:conversation.participants
        });
        await newConversation.save({session});
        await session.commitTransaction();
    }
    session.endSession();
    return true;
}catch(error){
    console.log(error);
    return false;
}
}

module.exports = { processConversations };