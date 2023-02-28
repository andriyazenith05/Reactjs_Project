import React from "react";
import mp4 from "./video.mp4";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <article id="main">
      <ReactPlayer className="video" playing={true} loop url={mp4} width="100%" height="100%" />
      <nav id="navbar">
        <section className="head">
          <div>
            <a href="#main"><img className="logo" src={require('./img/logo.png')} /></a>
          </div>
          <div>
            <ul>
              <li>
                <a href="#JD">JULIAN DATE</a>
              </li>
              <li>
                <a href="#RS">RISE & SET</a>
              </li>
              <li>
                <Link to="/skymap">VIEW OBJECTS</Link>
              </li>
              <li>
                <Link to="/user-guide">USER GUIDE</Link>
              </li>
            </ul>
          </div>
          <div className="admin">
            <Link to="/login">LOGIN</Link>
          </div>
        </section>
      </nav>
      <article className="sub-div">
        <section id="JD">
          <div className="text1">
            <h2 className="title">JULIAN DATE</h2>
            <p>The Julian date is defined as the number of days which has elapsed since the 1st January of the year 4713 BC 12 h
            Universal Time.</p>
            <Link to="/juliandate">
              <button id="btn1">CALCULATE</button>
            </Link>
          </div>
          <img className="img" src={require('./img/img1.jpg')} />
        </section>
        <section id="RS">
          <div className="text3">
            <h2 className="title">RISING & SETTING OF THE STARS</h2>
            <p>Stars rise in the east and set in the west, just like the Sun and Moon do. It's because the Earth spins from west
            to east, so everything in the sky comes into view as we spin towards it and leaves our view as we spin away from it.</p>
            <Link to="/rise&set-of-stars">
              <button id="btn1">CALCULATE</button>
            </Link>
          </div>
          <img className="img" src={require('./img/img3.jpg')} />
        </section>
      </article>
    </article>
  );
};
export default Home;