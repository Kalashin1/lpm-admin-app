import { useState } from "react"
import { auth } from '../firebase-settings'
import { signInWithEmailAndPassword } from "@firebase/auth"
import { useHistory } from "react-router"

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let [showPassword, setShowPassword] = useState(false)
  let [showSpinner, setShowSpinner] = useState(false)

  const history = useHistory()

  const login = async (e, email, password) => {
    setShowSpinner(true)
    console.log(email, password)
    e.preventDefault()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      console.log(user)
      sessionStorage.setItem('adminId', user.uid)
      history.push('/dashboard')
    } catch (err) {
      console.log(err)
      setShowPassword(true)
    } 
  }
  return (
    <div className="flex bg-gray-100 items-center justify-center px-4 mx-aut py-24">
      <div className="w-full max-w-md">
        <form onSubmit={e => login(e, email, password)} className="bg-white shadow-lg rounded-md px-12 pt-6 pb-8 mb-4">
          <div
            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
          >
            Admin Login
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              for="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="form.email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              autofocus
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autocomplete="current-password"
            />
            { showPassword && (<h3 className="text-md text-red-600">Incorrect Password</h3>)}
          </div>
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Sign In {
                showSpinner && (<i class="ml-2 fas fa-sync fa-spin"></i>)
            }</button>
            <a
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              href="col"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Gau Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}
