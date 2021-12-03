import { db } from "../firebase-settings"
import { collection, getDocs } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function UserProfile({ user }) {

  let history = useHistory()

  let [plan, setPlan] = useState(1)
  let [showSpinner, setShowSpinner] = useState(false)
  let [investments, setInvestments] = useState(false)

  useEffect(() => {
    async function getInvestments () {
      const querySnapshot = await getDocs(collection(db, "investments"))
      setInvestments(querySnapshot.docs.map((doc) => {
        const _doc = doc.data()
        return { id: doc.id, ..._doc }
      }))
    }

    getInvestments()
  }) 

  let editProfile = async (e, user, plan) => {
    setShowSpinner(true)
    e.preventDefault()
    let { city, region } = user 
    console.log(user, plan, investments)


    
    let _investment = investments.find(i => i.id === plan)

    _investment.startDate = new Date()
    _investment.active = true
    console.log(_investment)
    // Add a new document in collection "cities"
    await updateDoc(doc(db, "plans", user.id), {
      city,
      region,
      invested: true,
      paused: false,
      investments: [_investment]
    });
    console.log(`updated!`)
    history.go(0)
  }
  return (
    <div className="p-4 bg-gray-100 flex items-center justify-center">
      <div className="container">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Registered Users <i className="fas fa-user ml-auto text-xs" /></h2>
          <p className="text-gray-500 mb-6">
            View the list of registered users.
          </p>

          <form className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6" onSubmit={e => editProfile(e, user, plan)}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label for="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={user.name}
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label for="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={user.email}
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="address">Select Investment Plan</label>
                    <select
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={plan}
                      placeholder=""
                      onChange={e => setPlan(e.target.value)}
                    >
                      { investments && investments.map(i => (
                        <option value={i.id}>{ `${i.name} - $${i.capital}` }</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label for="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={user.city}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="country">Country / region</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={user.region}
                      />
                      <button
                        tabindex="-1"
                        className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                      >
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        tabindex="-1"
                        for="show_more"
                        className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                      >
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit {
                showSpinner && (<i class="ml-2 fas fa-sync fa-spin"></i>)
            }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <a
          href="https://www.buymeacoffee.com/dgauderman"
          className="md:absolute bottom-0 right-0 p-4 float-right"
        >
          <img
            src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
            alt="Buy Me A Coffee"
            className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
          />
        </a>
      </div>
    </div>
  );
}
