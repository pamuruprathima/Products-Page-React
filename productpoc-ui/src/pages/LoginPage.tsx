import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const LoginPage = () => {
  const [name, setName] = useState("");     // added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please enter all fields");
      return;
    }

    // save username and email
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    setMessage("Login Successful ✅");

    // redirect
    setTimeout(() => {
      navigate("/products");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="title">Login</h2>

        <form onSubmit={handleLogin}>

          {/* NAME INPUT */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD INPUT */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        {message && <p className="message">{message}</p>}

        <p className="register-text">
          New user?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;