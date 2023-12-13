import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import whatsapp from "../assets/whatsapp.png";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      if (username.length < 5 || password.length < 5) {
        const response = await axios.get(
          `https://login-back-api.onrender.com?username=${username}&password=${password}`
        );
        setError(response.data.error);
        setApiData(null);
      } else {
        const response = await axios.get("http://localhost:3001");
        setApiData(response.data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching data from the server:", error.message);
      setError(error.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Sign In</h1>
        <div className="username">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {error && error.username && <p className="error">{error.username}</p>}
        </div>
        <div className="password">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && error.password && <p className="error">{error.password}</p>}
        </div>
        <div>
          <button className="btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>

        <div>
          {apiData && (
            <div>
              <h2>API Data:</h2>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
          {error && !error.username && !error.password && (
            <p className="error">
              {error.ok
                ? "Failed to login"
                : "Wrong Username/Password Credentials"}
            </p>
          )}
        </div>

        <p className="para">
          Didn't have an account? <span className="spantag">Sign Up</span>
        </p>
      </div>
      <div className="image">
        <img src={whatsapp} alt="" />
      </div>
    </div>
  );
}

export default Login;