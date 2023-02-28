import React, { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./RS_Stars.css";
import axios from "axios";
const RS_IndianState = () => {
  const refInput1 = useRef(null);
  const refInput2 = useRef(null);
  const refInput3 = useRef(null);
  const refInput4 = useRef(null);
  const refInput5 = useRef(null);
  const refInput6 = useRef(null);
  const [starList, setStarList] = useState([]);
  const [stateLatList, setStateLatList] = useState([]);
  const [objectName, setObjName] = useState("");
  useEffect(() => {
    let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov: 0.7 })

    $('input[name=survey]').change(function () {
      aladin.setImageSurvey($(this).val());
    });
    aladin.gotoObject(objectName);
  }, [objectName]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/get/star').then((response) => {
      setStarList(response.data);
    });
    axios.get('http://localhost:3001/api/get/latitude').then((response) => {
      setStateLatList(response.data);
    });
  }, []);
  const [starid, setStarID] = useState("");
  const [starobj, setStarObj] = useState("");
  const [stateLat, setStateLat] = useState();
  const notify1 = () => toast.error("Invalid input!");
  const notify2 = () => toast.error("Invalid object name!");
  const notify3 = () => toast.error("Please enter either Star ID or Object Name");
  var isStarID, isStarObj;
  const get = e => {
    e.preventDefault();
    if (refInput1.current?.value) {
      var starID = parseInt(refInput1.current?.value);
      setStarID(starID);
      for (var i = 0; i < starList.length; i++) {
        if (starList[i].star_id === starID) {
          console.log(starList[i].HD);
          setStarObj(starList[i].HD)
          refInput2.current.value = starList[i].HD;
          isStarID = true;
        }
      }
      if (!isStarID) {
        return notify1();
      }
    }
    else if (refInput2.current?.value) {
      var starObject = parseInt(refInput2.current?.value);
      setStarObj(starObject);
      for (var i = 0; i < starList.length; i++) {
        if (starList[i].HD === starObject) {
          setStarID(starList[i].star_id)
          refInput1.current.value = starList[i].star_id;
          isStarObj = true;
        }
      }
      if (!isStarObj) {
        return notify2();
      }
    }
    else if (!refInput1.current?.value && !refInput2.current?.value) {
      return notify3();
    }

    var mapStar = "HD " + refInput2.current?.value;
    console.log(mapStar);
    setObjName(mapStar);
  }

  const stateChange = e => {
    e.preventDefault();
    var stateVal = e.target.value;
    //console.log(stateVal);
    for (var i = 0; i < stateLatList.length; i++) {
      //console.log(stateLatList[i].states);
      if (stateLatList[i].states == stateVal) {
        setStateLat(stateLatList[i].latitude)
        break;
      }
    }
  }

  const result = e => {

    if (!refInput1.current?.value || !refInput2.current?.value) {
      toast.error("Please fill in all the input fields");
    }

    e.preventDefault();
    for (var i = 0; i < starList.length; i++) {
      if (starList[i].star_id == starid) {
        refInput3.current.value = starList[i].Right_Ascension;
        refInput4.current.value = starList[i].Declination;
        break;
      }
    }
    var decInitialVal = refInput4.current.value;
    var decSplit = decInitialVal.split(" ");
    console.log(decSplit[0]);
    console.log(decSplit[1]);
    var decVal = parseFloat(decSplit[0]) + (parseFloat(decSplit[1]) / 60);
    console.log(decVal);
    console.log(stateLat);
    var a = (-Math.tan(decVal * Math.PI / 180)) * (Math.tan(stateLat * Math.PI / 180));
    console.log(a);
    var h = Math.acos(a) * 180 / Math.PI;
    console.log(h);
    var degree = parseFloat(h.toFixed(2));
    console.log(degree);

    var hourAngle = degree / 15;
    console.log("hourangle", hourAngle);

    var hrs = Number(hourAngle.toString().split('.')[0]);
    console.log(hrs);

    function getDecimalPart(hourAngle) {
      if (Number.isInteger(hourAngle)) {
        return 0;
      }
      const decimalStr = hourAngle.toString().split('.')[1];
      return decimalStr;
    }
    var decimalVal = getDecimalPart(hourAngle);
    //console.log(decimalVal);

    var mins = Math.round(Number("0." + decimalVal) * 60);
    console.log(mins);

    var raInitialVal = refInput3.current.value;
    var raSplit = raInitialVal.split(" ");
    var rahrs = Number(raSplit[0]);
    var ramins = Number(Math.round(raSplit[1]));
    console.log(rahrs);
    console.log(ramins);

    function getRiseTime(rahrs, ramins, hrs, mins) {
      if (ramins < mins && rahrs < hrs) {
        rahrs += 23;
        ramins += 60;
        var min = ramins - mins;
        var hr = rahrs - hrs;
        var riseTime = hr.toString() + " hr " + min.toString() + " min";
        console.log(riseTime);
        return riseTime;
      }
      else if (ramins < mins && rahrs > hrs) {
        rahrs -= 1;
        ramins += 60;
        var min = ramins - mins;
        var hr = rahrs - hrs;
        var riseTime = hr.toString() + " hr " + min.toString() + " min";
        console.log(riseTime);
        return riseTime;
      }
      else if (ramins > mins && rahrs > hrs) {
        var min = ramins - mins;
        var hr = rahrs - hrs;
        var riseTime = hr.toString() + " hr " + min.toString() + " min";
        console.log(riseTime);
        return riseTime;
      }
      else if (ramins > mins && rahrs < hrs) {
        var min = ramins - mins;
        rahrs += 24;
        var hr = rahrs - hrs;
        var riseTime = hr.toString() + " hr " + min.toString() + " min";
        console.log(riseTime);
        return riseTime;
      }
    }

    var riseTimeVal = getRiseTime(rahrs, ramins, hrs, mins);
    console.log(riseTimeVal);
    refInput5.current.value = riseTimeVal;

    function getSetTime(rahrs, ramins, hrs, mins) {
      var hr = rahrs + hrs;
      var min = ramins + mins;
      if (min > 60) {
        hr += 1;
        min -= 60;
        if (hr > 24) {
          hr -= 24;
          var setTime = hr.toString() + " hr " + min.toString() + " min";
          console.log(setTime);
          return setTime;
        }
        else {
          var setTime = hr.toString() + " hr " + min.toString() + " min";
          console.log(setTime);
          return setTime;
        }
      }
      else {
        var setTime = hr.toString() + " hr " + min.toString() + " min";
        console.log(setTime);
        return setTime;
      }
    }

    var setTimeVal = getSetTime(rahrs, ramins, hrs, mins);
    console.log(setTimeVal);
    refInput6.current.value = setTimeVal;
  }

  return (
    <article id="div1_style">
      <h3>Rise & Set of Stars in Indian States</h3>
      <hr />
      <section id="sec1">

        <div className="skymap_obser">
          <div id='aladin-lite-div' style={{ width: '100%', height: '300px' }} />
        </div>

        <label>Enter Star ID (From 1 to 29): </label>
        <input type="text" name="starid" id="starid" className="shadow-1" autoComplete="off" placeholder="Eg. 1" ref={refInput1} />

        <label><span className="span1">(OR)</span>Enter Object Name: </label>
        <input type="text" name="starobj" id="starobj" autoComplete="off" placeholder="Eg. 1835" ref={refInput2} />

        <button className="getbtn" onClick={get}>GET</button><br /><br />

        <div className="RSselect-style">
          <label>Select State: </label>
          <select required onChange={stateChange}>
            <option value="" selected disabled>Select a state!</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu & Kashmir">Jammu & Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select><br /><br />
        </div>

        <button className="resbtn" onClick={result}>CALCULATE</button>

        <div className="objco">
          <p className="optext" >Object Coordinates & The Result:</p>
          <label>Right Ascension(RA): </label>
          <input type="text" name="RA" id="RA" autoComplete="off" placeholder="hr  min" ref={refInput3} disabled /><br /><br />

          <label>Declination(DEC): </label>
          <input type="text" name="DEC" id="DEC" autoComplete="off" placeholder="deg  min" ref={refInput4} className="dec" disabled />
        </div>

        <div className="res">
          <label>Rise Time: </label>
          <input type="text" name="rise" id="rise" autoComplete="off" ref={refInput5} disabled />

          <label className="set">Set Time: </label>
          <input type="text" name="set" id="set" autoComplete="off" ref={refInput6} disabled />
        </div>
      </section>
    </article>
  )
}
export default RS_IndianState;
