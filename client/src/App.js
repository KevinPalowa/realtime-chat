import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("192.168.1.10:4000");
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("messageResponse", (res) => {
      setMessages((prev) => {
        return [...prev, res];
      });
    });
    return () => {
      socket.off("messageResponse");
    };
  });
  return (
    <div className="bg-gray-900/90 min-h-screen text-white">
      <ul>{isConnected && messages.map((msg) => <li>{msg}</li>)}</ul>
      <form
        id="form"
        action=""
        className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 flex"
        onSubmit={handleSendMessage}
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="relative text-black p-1 grow rounded-2xl mr-1"
          value={message}
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
