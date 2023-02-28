import React, { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./RS_Stars.css";
import axios from "axios";
const RS_IndianObservatory = () => {
  const refInput1 = useRef(null);
  const refInput2 = useRef(null);
  const refInput3 = useRef(null);
  const refInput4 = useRef(null);
  const refInput5 = useRef(null);
  const refInput6 = useRef(null);
  const [starList, setStarList] = useState([]);
  const [observatoryLatList, setObservatoryLatList] = useState([]);
  const [objectName, setObjName] = useState("");
  useEffect(() => {
    let aladin = window.A.aladin('#aladin-lite-div-obser', { survey: 'P/DSS2/color', fov: 0.7 })

    $('input[name=survey]').change(function () {
      aladin.setImageSurvey($(this).val());
    });

    aladin.gotoObject(objectName);

  }, [objectName]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/get/star').then((response) => {
      setStarList(response.data);
    });

    axios.get('http://localhost:3001/api/get/observatory-latitude').then((response) => {
      setObservatoryLatList(response.data);
    });
  }, []);

  const [starid, setStarID] = useState("");
  const [starobj, setStarObj] = useState("");
  const [obserLat, setObserLat] = useState();

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
        toast.error("Invalid input!");
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
        toast.error("Invalid object name!");
      }
    }
    else if (!refInput1.current?.value && !refInput2.current?.value) {
      toast.error("Please enter either Star ID or Object Name");
    }

    var mapStar = "HD " + refInput2.current?.value;
    console.log(mapStar);
    setObjName(mapStar);
  }

  const observatoryChange = e => {
    e.preventDefault();
    var observatoryVal = e.target.value;
    for (var i = 0; i < observatoryLatList.length; i++) {
      if (observatoryLatList[i].observatory_name == observatoryVal) {
        setObserLat(observatoryLatList[i].observatory_latitude)
        break;
      }
    }
  }

  console.log(obserLat);
  const resultObser = e => {

    if(!refInput1.current?.value || !refInput2.current?.value){
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
    var decVal = parseFloat(decSplit[0]) + (parseFloat(decSplit[1]) / 60);
    var obserSplit = obserLat.split(" ");
    var obserLatVal = parseFloat(obserSplit[0]) + (Math.round(parseFloat(obserSplit[1])) / 60);
    var a = (-Math.tan(decVal * Math.PI / 180)) * (Math.tan(obserLatVal * Math.PI / 180));
    var h = Math.acos(a) * 180 / Math.PI;
    var degree = parseFloat(h.toFixed(2));
    var hourAngle = degree / 15;
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
      <h3>Rise & Set of Stars in Indian Observatory</h3>
      <hr />
      <section id="sec1">

        <div className="skymap_obser">
          <div id='aladin-lite-div-obser' style={{ width: '100%', height: '300px' }} />
        </div>

        <label>Enter Star ID (From 1 to 29): </label>
        <input type="text" name="starid" id="starid" autoComplete="off" placeholder="Eg. 1" ref={refInput1} />

        <label><span className="span1">(OR)</span>Enter Object Name: </label>
        <input type="text" name="starobj" id="starobj" autoComplete="off" placeholder="Eg. 1835" ref={refInput2} />

        <button className="getbtn" onClick={get}>GET</button><br /><br />

        <div className="RSselect-style-observatory">
          <label>Select Observatory: </label>
          <select required onChange={observatoryChange}>
            <option value="" selected disabled>Select a observatory!</option>
            <option value="Aryabhatta Res. Inst. of Obs. Sci.">Aryabhatta Res. Inst. of Obs. Sci.</option>
            <option value="Gauribidanur Radio Obs.">Gauribidanur Radio Obs.</option>
            <option value="Gurushikhar Infrared Obs.">Gurushikhar Infrared Obs.</option>
            <option value="Indian Ast. Obs.">Indian Ast. Obs.</option>
            <option value="Japal-Rangapur Obs.">Japal-Rangapur Obs.</option>
            <option value="Kodaikanal Solar Obs.">Kodaikanal Solar Obs.</option>
            <option value="National Centre for Radio Aph.">National Centre for Radio Aph.</option>
            <option value="Nizamiah Obs.">Nizamiah Obs.</option>
            <option value="Radio Ast. Center">Radio Ast. Center</option>
            <option value="Vainu Bappu Obs.">Vainu Bappu Obs.</option>
          </select><br /><br />
        </div>

        <button className="resbtn" onClick={resultObser}>CALCULATE</button>

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

export default RS_IndianObservatory;
