import React, { useState } from "react";
import Conversations from "../Conversations/ConversationList";


const Dashboard = () => {

 

    return (
        <section className="flex w-full h-full text-gray-800">
            <div className="flex flex-col w-1/4">
                <Conversations/>
            </div>

            <div className="flex flex-col w-1/2">

            </div>

            <div className="flex flex-col w-1/4">

            </div>
        </section>
    )
}

export default Dashboard;