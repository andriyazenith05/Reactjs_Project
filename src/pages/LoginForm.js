import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./LoginForm.css";
const LoginForm = ({ Login }) => {
  const [details, setDetails] = useState({ username: "", password: "" });
  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }
  return (
    <article className="body">
      <img className="bgimg" src={require('./img/bg1.jpg')} />
      <section className="container">
        <img className="icon1" src={require('./img/icon1.png')} />
        <form onSubmit={submitHandler}>
          <div className="card1">
            <input type="text" name="username" id="username" placeholder="Username" autoComplete="off" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} /><br />
            <input type="password" name="password" id="password" placeholder="Password" autoComplete="off" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} /><br />
            <button id="loginbtn">LOGIN</button>
            <Link to="/change-password">
              <centre><p className="forgotPass">forgot password?</p></centre>
            </Link>
          </div>
        </form>
      </section>
    </article>
  )
}
export default LoginForm;
