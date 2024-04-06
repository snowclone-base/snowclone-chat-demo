import { useState } from "react";

const MessageForm = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = import.meta.env.VITE_JWT_TOKEN;
    console.log(token);

    const url = "http://localhost:3000/messages";
    const data = {
      username: username,
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Reset form fields
      setErrorMessage("");
      setMessage("");

      // Handle success, e.g., show a success message
      console.log("Message sent");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Send Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MessageForm;
