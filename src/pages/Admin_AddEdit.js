import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";
import validator from 'validator';
const initialState = {
  admin_id: "",
  username: "",
  password: "",
  conpassword: "",
  fav_physicist: "",
  fav_star: "",
}
const Admin_AddEdit = (props) => {

  const [state, setState] = useState(initialState);
  const { admin_id, username, password, conpassword, fav_physicist, fav_star } = state;
  const [errorMessage, setErrorMessage] = useState("");
  const [fromtoLogin, setfromtoLogin] = useState({ loginUsername: "", loginPassword: "" });
  const [loginInitial, setLoginInitial] = useState(true);
  const { adminId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/admin/${adminId}`)
      .then((resp) => {
        setState({ ...resp.data[0], conpassword: resp.data[0].password })
      });
  }, [adminId]);
  const twoFunctions = e => {
    validate(e.target.value);
    handleInputChange(e);
  }
  const validate = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }
  const handleSubmitNewAdmin = e => {
    e.preventDefault();
    if (!adminId) {
      if (!admin_id || !username || !password || !conpassword || !fav_physicist || !fav_star) {
        toast.error("Please provide value into each input field");
      }
      else if (password != conpassword) {
        toast.error("Please provide same password in both the fields");
      }
      else if (password == conpassword) {
        axios
          .post('http://localhost:3001/api/post/admin', {
            admin_id,
            username,
            password,
            fav_physicist,
            fav_star,
          })
          .then(() => {
            setState({ admin_id: "", username: "", password: "", conpassword: "", fav_physicist: "", fav_star: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Admin Added Successfully!");
        setState({ admin_id: "", username: "", password: "", conpassword: "", fav_physicist: "", fav_star: "" });
        setErrorMessage("");
      }
    }
    else {
      if (!username || !password || !conpassword || !fav_physicist || !fav_star) {
        toast.error("Please provide value into each input field");
      }
      else if (password != conpassword) {
        toast.error("Please provide same password in both the fields");
      }
      else if (password == conpassword) {
        axios
          .put(`http://localhost:3001/api/update/admin/${adminId}`, {
            username,
            password,
            fav_physicist,
            fav_star,
          })
          .then(() => {
            setState({ admin_id: "", username: "", password: "", conpassword: "", fav_physicist: "", fav_star: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Admin Updated Successfully!");
        setState({ admin_id: "", username: "", password: "", conpassword: "", fav_physicist: "", fav_star: "" });
        setErrorMessage("");
      }
    }

  }
  const handleInputChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const user = location.state?.user;
  console.log(user);
  if (fromtoLogin.loginUsername == "") {
    setfromtoLogin({
      loginUsername: user.username,
      loginPassword: user.password,
    })
  }
  return (
    <div>
      <img className="bgimg1" src={require('./img/bg1.jpg')} />
      <section className="container">
        <form id="addEditForm" onSubmit={handleSubmitNewAdmin}>
          <div className="card2">
            <label htmlFor="adminid">Admin ID</label>
            <input
              type="text"
              id="addadminid"
              disabled={adminId ? true : false}
              name="admin_id"
              value={admin_id || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="addusername"
              name="username"
              value={username || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="addpassword"
              name="password"
              value={password || ""}
              onChange={twoFunctions}
            />
            <span style={{ fontWeight: 'bold', color: 'red', }}>{errorMessage}</span><br /><br />
            <label htmlFor="conpassword">Confirm Password</label>
            <input
              type="text"
              id="conpassword"
              name="conpassword"
              value={conpassword || ""}
              onChange={handleInputChange}
            />
            <p className="psubtitle">In case you forget your passsword:</p>
            <label htmlFor="username">Your Favourite Physicist</label>
            <input
              type="text"
              id="favPhy"
              name="fav_physicist"
              value={fav_physicist || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="username">Your Favourite Star</label>
            <input
              type="text"
              id="favStar"
              name="fav_star"
              value={fav_star || ""}
              onChange={handleInputChange}
            />
            <input type="submit" value={adminId ? "UPDATE" : "SAVE"} />
            <Link to="/login" state={{ fromtoLogin: fromtoLogin, loginInitial: loginInitial }}>
              <input type="button" value="GO BACK" />
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}
export default Admin_AddEdit;

