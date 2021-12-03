import { useState, useEffect } from "react"
import { db } from "../firebase-settings"
import { doc, updateDoc, getDoc } from "firebase/firestore"; 
import { useHistory } from "react-router";

export default function TopUp ({id}) {
  let history = useHistory()

  let [user, setUser] = useState(false);

  useEffect(() => {
    async function getUser(){
      const docSnap = await getDoc(doc(db, 'plans', id))
      setUser(docSnap.data())
    }

    getUser()
  })

  let [showSpinner, setShowSpinner] = useState(false)
  let [roi, setRoi] = useState('')

  let updateRoi = async (e, id, num) => {
    try {
      e.preventDefault()
      setShowSpinner(true)
      const docSnap = await getDoc(doc(db, 'plans', id))
      const user = docSnap.data()
      console.log(docSnap.data())
      user.investments[0].roi = num
      let updatedInvestments = user.investments
      await updateDoc(doc(db, 'plans', id), {
        investments: updatedInvestments
      })
      alert('mining edited')
      history.go(0)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex bg-gray-100 items-center justify-center px-4 mx-aut py-24">
      <div className="w-full max-w-md">
        <form onSubmit={e => updateRoi(e, id, roi)} className="bg-white shadow-lg rounded-md px-12 pt-6 pb-8 mb-4">
          <div
            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
          >
            Update User's Mining Profit
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              for="username"
            >
              Enter Mining Profit <span className="inline-block ml-4">Current Balance : {user && (user.investments[0].roi ?? 0)}</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="form.email"
              type="number"
              required
              value={roi}
              onChange={e => setRoi(e.target.value)}
              autofocus
              placeholder="100"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Update {
                showSpinner && (<i class="ml-2 fas fa-sync fa-spin"></i>)
            }</button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Gau Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}