import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Investment from "../components/Investment";
import { db } from '../firebase-settings'
import { doc, getDoc } from "@firebase/firestore";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
// import Footer from "../components/Footer";

export default function Profile () {
  const { id } = useParams()
  console.log(id)

  const [investment, setinvestment] = useState(false)

  useEffect(() => {
    async function getInvestment (id) {
      const docRef = doc(db, "investments", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setinvestment({id: docSnap.id,...docSnap.data()})
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    getInvestment(id)
  }, [id])
  console.log(investment)
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-8">
        <div class="container mx-auto h-10">
          <div class="my-2">
            { investment && (<Investment  investment={investment} />) }
          </div>
        </div>
      </div>
    </div>
    {/* <Footer /> */}
    </>
   )
}