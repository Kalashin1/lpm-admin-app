import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import TopUp from "../components/TopUp"
import { useParams } from "react-router"

export default function UpdateMining () {
  const { id } = useParams() 
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-8">
        <div class="container mx-auto h-10">
          <div class="my-2">
            <TopUp  id={id} />
          </div>
        </div>
      </div>
    </div>
    </>
   )
}