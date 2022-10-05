import io from "socket.io-client";
function App() {
  const socket = io.connect("localhost:4000");
  return (
    <div className="bg-gray-900/90 min-h-screen text-white">
      <ul>
        {/* {messages.forEach((msg) => <li>{msg}</li>)} */}
        <li>asd</li>
        <li>asd</li>
      </ul>
      <form
        id="form"
        action=""
        className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 flex"
        /* onSubmit={submitHandler} */
      >
        <input
          /* onChange={(e) => setMessage(e.target.value)} */
          type="text"
          className="relative text-black p-1 grow rounded-2xl mr-1"
          /* value={message} */
        />
        <button
          type="submit"
          className="relative grow-0 bg-green-800 py-2 px-3 text-sm rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
