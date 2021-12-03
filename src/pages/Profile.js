import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/User-Profile";
import { db } from '../firebase-settings'
import { doc, getDoc } from "@firebase/firestore";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
// import Footer from "../components/Footer"

export default function Profile () {
  const { id } = useParams()
  console.log(id)

  const [user, setUser] = useState(false)

  useEffect(() => {
    async function getUser (id) {
      const docRef = doc(db, "plans", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser({id: docSnap.id,...docSnap.data()})
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getUser(id)
  }, [id])
  console.log(user)
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-8">
        <div class="container mx-auto h-10">
          <div class="my-2">
            <UserProfile  user={user} />
          </div>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
    </>
   )
}