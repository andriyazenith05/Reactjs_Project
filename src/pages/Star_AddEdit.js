import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddEdit.css";
import axios from "axios";

const initialState = {
  HD: "",
  RA: "",
  DEC: "",
  V: "",
}

const Star_AddEdit = (props) => {

  const [state, setState] = useState(initialState);

  const { HD, RA, DEC, V } = state;

  const [fromtoLogin, setfromtoLogin] = useState({ loginUsername: "", loginPassword: "" });

  const [loginInitial, setLoginInitial] = useState(true);

  const { starId } = useParams();
  console.log(starId);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/star/${starId}`)
      .then((resp) => {
        setState({ HD: resp.data[0].HD, RA: resp.data[0].Right_Ascension, DEC: resp.data[0].Declination, V: resp.data[0].Magnitude });
      });
  }, [starId]);

  console.log(starId);

  const handleSubmitNewStar = e => {
    e.preventDefault();
    if (!HD || !RA || !DEC || !V) {
      toast.error("Please provide value into each input field");
    }
    else {
      if (!starId) {
        axios
          .post('http://localhost:3001/api/post/star', {
            HD,
            RA,
            DEC,
            V,
          })
          .then(() => {
            setState({ HD: "", RA: "", DEC: "", V: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Star Added Successfully!");
        setState({ HD: "", RA: "", DEC: "", V: "" });
      }
      else {
        axios
          .put(`http://localhost:3001/api/update/star/${starId}`, {
            HD,
            RA,
            DEC,
            V,
          })
          .then(() => {
            setState({ HD: "", RA: "", DEC: "", V: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Star Updated Successfully!");
        setState({ HD: "", RA: "", DEC: "", V: "" });
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
        <form id="addEditForm" onSubmit={handleSubmitNewStar}>
          <div className="card2">

            <label htmlFor="HD">HD (Object Name)</label>
            <input
              type="text"
              id="addHD"
              name="HD"
              value={HD || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="RA">Right Ascension</label>
            <input
              type="text"
              id="addRA"
              name="RA"
              value={RA || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="DEC">Declination</label>
            <input
              type="text"
              id="addDEC"
              name="DEC"
              value={DEC || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="V">Magnitude</label>
            <input
              type="text"
              id="addmag"
              name="V"
              value={V || ""}
              onChange={handleInputChange}
            />

            <input type="submit" value={starId ? "UPDATE" : "SAVE"} />
            <Link to="/login" state={{ fromtoLogin: fromtoLogin, loginInitial: loginInitial }}>
              <input type="button" value="GO BACK" />
            </Link>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Star_AddEdit;


