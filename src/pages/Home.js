import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { db } from "../firebase-settings";
import { collection, getDocs, orderBy } from "@firebase/firestore";
import { useEffect, useState } from "react";
// import Footer from "../components/Footer";

export default function Home () {

  let [users, setUsers] = useState(false)  

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "plans"), orderBy('createdAt', 'asc'))
      setUsers(querySnapshot.docs.map((doc) => {
        const _doc = doc.data()
        return { id: doc.id, ..._doc }
      }))
    }
    getData()
  }, [])
  console.log(users)
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-2">
        <div class="container mx-auto h-10">
          <h1 className="mt-14 mb-4 text-gray-600 text-uppercase font-bold text-2xl">Registered Users <i className="fas fa-user ml-auto text-xs" /></h1>
          <hr />
          <h1 className="my-4 mb-8 text-capitalize text-gray-600 font-bold text-lg">View the list of registerd users</h1>
          <div className="my-4">
            { users && (<Table users={users} />) }
          </div>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
    </>
  )
}