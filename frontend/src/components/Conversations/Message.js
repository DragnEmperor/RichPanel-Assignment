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

const Message = ({ message }) => {
    const { getFBPageData } = useContext(AuthContext);
    const formattedTime = formatDate(message?.created_time);
    const pageData = getFBPageData();

    console.log(message)
    return (
        <div className={` w-fit ${message?.from.id===pageData.id ? " ml-auto mr-6" : "ml-6 "}`}>
            <div className={`flex gap-2 ${message?.from.id===pageData.id ? " flex-row-reverse " : ""}`}>
                <div className="relative top-2">
                    <img src="https://images.unsplash.com/photo-1693693928634-658db91ca093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="user-icon" className="w-10 h-10 object-cover rounded-full" />
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