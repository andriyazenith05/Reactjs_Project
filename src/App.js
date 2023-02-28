import "./App.css";
import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import JulianDate from "./pages/JulianDate";
import Login from "./pages/Login";
import SiderealTime from "./pages/SiderealTime";
import RS_Stars from "./pages/RS_Stars";
import SkyMap from "./pages/SkyMap";
import ChangePassword from "./pages/ChangePassword";
import Admin_AddEdit from "./pages/Admin_AddEdit";
import ViewAdmin from "./pages/ViewAdmin";
import Star_AddEdit from "./pages/Star_AddEdit";
import ViewStar from "./pages/ViewStar";
import State_AddEdit from "./pages/State_AddEdit";
import Obser_AddEdit from "./pages/Obser_AddEdit";
import ViewObservatory from "./pages/ViewObservatory";
import UserGuide from "./pages/UserGuide";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/juliandate" element={<JulianDate />} />
        <Route path="/rise&set-of-stars" element={<RS_Stars />} />
        <Route path="/skymap" element={<SkyMap />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/add-admin-profile" element={<Admin_AddEdit />} />
        <Route path="/add-star" element={<Star_AddEdit />} />
        <Route path="/add-state" element={<State_AddEdit />} />
        <Route path="/add-observatory" element={<Obser_AddEdit />} />
        <Route path="/update-admin-profile/:adminId" element={<Admin_AddEdit />} />
        <Route path="/update-star/:starId" element={<Star_AddEdit />} />
        <Route path="/update-latitude/:stateId" element={<State_AddEdit />} />
        <Route path="/update-obserlatitude/:obserId" element={<Obser_AddEdit />} />
        <Route path="/view-admin-profile/:adminId" element={<ViewAdmin />} />
        <Route path="/view-star/:starId" element={<ViewStar />} />
        <Route path="/view-obserlatitude/:obserId" element={<ViewObservatory />} />
        <Route path="/user-guide" element={<UserGuide />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;
