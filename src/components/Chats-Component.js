/* eslint-disable react-hooks/exhaustive-deps */
import SidebarChat from "../components/Sidebar-Chats";
import SendButton from "../components/SendeButton";
import Receiver from "../components/Receiver";
import Sender from "../components/Sender";
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../firebase-settings';
import { getDocs, doc, onSnapshot, query, collection, where, orderBy, updateDoc } from 'firebase/firestore'

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState();
  const [user, setUser] = useState()
  
  const getChats = async () => {
    const q = query(collection(db, "chats"), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((d) => {
      if (d.exists() && (d.data().user_name !== undefined ||null)) {
        arr.push({...d.data(), id: d.id })
      }
    })
    setUser(await getUserMessages(arr[0].user_name));
    await getMessages(arr[0])
    return arr;
  }
  const getUserMessages = async (name) => {
    const q = query(collection(db, "chats"), where('user_name', '==', name));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((d) => {
      if (d.exists() && (d.data().user_name !== undefined ||null)) {
        arr.push({...d.data(), id: d.id })
      }
    });
    return arr[0];
  }

  async function updateMessages(name){
    const user = await getUserMessages(name);
    setUser(user);
    await getMessages(user);
  }

  const getMessages = (user) => {
    const messages = user.messages.map((m) => ({
      time: m.createdAt,
      sender: m.sender,
      message: m.message,
      name: user.user_name,
    })).sort((a, b) => a.time - b.time);
    setMessages(messages);
    console.log(messages);
  }

  const checkData = () => {
    return onSnapshot(doc(db, "chats", user.id), (doc) => {
      if (doc.exists()) {
        const res = doc.data();
        const messages = res.messages;
        setMessages(messages.map((m) => ({
          time: m.createdAt,
          sender: m.sender,
          message: m.message,
          name: res.user_name,
        })).sort((a, b) => a.time - b.time));
      }
    });
  };

  const handleSubmit = async (message, user) => {
    const _user = await getUserMessages(user);
    const messages = _user.messages;
    const time = new Date().getTime();
    try {
      await updateDoc(doc(db, "chats", _user.id), {
        messages: [
          {
            sender: "admin",
            createdAt: time,
            message,
          },
          ...messages,
        ],
      });
      alert('sent')
      checkData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChats().then(d => setUsers(d))
  }, [])

  return (
    <div class="flex h-screen antialiased text-gray-800">
      <div class="flex flex-col lg:flex-row h-full w-full overflow-x-hidden">
        <SidebarChat setUser={updateMessages} users={users?.map(a => a.user_name)} />
        <div class="flex flex-col flex-auto h-full p-6">
          <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full overflow-y-scroll p-4">
            <div class="flex flex-col h-full overflow-x-auto mb-4">
              <div class="flex flex-col h-full">
                <div class="grid grid-cols-12 overflow-y-scroll gap-y-2">
                  {user && messages && messages.map((m) => (
                    <>
                    { m.sender === "user" ? (<Receiver message={m.message} name={m.name} />): (<Sender message={m.message} />)}
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div class="flex-grow ml-4">
                <div class="relative w-full">
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    {" "}
                  </button>
                </div>
              </div>
              <SendButton handleSubmit={ e => handleSubmit(message, user.user_name)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
