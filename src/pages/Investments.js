import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InvestmentsTable from "../components/InvestmentsTable";
import { db } from "../firebase-settings";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

export default function Home () {

  let [investments, setInvestments] = useState(false)  

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "investments"))
      setInvestments(querySnapshot.docs.map((doc) => {
        const _doc = doc.data()
        return { id: doc.id, ..._doc }
      }))
    }
    getData()
  }, [])
  console.log(investments)
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-2">
        <div class="container mx-auto h-10">
          <h1 className="mt-14 mb-4 text-gray-600 text-uppercase font-bold text-2xl">Investment Plans <i className="fas fa-user ml-auto text-xs" /></h1>
          <hr />
          <h1 className="my-4 mb-8 text-capitalize text-gray-600 font-bold text-lg">View the list of registerd investments</h1>
          <Link to ="/create-investment" className="py-2 px-4 font-bold bg-green-400 hover:bg-green-600 text-sm focus:bg-green-800 text-white ml-4 md:ml-16 rounded-md shadow m-2">Create Investment <i class="ml-2 fas fa-edit"></i></Link>
          <div className="my-4">
            { investments && (<InvestmentsTable investments={investments} />) }
          </div>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
    </>
  )
}