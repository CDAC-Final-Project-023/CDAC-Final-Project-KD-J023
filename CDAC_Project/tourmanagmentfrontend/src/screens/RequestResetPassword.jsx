import axios from "axios";
import { useState } from "react";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/passwordreset/request", null, {
        params: { email },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error: " + (error.response?.data || "Something went wrong"));
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestReset;
