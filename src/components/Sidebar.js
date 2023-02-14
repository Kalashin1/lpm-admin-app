import { Link } from 'react-router-dom'
import { useHistory } from "react-router"

export default function Sidebar() {
  const history = useHistory();
  return (
    <nav className="hidden md:grid md:col-span-1 bg-purple-900 w-64 h-screen px-4 tex-gray-900 border border-purple-900">
      <div className="mt-4 mb-4">
        <ul className="ml-4">
          <li className="mb-2 px-4 py-2 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" onClick={e => history.push('/dashboard')}>
            <span>
              <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                <path
                  d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                  4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                  4h4v-4h-4M4 8h4V4H4v4z"
                ></path>
              </svg>
            </span>
            <Link to="/dashboard">
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" onClick={e => history.push('/invested-users')}>
            <span>
              <svg
                className="fill-current h-5 w-5 "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                  fill="currentColor"
                />
                <path
                  d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <Link to="/invested-users">
              <span className="ml-2">Invested Users</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" onClick={e => history.push('/create-investment')}>
            <span>
              <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                <path
                  d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                  2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                  00-2-2h-1V1m-1 11h-5v5h5v-5z"
                ></path>
              </svg>
            </span>
          <Link to="/create-investment">
              <span className="ml-2">Create Investment</span>
            </Link>
          </li>
          <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" onClick={(e) => history.push('/chats')}>
            <span>
            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"/></svg>
            </span>
          <Link to="/chats">
              <span className="ml-2">Chats</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
