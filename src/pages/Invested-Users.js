import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/InvestedUsersTable";
import { db } from "../firebase-settings";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function Home () {

  let [users, setUsers] = useState(false)  

  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "plans"), where('invested', '==', true))
      const querySnapshot = await getDocs(q)
      setUsers(querySnapshot.docs.map((doc) => {
        const _doc = doc.data()
        console.log(doc.data)
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
          <h1 className="mt-14 mb-4 text-gray-600 text-uppercase font-bold text-2xl">Users With Investments <i className="fas fa-user ml-auto text-xs" /></h1>
          <hr />
          <h1 className="my-4 mb-8 text-capitalize text-gray-600 font-bold text-lg">View the list of users with investments</h1>
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