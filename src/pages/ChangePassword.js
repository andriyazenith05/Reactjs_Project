import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ForgotPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from 'validator';
const ChangePassword = () => {
  const [loginDetailsList, setLoginList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/get/admin').then((response) => {
      setLoginList(response.data);
    });
  }, []);
  const [details, setDetails] = useState({ adminid: "", favphy: "", favstar: "" });
  const [initialVal, setinitialVal] = useState({ newpass: "", connewpass: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const ChangePassword = userdetails => {
    console.log(userdetails);
    for (var i = 0; i < loginDetailsList.length; i++) {
      if (loginDetailsList[i].admin_id == userdetails.adminid && loginDetailsList[i].fav_physicist == userdetails.favphy && loginDetailsList[i].fav_star == userdetails.favstar) {
        setDetails({
          adminid: userdetails.adminid,
          favphy: userdetails.favphy,
          favstar: userdetails.favstar
        });
      }
    }
  }
  const refCPInput1 = useRef(null);
  const refCPInput2 = useRef(null);
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
  const notifyCP1 = () => toast.error("Please provide same password in both the fields");
  const notifyCP2 = () => toast.error("Please provide a strong password");
  const changePassword = e => {
    e.preventDefault();
    if (refCPInput1.current?.value && refCPInput2.current?.value) {
      if (refCPInput1.current?.value != refCPInput2.current?.value) {
        return notifyCP1();
      }
      else if (refCPInput1.current?.value == refCPInput2.current?.value && errorMessage == "Is Strong Password") {
        console.log("got in");
        var adminID = details.adminid;
        var newPassword = refCPInput2.current?.value;
        axios.put(`http://localhost:3001/api/putpassword/${adminID}`, {
          newPassword,
        }).then(() => {
          setDetails({ adminid: "", favphy: "", favstar: "" });
        })
          .catch((err) => toast.error(err.response.data));
        toast.success("Password Updated Successfully!");
        setTimeout(() => navigate("/login"), 500);
      }
      else {
        return notifyCP2();
      }
    }
  }
  return (
    <div>
      {(details.adminid != "") ? (
        <article className="body">
          <img className="bgimg" src={require('./img/bg1.jpg')} />
          <section className="container">
            <form>
              <div className="card2">
                <h3>CHANGE YOUR PASSWORD</h3>
                <p className="passsubtitle">Password must be minimum eight characters, at least one uppercase & one lowercase letter, one number and one special character</p>
                <label>Enter New Password</label><br />
                <input type="text" name="newpass" id="newpass" autoComplete="off" defaultValue={initialVal.newpass} onChange={(e) => validate(e.target.value)} ref={refCPInput1} /><br />
                <span style={{ fontWeight: 'bold', color: 'red', }}>{errorMessage}</span><br /><br />
                <label>Confirm New Password</label><br />
                <input type="text" name="connewpass" id="connewpass" autoComplete="off" defaultValue={initialVal.connewpass} ref={refCPInput2} /><br />
                <button id="changepass" onClick={changePassword}>CHANGE PASSWORD</button>
              </div>
            </form>
          </section>
        </article>
      ) : (
          <ForgotPassword ChangePassword={ChangePassword} />
        )}
    </div>
  )
}
export default ChangePassword;
