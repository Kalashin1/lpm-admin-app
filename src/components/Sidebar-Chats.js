import { useHistory } from "react-router"

const SidebarChat = ({ users, setUser }) => {
  const router = useHistory();
  return (
    <div className="flex flex-col pt-8 pl-6 pr-2 w-full lg:w-64 bg-white mb-8 flex-shrink-0">
      <div className="flex flex-row items-center justify-center w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">QuickChat</div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 w-4 rounded-full">
            4
          </span>
        </div>
        <div className="flex h-32 md:h-4/5 flex-col space-y-1 mt-4 -mx-2 overflow-y-scroll">
          {users && users.map((user, index) => (  
            <button 
              key={index}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              onClick={e => {
                router.push(`/chat/${users[index]}`)}
              }>
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                { user.slice(0,1).toUpperCase() }
              </div>
              <div className="ml-2 text-sm font-semibold">{user}</div>
            </button>
          )) }
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;