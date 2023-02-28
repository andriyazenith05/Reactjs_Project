import React from 'react';
import { Link } from "react-router-dom";

const SiderealTime = () => {
  return (
    <article id="SiderealTime">
      <div id="SThead">
        <Link to="/">
          <img className="logo" src={require('./img/logo.png')} />
        </Link>
        <h2 className="title">SIDEREAL TIME</h2>
      </div>
    </article>
  )
}

export default SiderealTime
