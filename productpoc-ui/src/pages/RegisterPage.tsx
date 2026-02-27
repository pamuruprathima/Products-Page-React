import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    // store temporarily
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    setMessage("Registration Successful ✅");

    // redirect to login after 1 second
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="title">Register</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Register</button>

        </form>

        {message && <p className="message">{message}</p>}

        <p className="register-text">
          Already have account?{" "}
          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;