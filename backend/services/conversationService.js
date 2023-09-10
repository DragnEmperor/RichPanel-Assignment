const axios = require('axios');
const Conversation = require('../models/conversationSchema');
const mongoose = require('mongoose');


const processConversations = async (fbPageData) => {
    const session = await mongoose.startSession();
    try {
        const response = await axios.get(`https://graph.facebook.com/${fbPageData?.id}/conversations?fields=participants,messages{id,message,created_time,from,to}&access_token=${fbPageData?.access_token}`);
        const pageConversations = response.data.data.map((item) => {
            return {
                convId: item.id,
                messages: item.messages.data,
                participants: item.participants.data
            }
        })
        pageConversations.forEach((conversation) => {
            conversation.messages.sort((a, b) => {
                const timeA = new Date(a.created_time).getTime();
                const timeB = new Date(b.created_time).getTime();
                return timeA - timeB;
            });
        });
        for (const conversation of pageConversations) {
            const existingConversation = await Conversation.findOne({ conversationId: conversation.convId });
            if (existingConversation) {
                const lastMessageExisting = existingConversation.messages[existingConversation.messages.length - 1];
                const cutoffTime = new Date(lastMessageExisting.created_time).getTime() // 24 hours in ms
                // Find the messages that has created_time more than 24 hours
                const newMessages = conversation.messages.filter((message) => {
                    const messageTime = new Date(message.created_time).getTime();
                    return messageTime > (cutoffTime + 24 * 60 * 60 * 1000);
                });

                if (newMessages.length > 0) {
                    session.startTransaction();
                    const newConversation = new Conversation({
                        pageId: fbPageData?.id,
                        conversationId: conversation.convId,
                        messages: newMessages,
                        participants: conversation.participants
                    });
                    await newConversation.save({ session })
                    await session.commitTransaction();
                }
                const oldMessages = conversation.messages.filter((message) => {
                    const messageTime = new Date(message.created_time).getTime();
                    return ((messageTime - cutoffTime) > 0 && (messageTime <= (cutoffTime + 24 * 60 * 60 * 1000)));
                });
                if (oldMessages.length > 0) {
                    session.startTransaction();
                    existingConversation.messages.push(...oldMessages);
                    await existingConversation.save({ session });
                    await session.commitTransaction();
                }
                continue;
            }
            session.startTransaction();
            const newConversation = new Conversation({
                pageId: fbPageData?.id,
                conversationId: conversation.convId,
                messages: conversation.messages,
                participants: conversation.participants
            });
            await newConversation.save({ session });
            await session.commitTransaction();
        }
        session.endSession();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const fetchMessages = async (convId, pageToken) => {
    try {
        const url = `https://graph.facebook.com/${convId}?fields=messages{id,message,created_time,from,to}&access_token=${pageToken}`
        const response = await axios.get(url);
        let latestMessagesconversation = response.data.messages.data
        latestMessagesconversation.sort((a, b) => {
            const timeA = new Date(a.created_time).getTime();
            const timeB = new Date(b.created_time).getTime();
            return timeA - timeB;
        });
        return latestMessagesconversation;
    }
    catch (error) {
        console.log(error);
    }
}

const sendMessage = async (receiverId, text, pageData) => {
    try {
        const queryParams = new URLSearchParams({
            recipient: JSON.stringify({ id: receiverId }),
            message: JSON.stringify({ text }),
            messaging_type: 'RESPONSE',
            access_token: pageData.access_token
        });
        const url = `https://graph.facebook.com/${pageData.id}/messages?${queryParams}`;
        const response = await fetch(url, {
            method: 'POST',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { processConversations, fetchMessages, sendMessage };