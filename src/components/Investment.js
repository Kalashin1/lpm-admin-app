import { useState } from "react";
import { db } from "../firebase-settings";
import { doc, updateDoc } from "firebase/firestore"; 
import { useHistory } from "react-router";

export default function Investment({ investment }) {
  let history = useHistory()
  let [showSpinner, setShowSpinner] = useState(false)

  let updateInvestment = async (e, { name, duration, capital, roi, id }) => {
    setShowSpinner(true)
    e.preventDefault()
    try {
      await updateDoc(doc(db, "investments", id), {
        name,
        duration,
        capital,
        roi
      });
      alert('Investment Updated!')
      history.push('/investments')
    } catch (error) {
      console.log(error)
      setShowSpinner(false)
    }
    
  }

  let [name, setName] = useState((investment && investment.name))
  let [capital, setCapital] = useState((investment && investment.capital))
  let [duration, setDuration] = useState((investment && investment.duration))
  let [roi, setRoi] = useState((investment && investment.roi))

  console.log(investment)
  return (
    <div className="p-4 bg-gray-100 flex items-center justify-center">
      <div className="container">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Registered investments <i className="fas fa-investment ml-auto text-xs" /></h2>
          <p className="text-gray-500 mb-6">
            View the list of registered investments.
          </p>

          <form className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6" onSubmit={e => updateInvestment(e, { name, duration, capital, roi, id: investment.id})}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Investment Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label for="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label for="email">Capital</label>
                    <input
                      type="number"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={capital}
                      onChange={e => setCapital(e.target.value)}
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="city">ROI</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={roi}
                      onChange={e => setRoi(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="country">Duration</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
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
                        Submit 
                        {
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
