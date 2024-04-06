import "./App.css";
import { useState, useEffect } from "react";
import MessageForm from "./components/MessageForm";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/realtime");

    const handleMessagesChange = (event) => {
      const { username, message } = JSON.parse(event.data); // Extract message from JSON data
      setMessages((prevMessages) => [
        ...prevMessages,
        `${username}: ${message}`,
      ]);
    };

    eventSource.onmessage = (event) => {
      handleMessagesChange(event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <MessageForm />
    </div>
  );
}

export default App;
