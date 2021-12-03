import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InvestmentForm from "../components/InvestmentForm";
import Footer from "../components/Footer";
export default function Profile () {
  
  return (
    <>
    <Navbar />
    <div className="grid grid-cols-3 border-bottom border-gray-">
      <Sidebar>
      </Sidebar>
      <div className="grid col-span-3 md:col-span-2 px-8">
        <div class="container mx-auto h-10">
          <div class="my-2">
            <InvestmentForm />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
   )
}