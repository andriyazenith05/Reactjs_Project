import React, { useEffect, useState, useRef } from "react";
import "./AladinLite.css";
import { toast } from 'react-toastify';
const AladinLite = () => {
  const inputRef = useRef(null);
  const [objectName, setObjName] = useState("");
  useEffect(() => {
    let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov: 0.8 })
    $('input[name=survey]').change(function () {
      aladin.setImageSurvey($(this).val());
    });
    aladin.gotoObject(objectName);
  }, [objectName]);
  const map = e => {
    e.preventDefault();
    if (!inputRef.current.value) {
      toast.error("Please provide a star name or use the presets given");
    }
    var objname = inputRef.current?.value;
    setObjName(objname);
  }
  var star1 = "ACAMAR", star2 = "Propus", star3 = "Vega", star4 = "Zibal";
  const ACAMAR = e => {
    inputRef.current.value = star1;
    setObjName(star1);
  }
  const Propus = e => {
    inputRef.current.value = star2;
    setObjName(star2);
  }
  const Vega = e => {
    inputRef.current.value = star3;
    setObjName(star3);
  }
  const Zibal = e => {
    inputRef.current.value = star4;
    setObjName(star4);
  }
  return (
    <article id="skymap_style">
      <section id="skymap_sec">
        <div className="mapObj">
          <input type="text" name="object" id="celobj" placeholder="Star/Object Name" autoComplete="off" required ref={inputRef} />
          <button onClick={map}>MAP</button>

          <div className="star-presets">
            <h4>STAR PRESETS:</h4>
            <ul className="starList">
              <li onClick={ACAMAR}>ACAMAR</li>
              <li onClick={Propus}>Propus</li>
              <li onClick={Vega}>Vega</li>
              <li onClick={Zibal}>Zibal</li>
            </ul>
          </div>
        </div>

        <div className="skymap">
          <div id='aladin-lite-div' style={{ width: '720px', height: '450px' }} />
          <div className="inputfields">
            <input id="DSS" type="radio" name="survey" value="P/DSS2/color" defaultChecked /><label htmlFor="DSS"> DSS color</label>
            <input id="DSS-blue" type="radio" name="survey" value="P/DSS2/blue" /><label htmlFor="DSS-blue"> DSS blue</label>
            <input id="2MASS" type="radio" name="survey" value="P/2MASS/color" /><label htmlFor="2MASS"> 2MASS</label>
            <input id="allwise" type="radio" name="survey" value="P/allWISE/color" /><label htmlFor="allwise"> AllWISE</label>
          </div>
        </div>
      </section>
    </article>

  )
}
export default AladinLite;
