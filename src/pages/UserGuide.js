import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import RS_IndianState from './RS_IndianState';
import RS_IndianObservatory from './RS_IndianObservatory';
import "./UserGuide.css";
import axios from "axios";


const UserGuide = () => {
  return (
    <article id="SiderealTime">
      <div id="SThead">
        <Link to="/">
          <img className="logo" src={require('./img/logo.png')} />
        </Link>
        <h2 className="title">USER GUIDE</h2>
      </div>
      <section className="UserGuide">
        <div className="JD-UG">
          <div className="JD1">
            <img className="JDUGimg" src={require('./img/JD.jpg')} />
          </div>
          <div>
            <p>The term Julian date may also refer, outside of astronomy, to the day-of-year number in the Gregorian calendar,
              especially in computer programming, the military and the food industry, or it may refer to dates in the Julian calendar.</p>
            <p>The Julian day is the continuous count of days since the beginning of the Julian period, and is used primarily by astronomers,
              and in software for easily calculating elapsed days between two events.</p>
          </div>
        </div>

        <div className="RS-UG">
          <div className="RS1">
            <img className="RSUGimg" src={require('./img/RS.jpg')} />
          </div>
          <div>
            <p>The fact that celestial objects rise in the east and set in the west (or, for circumpolar stars, circle around the
            north or south celestial pole) each day led the ancient Greeks to assume that the entire celestial sphere rotates around
               us once each day, going from east to west .</p>
            <p>Stars rise in the east and set in the west, just like the Sun and Moon do. It's because the Earth spins from west
              to east, so everything in the sky comes into view as we spin towards it and leaves our view as we spin away from it.</p>
          </div>
        </div>

        <div className="VO-UG">
          <div className="VO1">
            <img className="VOUGimg" src={require('./img/VO.jpg')} />
          </div>
          <div>
            <p>Aladin-Lite is used to view celestial objects in sky.</p>
            <p>Aladin lite is a lightweight version of the Aladin tool, running in the browser and geared towards simple
              visualization of a sky region. Aladin lite is powered by the HTML5 canvas technology, currently supported by any modern browser..</p>
          </div>
        </div>
      </section>

    </article >
  )
}

export default UserGuide;
