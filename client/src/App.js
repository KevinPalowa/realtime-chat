import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("192.168.1.10:3001");
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isTyping, setIsTyping] = useState(false);
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
    socket.on("isTypingResponse", (res) => {
      console.log(res);
      if (res.status && res.id !== socket.id) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });
    socket.on("messageResponse", (res) => {
      console.log(res);
      setMessages((prev) => {
        return [...prev, res];
      });
    });
    return () => {
      socket.off("messageResponse");
      socket.off("isTypingResponse");
    };
  });
  return (
    <div className="bg-gray-900/90 min-h-screen text-white ">
      <ul>{isConnected && messages.map((msg) => <li>{msg}</li>)}</ul>
      <div className="fixed bottom-0 left-0 right-0 ">
        {isTyping && (
          <div className="text-sm bg-gray-800 p-2">Someone's typing...</div>
        )}
        <form
          id="form"
          action=""
          className="bg-gray-900 p-2 flex"
          onSubmit={handleSendMessage}
        >
          <input
            onFocus={() =>
              socket.emit("isTyping", { id: socket.id, status: true })
            }
            onBlur={() => socket.emit("isTyping", false)}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
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
    </div>
  );
}

export default App;
