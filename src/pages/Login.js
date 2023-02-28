import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import LoginForm from "./LoginForm";
import axios from "axios";
toast.configure()
const Login = (props) => {
  const [loginDetailsList, setLoginList] = useState([]);
  const [starDetails, setStarDetails] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [obserLatitude, setObserLatitude] = useState([]);
  const loadData1 = async () => {
    const response = await axios.get('http://localhost:3001/api/get/admin');
    setLoginList(response.data);
  }

  const loadData2 = async () => {
    const response = await axios.get('http://localhost:3001/api/get/star');
    setStarDetails(response.data);
  }

  const loadData3 = async () => {
    const response = await axios.get('http://localhost:3001/api/get/latitude');
    setLatitude(response.data);
  }

  const loadData4 = async () => {
    const response = await axios.get('http://localhost:3001/api/get/observatory-latitude');
    setObserLatitude(response.data);
  }
  useEffect(() => {
    axios.get('http://localhost:3001/api/get/admin').then((response) => {
      setLoginList(response.data);
    });
    loadData1();

    axios.get('http://localhost:3001/api/get/star').then((response) => {
      setStarDetails(response.data);
    });
    loadData2();

    axios.get('http://localhost:3001/api/get/latitude').then((response) => {
      setLatitude(response.data);
    });
    loadData3();

    axios.get('http://localhost:3001/api/get/observatory-latitude').then((response) => {
      setObserLatitude(response.data);
    });
    loadData4();

  }, []);

  const [user, setUser] = useState({ username: "", password: "" });
  const [initial, setInitial] = useState(user.username ? true : false);
  const deleteAdmin = (admin_id) => {
    if (window.confirm("Are you sure that you wanted to delete this admin?")) {
      axios.delete(`http://localhost:3001/api/remove/admin/${admin_id}`);
      toast.success("Admin Deleted Successfully!");
      setTimeout(() => loadData1(), 500);
    }
  }
  const deleteStar = (star_id) => {
    if (window.confirm("Are you sure that you wanted to delete this star?")) {
      axios.delete(`http://localhost:3001/api/remove/star/${star_id}`);
      toast.success("Star Deleted Successfully!");
      setTimeout(() => loadData2(), 500);
    }
  }
  const deleteState = (state_id) => {
    if (window.confirm("Are you sure that you wanted to delete this state?")) {
      axios.delete(`http://localhost:3001/api/remove/state/${state_id}`);
      toast.success("Star Deleted Successfully!");
      setTimeout(() => loadData3(), 500);
    }
  }
  const deleteObser = (observatory_id) => {
    if (window.confirm("Are you sure that you wanted to delete this observatory?")) {
      axios.delete(`http://localhost:3001/api/remove/observatory/${observatory_id}`);
      toast.success("Observatory Deleted Successfully!");
      setTimeout(() => loadData4(), 500);
    }
  }
  const notify1 = () => toast.success("Login Successful!");
  const notify2 = () => toast.error("Invalid Credentials");
  const Login = details => {
    console.log(details);
    if (!details.username || !details.password) {
      toast.error("Please provide the inputs required");
    }
    else {
      let admit = false;
      for (var i = 0; i < loginDetailsList.length; i++) {
        if (loginDetailsList[i].username == details.username && loginDetailsList[i].password == details.password) {
          console.log("Logged In");
          setUser({
            username: details.username,
            password: details.password
          });
          admit = true;
          break;
        } else {
          console.log("Details do not match");
        }
      }
      console.log(admit);
      if (admit) {
        return notify1();
      }
      else {
        return notify2();
      }
    }
  }
  function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("Admin").style.marginLeft = "300px";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("Admin").style.marginLeft = "0";
  }
  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const loginInitial = location.state?.loginInitial;
  console.log(loginInitial);
  console.log(initial);
  if (initial == false && loginInitial == true) {
    const fromtoLogin = location.state?.fromtoLogin;
    setUser({
      username: fromtoLogin.loginUsername,
      password: fromtoLogin.loginPassword,
    });
    setInitial(true);
  }
  const Logout = () => {
    setUser({ username: "", password: "" })
    toast.success("Logged out successfully!");
  }
  return (
    <div className="Login">
      {(user.username != "") ? (
        <article id="Admin">
          <div id="Adminhead">
            <span>
              <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <div className="user"><img className="icon2" src={require('./img/icon2.png')} /><span className="usernameInMenubar">{user.username.toUpperCase()}</span></div>
                <hr className="menuhr" />
                <a href="#adminProfile">Admin Profile</a>
                <a href="#starDetails">Star Details</a>
                <a href="#stateLatDetails">State Latitude Details</a>
                <a href="#obserLatDetails">Observatory Latitude Details</a>
              </div>
              <div className="menu" onClick={openNav}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </span>

            <Link to="/">
              <img className="logo" src={require('./img/logo.png')} />
            </Link>

            <button onClick={Logout}>LOGOUT</button>
          </div>

          <section id="adminProfile">
            <div className="adminProfileBody">
              <h3>ADMIN PROFILE</h3>
              <hr />
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Admin ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Favourite Physicist</th>
                    <th>Favourite Star</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loginDetailsList.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <th>{item.admin_id}</th>
                        <th>{item.username}</th>
                        <th>{item.password}</th>
                        <th>{item.fav_physicist}</th>
                        <th>{item.fav_star}</th>
                        <th>
                          <Link to={`/update-admin-profile/${item.admin_id}`} state={{ user: user }}>
                            <button className="btn btn-edit">EDIT</button>
                          </Link>
                          <button className="btn btn-delete" onClick={() => deleteAdmin(item.admin_id)}>DELETE</button>
                          <Link to={`/view-admin-profile/${item.admin_id}`} state={{ user: user }}>
                            <button className="btn btn-view">VIEW</button>
                          </Link>
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <Link to="/add-admin-profile" state={{ user: user }}>
                <button className="addBtn">ADD ADMIN PROFILE</button>
              </Link>

            </div>
          </section>

          <section id="starDetails">
            <div className="starDetailsBody">
              <h3>STAR DETAILS</h3>
              <hr />
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Star ID</th>
                    <th>HD</th>
                    <th>Right Ascension</th>
                    <th>Declination</th>
                    <th>Magnitude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {starDetails.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <th>{item.star_id}</th>
                        <th>{item.HD}</th>
                        <th>{item.Right_Ascension}</th>
                        <th>{item.Declination}</th>
                        <th>{item.Magnitude}</th>
                        <th>
                          <Link to={`/update-star/${item.star_id}`} state={{ user: user }}>
                            <button className="btn btn-edit">EDIT</button>
                          </Link>
                          <button className="btn btn-delete" onClick={() => deleteStar(item.star_id)}>DELETE</button>
                          <Link to={`/view-star/${item.star_id}`} state={{ user: user }}>
                            <button className="btn btn-view">VIEW</button>
                          </Link>
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <Link to="/add-star" state={{ user: user }}>
                <button className="addBtn">ADD STAR</button>
              </Link>

            </div>
          </section>

          <section id="stateLatDetails">
            <div className="stateLatDetailsBody">
              <h3>LATITUDE OF INDIAN STATES</h3>
              <hr />
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>State ID</th>
                    <th>States</th>
                    <th>Latitude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {latitude.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <th>{item.state_id}</th>
                        <th>{item.states}</th>
                        <th>{item.latitude}</th>
                        <th>
                          <Link to={`/update-latitude/${item.state_id}`} state={{ user: user }}>
                            <button className="btn btn-edit">EDIT</button>
                          </Link>
                          <button className="btn btn-delete" onClick={() => deleteState(item.state_id)}>DELETE</button>
                          <Link to={`/view-latitude/${item.state_id}`} state={{ user: user }}>
                            <button className="btn btn-view">VIEW</button>
                          </Link>
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <Link to="/add-state" state={{ user: user }}>
                <button className="addBtn">ADD STATE</button>
              </Link>

            </div>
          </section>

          <section id="obserLatDetails" style={{ marginBottom: "100px" }}>
            <div className="obserLatDetailsBody">
              <h3>LATITUDE OF INDIAN OBSERVATORY</h3>
              <hr />
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Observatory ID</th>
                    <th>Observatory Name</th>
                    <th>Latitude</th>
                    <th>Altitude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {obserLatitude.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <th>{item.observatory_id}</th>
                        <th>{item.observatory_name}</th>
                        <th>{item.observatory_latitude}</th>
                        <th>{item.altitude}</th>
                        <th>
                          <Link to={`/update-obserlatitude/${item.observatory_id}`} state={{ user: user }}>
                            <button className="btn btn-edit">EDIT</button>
                          </Link>
                          <button className="btn btn-delete" onClick={() => deleteObser(item.observatory_id)}>DELETE</button>
                          <Link to={`/view-obserlatitude/${item.observatory_id}`} state={{ user: user }}>
                            <button className="btn btn-view">VIEW</button>
                          </Link>
                        </th>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <Link to="/add-observatory" state={{ user: user }}>
                <button className="addBtn">ADD OBSERVATORY</button>
              </Link>

            </div>
          </section>

        </article>
      ) : (
          <LoginForm Login={Login} />
        )}
    </div>
  );
};

export default Login;