import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import RS_IndianState from './RS_IndianState';
import RS_IndianObservatory from './RS_IndianObservatory';
import "./RS_Stars.css";
import axios from "axios";
const RS_Stars = () => {
  const date = new Date();
  var hr = date.getUTCHours();
  var min = date.getUTCMinutes();
  var sec = date.getUTCSeconds();
  return (
    <article id="RS_timeCal">
      <div id="RSstarhead">
        <Link to="/">
          <img className="logo" src={require('./img/logo.png')} />
        </Link>
        <h2 className="title">STAR RISE AND SET TIME CALCULATOR</h2>
      </div>
      <nav id="RS_nav">
        <div className="RS_head">
          <ul>
            <li>
              <a href="#div1">star rise & set in indian states</a>
            </li>
            <li>
              <a href="#div2">observatory star rise & set time</a>
            </li>
            <li>
              <a href="#div3">data</a>
            </li>
          </ul>
        </div>
      </nav>
      <section className="sec_style">
        <div id="div1">
          <RS_IndianState />
        </div>

        <div id="div2" style={{ marginTop: "50px" }}>
          <RS_IndianObservatory />
        </div>

        <div id="div3" style={{ marginTop: "50px" }}>
          <article id="div1_style">
            <h3>Astronomy Calendar of Celestial Events - 2022</h3>
            <hr />
            <section id="sec1">
              <table id="eventsTable">
                <tr>
                  <th>DATE</th>
                  <th>EVENTS</th>
                </tr>
                <tr>
                  <td>January 3, 4 </td>
                  <td>Quadrantids Meteor Shower</td>
                </tr>
                <tr>
                  <td>January 7</td>
                  <td>Mercury at Greatest Eastern Elongation</td>
                </tr>
                <tr>
                  <td>January 17</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>February 1</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>February 16</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>February 16</td>
                  <td>Mercury at Greatest Western Elongation</td>
                </tr>
                <tr>
                  <td>March 2</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>March 18</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>March 20</td>
                  <td>March Equinox</td>
                </tr>
                <tr>
                  <td>April 1</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>April 16</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>April 22, 23</td>
                  <td>Lyrids Meteor Shower</td>
                </tr>
                <tr>
                  <td>April 29</td>
                  <td>Mercury at Greatest Eastern Elongation</td>
                </tr>
                <tr>
                  <td>April 30</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>April 30</td>
                  <td>Partial Solar Eclipse</td>
                </tr>
                <tr>
                  <td>May 6, 7</td>
                  <td>Eta Aquarids Meteor Shower</td>
                </tr>
                <tr>
                  <td>May 16</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>May 16</td>
                  <td>Total Lunar Eclipse</td>
                </tr>
                <tr>
                  <td>May 30</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>June 14</td>
                  <td>Full Moon, Supermoon</td>
                </tr>
                <tr>
                  <td>June 16</td>
                  <td>Mercury at Greatest Western Elongation</td>
                </tr>
                <tr>
                  <td>June 21</td>
                  <td>June Solstice</td>
                </tr>
                <tr>
                  <td>June 29</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>June 29</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>July 13</td>
                  <td>Full Moon, Supermoon</td>
                </tr>
                <tr>
                  <td>July 28</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>July 28, 29</td>
                  <td>Delta Aquarids Meteor Shower</td>
                </tr>
                <tr>
                  <td>August 12</td>
                  <td>Full Moon, Supermoon</td>
                </tr>
                <tr>
                  <td>August 12, 13</td>
                  <td>Perseids Meteor Shower</td>
                </tr>
                <tr>
                  <td>August 14</td>
                  <td>Saturn at Opposition</td>
                </tr>
                <tr>
                  <td>August 27</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>August 27</td>
                  <td>Mercury at Greatest Eastern Elongation</td>
                </tr>
                <tr>
                  <td>September 10</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>September 16</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>September 23</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>September 25</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>September 26</td>
                  <td>Jupiter at Opposition</td>
                </tr>
                <tr>
                  <td>October 7</td>
                  <td>Draconids Meteor Shower</td>
                </tr>
                <tr>
                  <td>October 9</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>October 21,22</td>
                  <td>Orionids Meteor Shower</td>
                </tr>
                <tr>
                  <td>October 25</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>October 25</td>
                  <td>Partial Solar Eclipse</td>

                </tr>
                <tr>
                  <td>November 4,5</td>
                  <td>Taurids Meteor Shower</td>
                </tr>
                <tr>
                  <td>November 8</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>November 8</td>
                  <td>Total Lunar Eclipse</td>
                </tr>
                <tr>
                  <td>November 9</td>
                  <td>Uranus at Opposition</td>
                </tr>
                <tr>
                  <td>November 17,18</td>
                  <td>Leonids Meteor Shower</td>
                </tr>

                <tr>
                  <td>November 23</td>
                  <td>New Moon</td>
                </tr>
                <tr>
                  <td>December 8</td>
                  <td>Full Moon</td>
                </tr>
                <tr>
                  <td>December 8</td>
                  <td>Mars at Opposition</td>
                </tr>
                <tr>
                  <td>December 13,14</td>
                  <td>Geminids Meteor Shower</td>
                </tr>
                <tr>
                  <td>December 21</td>
                  <td>December Solstice</td>
                </tr>
                <tr>
                  <td>December 21</td>
                  <td>Mercury at Greatest Eastern Elongation</td>
                </tr>
                <tr>
                  <td>December 21,22</td>
                  <td>Ursids Meteor Shower</td>
                </tr>
                <tr>
                  <td>December 23</td>
                  <td>New Moon</td>
                </tr>
              </table>
            </section>
          </article>
        </div>
      </section>
    </article >
  )
}
export default RS_Stars;