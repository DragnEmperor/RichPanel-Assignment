import React, { useContext, useEffect, useState } from "react";
import Conversations from "../Conversations/ConversationList";
import ConversationBody from "../Conversations/ConversationBody";
import UserDetails from "../UserDetails/UserDetails";
import { AuthContext } from "../auth/context";
import { backend_url } from "../auth/api";


const Dashboard = ({pageConversations,reloadConversations,updateConversation,socket}) => {

   const [selectedConversation, setSelectedConversation] = useState(null);
   const [displayConversation, setDisplayConversation] = useState(null);
   const {getFBPageData} = useContext(AuthContext);

   const fbPageData = getFBPageData();

   const conversationHandler = async(index) => {
    setSelectedConversation(index);
    setDisplayConversation(pageConversations[index]);
    socket.emit('convSelected',{convId:pageConversations?.[index]?.conversationId, pageData:fbPageData})
   }

   useEffect(()=>{
    if(!!selectedConversation)
    setDisplayConversation(pageConversations[selectedConversation]);
   },[pageConversations])

   const newPageConversations = pageConversations.map((conversation,index)=>({
    ...conversation,
    type:'dm'
   }));

    return (
        <section className="flex w-full h-full text-gray-800">
            <div className="flex flex-col w-1/4">
                <Conversations pageConversations={newPageConversations} setSelectedConversation={conversationHandler} selectedConversation={selectedConversation} reloadConversations={reloadConversations}/>
            </div>

            <div className="flex flex-col w-1/2 border-x-2 border-gray-300">
              <ConversationBody displayConversation={displayConversation}
              socket={socket} updateConversation={updateConversation}/>
            </div>

            <div className="flex flex-col w-1/4">
             <UserDetails displayConversation={displayConversation}/>
            </div>
        </section>
    )
}

export default Dashboard;