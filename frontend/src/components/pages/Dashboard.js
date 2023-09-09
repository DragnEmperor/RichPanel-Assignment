import React, { useContext, useEffect, useState } from "react";
import DashboardBody from "../dashboardBody/DashBoardBody";
import { AuthContext } from "../auth/context";
import { toast } from "react-hot-toast";
import axios from "axios";
import SideBar from "../sidebar/SideBar";

const Dashboard = () => {

    const {getAuthUser, getFBToken,getFBPageData} = useContext(AuthContext);
    const user = getAuthUser();
    const [pageConversations,setPageConversations] = useState([]);
    const fbAccessToken = getFBToken();
    const fbPageData = getFBPageData();

    const getPageConversations=async()=>{
       const response = await axios.post('https://localhost:5000/facebook/getConversations',{pageId:fbPageData?.id});
       console.log('dashboard',response);
       setPageConversations(response.data.conversations);
    }

      useEffect(()=>{
        if(user!==null)
        toast.success('Welcome to Dashboard');
      },[user])

      useEffect(()=>{
        if(fbPageData?.name.length>1)
          getPageConversations();
      },[])

    return (
        <section className="flex w-screen h-screen">
            <SideBar/>
            <DashboardBody pageConversations={pageConversations}/>
        </section>
    )
}

export default Dashboard;