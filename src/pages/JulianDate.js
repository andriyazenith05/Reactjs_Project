import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JulianDate.css"
import { toast } from "react-toastify";
class JulianDate extends Component {
  constructor(props) {
    super(props);
    this.refDate1 = React.createRef();
    this.state = {
      val1: "show",
      val2: "hide",
      currentDate1: this.currentDate1(),
      currentDate2: this.currentDate2(),
      currentJD1: this.currentJulianDate1(),
      currentJD2: this.currentJulianDate2(),
    }
    this.sectionStatus = this.sectionStatus.bind(this);
    this.updateDateValue = this.updateDateValue.bind(this);
    this.updateJDValue = this.updateJDValue.bind(this);
    this.submit1 = this.submit1.bind(this);
    this.submit2 = this.submit2.bind(this);
  };
  currentDate1() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  currentDate2() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  currentJulianDate1() {
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var J = ((367 * y) - Math.trunc((Math.trunc(((m + 9) / 12) + y) / 4) * 7) - Math.trunc(((((((m - 9) / 7) + y) / 100) + 1) * 3) / 4)
      + Math.trunc(275 * m / 9) + d + 1721029) - 0.5;
    return `${J}`;
  };
  currentJulianDate2() {
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    var J = ((367 * y) - Math.trunc((Math.trunc(((m + 9) / 12) + y) / 4) * 7) - Math.trunc(((((((m - 9) / 7) + y) / 100) + 1) * 3) / 4)
      + Math.trunc(275 * m / 9) + d + 1721029);
    return `${J}`;
  };
  updateDateValue(e) {
    this.setState({ currentDate1: e.target.value });
  };
  updateJDValue(e) {
    this.setState({ currentJD2: e.target.value });
  };
  submit1(e) {
    e.preventDefault();
    if (!this.state.currentDate1) {
      toast.error("Please provide a data value");
      this.setState({ currentJD1: " " });
    }
    else {
      var val = this.state.currentDate1.split('/');
      var d = parseInt(val[0]);
      var m = parseInt(val[1]);
      var y = parseInt(val[2]);
      var J = ((367 * y) - Math.trunc((Math.trunc(((m + 9) / 12) + y) / 4) * 7) - Math.trunc(((((((m - 9) / 7) + y) / 100) + 1) * 3) / 4)
        + Math.trunc(275 * m / 9) + d + 1721029) - 0.5;
      console.log(J);
      this.setState({ currentJD1: J });
    }

  };
  submit2(e) {
    e.preventDefault();
    if (!this.state.currentJD2) {
      toast.error("Please provide a julian date value");
      this.setState({ currentDate2: " " });
    }
    else {
      var J = parseInt(this.state.currentJD2);
      var a = (J + 68569);
      var b = Math.trunc((4 * a) / 146097);
      var c = a - Math.trunc((146097 * b + 3) / 4);
      var d = Math.trunc((4000 * (c + 1)) / 1461001);
      var e = c - Math.trunc((1461 * d) / 4) + 31;
      var f = Math.trunc((80 * e) / 2447);
      var day = e - Math.trunc((2447 * f) / 80);
      var g = Math.trunc(f / 11);
      var month = f + 2 - 12 * g;
      var year = (100 * (b - 49)) + d + g;
      var date = `${day}/${month}/${year}`;
      this.setState({ currentDate2: date });
    }
  }
  sectionStatus = (e) => {
    var value = e.target.value;
    if (value == "showJDToDate") {
      this.setState({ val1: "hide", val2: "show" });
    }
    else {
      this.setState({ val1: "show", val2: "hide" });
    }
  };
  render() {
    return (
      <article id="JDConverter">
        <div id="JDhead">
          <Link to="/">
            <img className="logo" src={require('./img/logo.png')} />
          </Link>
          <h2 className="title">JULIAN DATE CONVERTER</h2>
        </div>
        <div id="JDsel">
          <select onChange={this.sectionStatus}>
            <option value="showDateToJD">Convert Calendar Date to Julian Date</option>
            <option value="showJDToDate">Convert Julian Date to Calendar Date</option>
          </select>
        </div>
        <section className={this.state.val1} id="date2JD">
          <div className="calhead">
            <h3 className="subtitle">CONVERT CALENDAR DATE TO JULIAN DATE</h3>
          </div>
          <div className="calbody">
            <form>
              <label htmlFor="date">Enter Calendar Date</label><br />
              <input type="text" id="date" name="date" defaultValue={this.state.currentDate1} onChange={this.updateDateValue} /><br />
              <p>Enter date in DD/MM/YYYY format</p>
              <button id="btn2" onClick={this.submit1}>Convert to Julian Date</button><br />
              <input type="text" id="jd" name="jd" value={this.state.currentJD1} disabled="disabled" /><br />
              <p>Julian date at 0 UT</p>
            </form>
          </div>
        </section>
        <section className={this.state.val2} id="JD2date">
          <div className="calhead">
            <h3 className="subtitle">CONVERT JULIAN DATE TO CALENDAR DATE</h3>
          </div>
          <div className="calbody">
            <form>
              <label htmlFor="date">Enter Julian Date</label><br />
              <input type="text" id="jd" name="jd" defaultValue={this.state.currentJD2} onChange={this.updateJDValue} /><br />
              <p>Enter the Julian date</p>
              <button id="btn2" onClick={this.submit2}>Convert to Julian Date</button><br />
              <input type="text" id="date" name="date" value={this.state.currentDate2} disabled="disabled" /><br />
              <p>Date at DD/MM/YYYY format</p>
            </form>
          </div>
        </section>
        <Link to="/">
          <center>
            <button id="btn3">Back</button>
          </center>
        </Link>
      </article >
    )
  }
}
export default JulianDate;