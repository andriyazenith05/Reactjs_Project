import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";

const initialState = {
  stateName: "",
  latitude: "",
}

const State_AddEdit = (props) => {

  const [state, setState] = useState(initialState);

  const { stateName, latitude } = state;

  const [fromtoLogin, setfromtoLogin] = useState({ loginUsername: "", loginPassword: "" });
  const [loginInitial, setLoginInitial] = useState(true);

  const { stateId } = useParams();
  console.log(stateId);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/latitude/${stateId}`)
      .then((resp) => {
        setState({ stateName: resp.data[0].states, latitude: resp.data[0].latitude });
      });
  }, [stateId]);

  console.log(stateId);

  const handleSubmitNewState = e => {
    e.preventDefault();
    if (!stateName || !latitude) {
      toast.error("Please provide value into each input field");
    }
    else {
      if (!stateId) {
        axios
          .post('http://localhost:3001/api/post/state', {
            stateName,
            latitude,
          })
          .then(() => {
            setState({ stateName: "", latitude: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Star Added Successfully!");
        setState({ stateName: "", latitude: "" });
      }
      else {
        axios
          .put(`http://localhost:3001/api/update/state-latitude/${stateId}`, {
            stateName,
            latitude,
          })
          .then(() => {
            setState({ stateName: "", latitude: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Star Updated Successfully!");
        setState({ stateName: "", latitude: "" });
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
        <form id="addEditForm" onSubmit={handleSubmitNewState}>
          <div className="card2">

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="addstate"
              name="stateName"
              value={stateName || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="latitude">Latitude</label>
            <input
              type="text"
              id="addlatitude"
              name="latitude"
              value={latitude || ""}
              onChange={handleInputChange}
            />

            <input type="submit" value={stateId ? "UPDATE" : "SAVE"} />
            <Link to="/login" state={{ fromtoLogin: fromtoLogin, loginInitial: loginInitial }}>
              <input type="button" value="GO BACK" />
            </Link>
          </div>

        </form>
      </section>
    </div>
  )
}

export default State_AddEdit;
