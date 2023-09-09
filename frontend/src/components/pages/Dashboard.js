import React, { useContext, useEffect, useState } from "react";
import DashboardBody from "../dashboardBody/DashBoardBody";
import { AuthContext } from "../auth/context";
import { toast } from "react-hot-toast";
import SideBar from "../sidebar/SideBar";

const Dashboard = () => {

    const { getAuthUser, getFBPageData, getPageConversations } = useContext(AuthContext);
    const user = getAuthUser();
    const [pageConversations, setPageConversations] = useState([]);
    // const fbAccessToken = getFBToken();
    const fbPageData = getFBPageData();

    const setConversationswithUrl = async (data) => {
        if (data) {
            const conversationsWithPicUrl = await Promise.all(
                data?.map(async (conversation) => {
                    const participantsWithPicUrl = await Promise.all(
                        conversation.participants.map(async (participant) => {
                            const response = await fetch(`https://graph.facebook.com/${participant.id}/?fields=picture{url}&access_token=${fbPageData?.access_token}`);
                            const data = await response.json();
                            return {
                                ...participant,
                                picUrl: data?.picture?.data.url
                            };
                        })
                    );

                    return {
                        ...conversation,
                        participants: participantsWithPicUrl
                    };
                })
            );
            setPageConversations(conversationsWithPicUrl);
        }
    }

    const reloadConversations = async (id, token) => {
        const data = await getPageConversations(id, token);
        setConversationswithUrl(data);
    }
    useEffect(() => {
        if (fbPageData?.name.length > 1) {
            reloadConversations(fbPageData?.id, fbPageData?.access_token);
        }
    }, [])


    return (
        <section className="flex w-screen h-screen">
            <SideBar />
            <DashboardBody pageConversations={pageConversations} reloadConversations={reloadConversations} />
        </section>
    )
}

export default Dashboard;