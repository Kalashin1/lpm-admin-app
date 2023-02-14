import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  let [toggleNav, setToggleNav] = useState(true);

  return (
    <header className="grid w-full grid-cols-1 bg-purple-600 content-center items-center">
      <nav className="bg-white shadow-md grid grid-cols- py-3 justify-between align-middle">
        <div className="relative md:top-4 grid col-sapn-1 text-xl font-bold p-1 pl-2">
          <img alt="large pool mining" src="/lpm.png" className="w-16 h-8 object-fit" />
        </div>
        <ul className="relative -top-4 my-auto sm:grid hidden sm:col-span-2 sm:grid-cols-3 p-1 justify-self-end self-center">
          <li className="px-2 hover:text-purple-600">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="px-2 hover:text-purple-600">
            <Link to="/investments">Investments</Link>
          </li>
          <li className="px-2 hover:text-purple-600">
            <a href="/">Logout</a>
          </li>
        </ul>
        <div onClick={e => setToggleNav(!toggleNav)} className="grid col-start-3 col-span-1 sm:hidden mt-2 mr-4 justify-self-end font-xl font-bold text-lg">
          <i className="fas fa-bars" />
        </div>
      </nav>

      {toggleNav && (
        <ul className="shadow-md sm:hidden py-2 font-bold">
          <li>
            <a href="/dashboard" className="block p-2 py-4 text-gray-100">
              Home
            </a>
          </li>
          <li>
            <Link to={`/investments`} className="block p-2 py-4 text-gray-100">
              Investments
            </Link>
          </li>
          <li>
            <Link to={`/Create Investment`} className="block p-2 py-4 text-gray-100">
              Create Investment
            </Link>
          </li>
          <li>
            <Link to="/invested-users" className="block p-2 py-4 text-gray-100">
              Invested Users
            </Link>
          </li>
	<li>
            <Link to="/chats" className="block p-2 py-4 text-gray-100">
              Chats
            </Link>
          </li>
          <li>
            <a href="/" className="block p-2 py-4 text-gray-100">
              Logout
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
