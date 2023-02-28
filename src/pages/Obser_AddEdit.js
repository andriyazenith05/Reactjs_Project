import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";

const initialState = {
  Obser_name: "",
  Obser_latitude: "",
  altitude: "",
}

const Obser_AddEdit = (props) => {

  const [state, setState] = useState(initialState);

  const { Obser_name, Obser_latitude, altitude } = state;

  const [fromtoLogin, setfromtoLogin] = useState({ loginUsername: "", loginPassword: "" });

  const [loginInitial, setLoginInitial] = useState(true);

  const { obserId } = useParams();
  console.log(obserId);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/obserlatitude/${obserId}`)
      .then((resp) => {
        setState({ Obser_name: resp.data[0].observatory_name, Obser_latitude: resp.data[0].observatory_latitude, altitude: resp.data[0].altitude });
      });
  }, [obserId]);

  const handleSubmitNewObser = e => {
    e.preventDefault();
    if (!Obser_name || !Obser_latitude || !altitude ) {
      toast.error("Please provide value into each input field");
    }
    else {
      if(!obserId){
        axios
          .post('http://localhost:3001/api/post/observatory', {
            Obser_name,
            Obser_latitude,
            altitude,
          })
          .then(() => {
            setState({ Obser_name: "", Obser_latitude: "", altitude: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Observatory Added Successfully!");
        setState({ Obser_name: "", Obser_latitude: "", altitude: "" });
      }
      else{
        axios
          .put(`http://localhost:3001/api/update/obser-latitude/${obserId}`, {
            Obser_name,
            Obser_latitude,
            altitude,
          })
          .then(() => {
            setState({ Obser_name: "", Obser_latitude: "", altitude: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Observatory Updated Successfully!");
        setState({ Obser_name: "", Obser_latitude: "", altitude: "" });
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
        <form id="addEditForm" onSubmit={handleSubmitNewObser}>
          <div className="card2">

            <label htmlFor="Obser_name">Observatory Name</label>
            <input
              type="text"
              id="addObserName"
              name="Obser_name"
              value={Obser_name || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="Obser_latitude">Latitude</label>
            <input
              type="text"
              id="addObserLat"
              name="Obser_latitude"
              value={Obser_latitude || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="altitude">Altitude</label>
            <input
              type="text"
              id="addAltitude"
              name="altitude"
              value={altitude || ""}
              onChange={handleInputChange}
            />

            <input type="submit" value={obserId ? "UPDATE" : "SAVE"} />
            <Link to="/login" state={{ fromtoLogin: fromtoLogin, loginInitial: loginInitial }}>
              <input type="button" value="GO BACK" />
            </Link>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Obser_AddEdit;
