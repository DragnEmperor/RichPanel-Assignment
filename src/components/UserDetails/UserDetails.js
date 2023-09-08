import { BiPhoneCall, BiSolidUserCircle } from 'react-icons/bi';

const UserDetails = ({ user }) => {

    console.log('userDetails', user);
    return (
        <div className="flex flex-col text-gray-700 h-full">
            <div className="bg-white flex flex-col items-center gap-4 py-10 px-28">
                <img src="https://images.unsplash.com/photo-1693693928634-658db91ca093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="user-details-pic" className="w-20 h-20 rounded-full object-cover" />
                <div className="text-center">
                    <p className="font-semibold text-2xl">Aman</p>
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
                        <p className='text-gray-700 font-semibold'>test@gmail.com</p>
                    </div>
                    <div className='flex justify-between text-xl text-gray-600'>
                        <p className=''>First Name</p>
                        <p className='text-gray-700 font-semibold'>Aman</p>
                    </div>
                    <div className='flex justify-between text-xl text-gray-600'>
                        <p className=''>Last Name</p>
                        <p className='text-gray-700 font-semibold'>Singh</p>
                    </div>
                    <div className='text-blue-600 cursor-pointer text-xl font-semibold'>View More Details</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;