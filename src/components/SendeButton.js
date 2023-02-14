const SendButton = ({ handleSubmit }) => {
  return (
    <div className="ml-4">
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
      >
        <span>Send</span>
        <span className="ml-2">
          <svg
            className="w-4 h-4 transform rotate-45 -mt-px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SendButton;
