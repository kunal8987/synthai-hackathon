import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "../Components/Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      email,
      password,
    };

    axios
      .post(`https://real-rose-peacock-tutu.cyclic.app/user/login`, payload)
      .then((res) => {
        console.log(res)
        
        if (res.data.token) {
          let tokenValue=res.data.token
          localStorage.setItem("token",tokenValue)
          alert("Login Successfull!");
          navigate("/home");
        }else{
          alert("Please enter correct email and password!")
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
    console.log(payload);
    // if(token){
    //     navigate("/home");
    // }
  };

  const handleGoogle=()=>{
    navigate("https://real-rose-peacock-tutu.cyclic.app/auth/google")
  }

  return (
    <div className="register">
      <h1 className="register-h1">Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
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
        <button className="reg-button">Login</button>
        <br />
        <br />
      </form>
      <div className="text-center">
      <Link to="https://real-rose-peacock-tutu.cyclic.app/auth/google" >
        <button className="reg-button">Login with Google</button>
      </Link>
      </div>
      <br />
      <div className="text-center">
        <Link to="/register">
          <h1>If you not register : Register</h1>
        </Link>
      </div>
    </div>
  );
}
export default Login;
