import { useContext } from "react";
import { AuthContext } from "../auth/context";

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedDate = `${month} ${day}, ${formattedHours}:${formattedMinutes} ${amOrPm}`;
  
    return formattedDate;
  }

const Message = ({ message, participants }) => {
    const { getFBPageData } = useContext(AuthContext);
    const formattedTime = formatDate(message?.created_time);
    const pageData = getFBPageData();
    const senderPic = (participants?.find((item)=>item.id!==pageData?.id))?.picUrl;
    const receiverPic = (participants?.find((item)=>item.id===pageData?.id))?.picUrl;

    return (
        <div className={` w-fit py-2 ${message?.from.id===pageData.id ? " ml-auto mr-6" : "ml-6 "}`}>
            <div className={`flex gap-2 ${message?.from.id===pageData.id ? " flex-row-reverse " : ""}`}>
                <div className="relative top-2">
                    <img src={message?.from.id===pageData.id ? receiverPic: senderPic} alt="user-icon" className="w-10 h-10 object-cover rounded-full" />
                </div>
                <div>
                    <div className="bg-white p-4 border-2 rounded-lg">
                    <p className="text-lg font-semibold">{message?.message}</p>
                    </div>
                    <p className="pt-1">
                        <span className="font-semibold">{message?.from.name}</span> - {formattedTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Message;