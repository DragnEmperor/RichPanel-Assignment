import React, { useContext, useEffect, useState } from "react";
import DashboardBody from "../dashboardBody/DashBoardBody";
import { AuthContext } from "../auth/context";
import SideBar from "../sidebar/SideBar";
import { backend_url } from "../auth/api";
import axios from "axios";
import io from 'socket.io-client';

const Dashboard = () => {
    const socket = io.connect(backend_url);

    const { getAuthUser, getFBPageData, getPageConversations } = useContext(AuthContext);
    // const user = getAuthUser();
    const [pageConversations, setPageConversations] = useState([]);
    const [loginUserImage, setLoginUserImage] = useState('');
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
            const usrPic = conversationsWithPicUrl?.[0]?.participants?.find((participant) => participant.id === fbPageData?.id)?.picUrl;
            setLoginUserImage(usrPic);
            localStorage.setItem('fbConvData', JSON.stringify(conversationsWithPicUrl))
            setPageConversations(conversationsWithPicUrl);
        }
    }

    const updateConversation = async (newMessages, convId) => {
        const allConversations = JSON.parse(localStorage.getItem('fbConvData'));
        const updatedConv = allConversations?.map((conversation) => {
            if (conversation.conversationId === convId) {
                return {
                    ...conversation,
                    messages: newMessages
                }
            }
            return conversation;
        });
        setPageConversations(updatedConv);
    }

    const reloadConversations = async (id, token) => {
        const data = await getPageConversations(id, token);
        setConversationswithUrl(data);
        await axios.post(backend_url + 'facebook/reloadConversations', { fbPageData });
        const data2 = await getPageConversations(id, token);
        setConversationswithUrl(data2);
    }

    useEffect(() => {
        if (fbPageData?.name.length > 1) {
            reloadConversations(fbPageData?.id, fbPageData?.access_token);
        }
    }, [])


    return (
        <section className="flex w-screen h-screen">
            <SideBar picUrl={loginUserImage} />
            <DashboardBody socket={socket} pageConversations={pageConversations} reloadConversations={reloadConversations} updateConversation={updateConversation} />
        </section>
    )
}

export default Dashboard;