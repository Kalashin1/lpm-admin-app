import { Link } from "react-router-dom";
import { db } from "../firebase-settings";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { useHistory } from "react-router";


export default function InvestmentsTable({ investments }) {

  const [showSpinner, setShowSpinner] = useState(false);
  const history = useHistory()

  let deleteInvestment = async (e, { id }) => {
    e.preventDefault()
    const proceed = window.confirm("Proceed to delete?");
    if (proceed) {
      setShowSpinner(true);
      await deleteDoc(doc(db, "investments", id));
      history.reload()
    }
  };

  console.log(investments);

  return (
    <div class="mx-2">
      <div class="bg-white shadow-md rounded my-6">
        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Name
              </th>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Capital
              </th>
              <th class="py-4 px-6 bg-grey-200 font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr class="hover:bg-grey-600">
                <td class="py-4 px-6 border-b border-grey-200 text-sm font-bold md:tex-lg">
                  {investment.name}
                </td>
                <td class="py-4 px-6 border-b border-grey-200 text-xs font-bold md:tex-lg">{`$ ${investment.capital}`}</td>
                <td class="py-4 px-6 border-b border-grey-200">
                  <Link
                    to={`investment/${investment.id}`}
                    href="some"
                    class="text-white mb-2 font-bold py-1 px-3 rounded text-xs bg-green-400 hover:bg-green-800 hover:text-underline mx-2 hover:text-white"
                  >
                    <i class="ml-2 fas fa-edit"></i>
                  </Link>
                  <a
                    onClick={e => deleteInvestment(e, investment)}
                    href="some"
                    class="text-white mb-2 font-bold py-1 px-3 rounded text-xs bg-red-400 hover:bg-red-600 focus:bg-red-800 hover:text-white"
                  >
                    {showSpinner && <i class="ml-2 fas fa-sync fa-spin"></i>}
                    { !showSpinner &&  <i class="ml-2 fas fa-trash"></i>}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
