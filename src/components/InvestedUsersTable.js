import { db } from "../firebase-settings"
import { doc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function InvestedUsersTable({ users }) {
  
  const history = useHistory()

  const removeInvestedUser = async (e, user) => {
    e.preventDefault()
    await updateDoc(doc(db, "plans", user.id), {
      invested: false,
      investments: []
    });
    alert('user has been removed from investment plan')
    history.go(0)
  }

  console.log(users)

  return (
    <div class="mx-2 my-4">
      <div class="bg-white shadow-md rounded my-6">
        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Email</th>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr class="hover:bg-grey-600">
                <td class="py-4 px-6 border-b border-grey-200 text-sm font-bold md:tex-lg">{user.name}</td>
                <td class="py-4 px-6 border-b border-grey-200 text-xs font-bold md:tex-lg">{user.email.slice(0, 8) + '...'}</td>
                <td class="py-4 px-6 border-b md:flex border-grey-200">
                  {/* <a onClick={e => toggleInvestment(e, user, !user.paused)} href="some" class="text-grey-600 block font-bold py-1 px-3 rounded text-xs bg-green-400 hover:bg-green-800 hover:text-underline m-2 hover:text-white">Toggle</a> */}
                  <a onClick={e => removeInvestedUser(e, user)} href="some" class="text-grey-600 font-bold py-1 px-3 block rounded text-xs bg-blue-400 hover:bg-blue-800 hover:text-white m-2">
                    Delete Investment
                  </a>
                  <Link to={`/update-mining/${user.id}`} class="text-grey-600 block font-bold py-1 px-3 rounded text-xs bg-green-400 hover:bg-green-800 hover:text-underline m-2 hover:text-white">Top Up</Link>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
