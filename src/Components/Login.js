import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
export default function Login() {


    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {isLogin ,setIsLogin}= useContext(AuthContext)
    // const history=useHistory()
    const token = localStorage.getItem('token')

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      "Submitting form with email:",
      email,
      "and password:",
      password
    );
    fetch("http://localhost:5003/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        if (data.success&&token) {
          setSuccess(data.message);
          setIsLogin(true)
          setError("");
        } else {
          setError(data.message);
          setSuccess("");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <strong>{}</strong>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}
