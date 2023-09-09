import { BiPhoneCall, BiSolidUserCircle } from 'react-icons/bi';
import { AuthContext } from '../auth/context';
import { useContext } from 'react';

const UserDetails = ({ displayConversation }) => {

    const {getFBPageData} = useContext(AuthContext);
    const pageData = getFBPageData();

    const senderDetails = (displayConversation?.participants?.find((item)=>item.id!==pageData?.id));
    console.log('userDetails', senderDetails);
    let userName = senderDetails?.name;
    userName = userName?.split(' ')
    const firstName =userName?.[0];
    const lastName = userName?.slice(1).join(' ');;

    return (
        <div className="flex flex-col text-gray-700 h-full">
            <div className="bg-white flex flex-col items-center gap-4 py-10 px-28">
                <img src={senderDetails?.picUrl} alt="user-details-pic" className="w-20 h-20 rounded-full object-cover" />
                <div className="text-center">
                    <p className="font-semibold text-2xl">{firstName}</p>
                    <ul className="list-disc ml-4">
                        <li className="text-gray-600 text-base font-semibold">Offline</li>
                    </ul>
                </div>
                <div className="flex w-full gap-4 ">
                    <button className=" p-1 px-4 border-2 text-xl flex items-center justify-center font-semibold rounded-lg">
                        <BiPhoneCall className='w-7 h-7 pr-1' />
                        Call
                    </button>
                    <button className=" p-1 px-4 border-2 text-xl flex items-center justify-center font-semibold rounded-lg">
                        <BiSolidUserCircle className='w-7 h-7 pr-1' />
                        Profile
                    </button>
                </div>
            </div>
            <div className="bg-[#eef2f7] h-full p-4">
                <div className="bg-white rounded-2xl border-2 p-6 flex flex-col gap-3">
                    <p className='text-2xl font-semibold '>Customer details</p>
                    <div className='flex justify-between text-xl text-gray-600'>
                        <p className=''>Email</p>
                        <p className='text-gray-700 font-semibold'>{senderDetails?.email}</p>
                    </div>
                    <div className='flex justify-between text-xl text-gray-600'>
                        <p className=''>First Name</p>
                        <p className='text-gray-700 font-semibold'>{firstName}</p>
                    </div>
                    <div className='flex justify-between text-xl text-gray-600'>
                        <p className=''>Last Name</p>
                        <p className='text-gray-700 font-semibold'>{lastName}</p>
                    </div>
                    <div className='text-blue-600 cursor-pointer text-xl font-semibold'>View More Details</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;