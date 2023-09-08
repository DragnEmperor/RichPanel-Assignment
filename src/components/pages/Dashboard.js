import React, { useState } from "react";
import { BsInboxFill, BsGraphUpArrow } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import {VscAzure} from 'react-icons/vsc';
import DashboardBody from "../dashboardBody/DashBoardBody";

const Dashboard = () => {

    const [activeIndex, setActiveIndex] = useState(1);

    const contentHandler = (value) => {
        setActiveIndex(value);
    }

    return (
        <section className="flex w-screen h-screen">
            <div className="flex flex-col justify-between h-full bg-[#004c94] w-24 pb-10">
                <div className="flex flex-col gap-2">
                    <button
                        onClick={(e)=>contentHandler(0)}
                        className={`text-center p-6 ${activeIndex === 0 ? "text-[#004c94] bg-white" : "text-white"}`}>
                        <VscAzure className={`h-8 w-8`} />
                    </button>
                    <button
                        onClick={(e)=>contentHandler(1)}
                        className={`text-center p-6 ${activeIndex === 1 ? "text-[#004c94] bg-white" : "text-white"}`}>
                        <BsInboxFill className={`h-8 w-8`} />
                    </button>
                    <button
                        onClick={(e)=>contentHandler(2)}
                        className={`text-center p-6 ${activeIndex === 2 ? "text-[#004c94] bg-white" : "text-white"}`}>
                        <BsGraphUpArrow className={`h-8 w-8`} />
                    </button>
                    <button
                        onClick={(e)=>contentHandler(3)}
                        className={`text-center p-6 ${activeIndex === 3 ? "text-[#004c94] bg-white" : "text-white"}`}>
                        <IoMdContacts className={`h-8 w-8`} />
                    </button>
                </div>
                <div className="relative">
                    <img
                    className="w-10 h-10 rounded-full mx-auto object-cover cursor-pointer"
                    src="https://images.unsplash.com/photo-1693693928634-658db91ca093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                    alt="user-profile-pic"
                    />
                    <div className="absolute bottom-0 right-1/3 bg-green-500 w-3 h-3 rounded-full"></div>
                </div>
            </div>
            <DashboardBody/>
        </section>
    )
}

export default Dashboard;