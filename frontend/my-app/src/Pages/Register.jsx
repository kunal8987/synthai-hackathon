import { useState } from "react";
import { Link } from "react-router-dom";
import "../Components/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      name,
      email,
      password,
    };
    console.log(payload);
  };

  return (
    <div className="register">
      <h1 className="register-h1">Register</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <br />
        <input
          className="reg-input"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Email</label>
        <br />
        <input
          className="reg-input"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Password</label>
        <br />
        <input
          className="reg-input"
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button className="reg-button">Register</button>
        <br />
        <br />
      </form>
      <div className="text-center">
        <Link to="/">
          <h1>If you have already register : Login</h1>
        </Link>
      </div>
    </div>
  );
}
export default Register;
