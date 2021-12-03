import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase-settings";
import { useHistory } from "react-router";


export default function Table({ users }) {

  const history = useHistory()

  let deleteUser = async (userId) => {
    let res = window.confirm('Are you sure you want to delete the user?')
    if(res){
      await deleteDoc(doc(db, "plans", userId));
      alert('User has been deleted')
      history.go(0)
    }
  } 
  console.log(users)
  return (
<div class="mx-2">
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
        { users.map((user) => (
          <tr class="hover:bg-grey-600">
            <td class="py-4 px-6 border-b border-grey-200 text-sm font-bold md:tex-lg">{user.name}</td>
            <td class="py-4 px-6 border-b border-grey-200 text-xs font-bold md:tex-lg">{user.email.slice(0, 8)+ '...'}</td>
            <td class="py-4 px-6 border-b border-grey-200">
              <Link to={`/user-profile/${user.id}`} class="text-grey-600 font-bold py-1 px-3 rounded text-xs bg-green-400 hover:bg-green-800 hover:text-underline mx-2 hover:text-white">Edit</Link>
              <button onClick={e => deleteUser(user.id)} class="text-grey-600 font-bold py-1 px-3 rounded text-xs bg-red-400 hover:bg-red-800 hover:text-white">Delete</button>
            </td>
          </tr>
        ))}
        
      </tbody>
    </table>
  </div>
</div>
  );
}
