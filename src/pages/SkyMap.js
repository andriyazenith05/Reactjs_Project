import React from 'react';
import { Link } from "react-router-dom";
import AladinLite from "./AladinLite";
import "./AladinLite.css";
const SkyMap = () => {
  return (
    <article id="Skymap">
      <div id="Skymaphead">
        <Link to="/">
          <img className="logo" src={require('./img/logo.png')} />
        </Link>
        <h2 className="title">EXPLORE CELESTIAL OBJECTS</h2>
      </div>
      <div id="showskymap">
        <AladinLite />
      </div>
    </article>
  )
}
export default SkyMap;
