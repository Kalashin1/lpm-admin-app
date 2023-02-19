import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import ChatComponent from "../components/Chats-Component";
import { useParams } from "react-router-dom/";

const Chat = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 border-bottom m-b-2/4">
        {/* <Sidebar /> */}
        <div className="grid col-span-6 md:col-span-2 px">
          <div class="container mx-auto h-10">
            <div class="my-2">
              <ChatComponent showSidebar={false} user_name={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
