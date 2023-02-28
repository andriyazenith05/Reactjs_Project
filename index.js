const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "zenith",
  database: "astrocalc",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/get/admin", (req, res) => {
  const sqlGet = "SELECT * FROM admin";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/star", (req, res) => {
  const sqlGet = "SELECT * FROM star_details";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/latitude", (req, res) => {
  const sqlGet = "SELECT * FROM indianstates_latitude";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/observatory-latitude", (req, res) => {
  const sqlGet = "SELECT * FROM indianobservatory_latitude";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});
app.put("/api/putpassword/:adminID", (req, res) => {
  const { adminID } = req.params;
  const { newPassword } = req.body;
  const sqlUpdate = "UPDATE admin SET password = ? WHERE admin_id = ?";
  db.query(sqlUpdate, [newPassword, adminID], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.post("/api/post/admin", (req, res) => {
  const { admin_id, username, password, fav_physicist, fav_star } = req.body;
  const sqlInsert = "INSERT INTO admin (admin_id, username, password, fav_physicist, fav_star) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsert, [admin_id, username, password, fav_physicist, fav_star], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.post("/api/post/star", (req, res) => {
  const { HD, RA, DEC, V } = req.body;
  const sqlInsert = "INSERT INTO star_details (HD, Right_Ascension, Declination, Magnitude) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [HD, RA, DEC, V], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.post("/api/post/state", (req, res) => {
  const { stateName, latitude } = req.body;
  const sqlInsert = "INSERT INTO indianstates_latitude (states, latitude) VALUES (?, ?)";
  db.query(sqlInsert, [stateName, latitude], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.post("/api/post/observatory", (req, res) => {
  const { Obser_name, Obser_latitude, altitude } = req.body;
  const sqlInsert = "INSERT INTO indianobservatory_latitude (observatory_name, observatory_latitude, altitude) VALUES (?, ?, ?)";
  db.query(sqlInsert, [Obser_name, Obser_latitude, altitude], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/remove/admin/:admin_id", (req, res) => {
  const { admin_id } = req.params;
  const sqlRemove = "DELETE FROM admin WHERE admin_id=?";
  db.query(sqlRemove, admin_id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/remove/star/:star_id", (req, res) => {
  const { star_id } = req.params;
  const sqlRemove = "DELETE FROM star_details WHERE star_id=?";
  db.query(sqlRemove, star_id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/remove/state/:state_id", (req, res) => {
  const { state_id } = req.params;
  const sqlRemove = "DELETE FROM indianstates_latitude WHERE state_id=?";
  db.query(sqlRemove, state_id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/remove/observatory/:observatory_id", (req, res) => {
  const { observatory_id } = req.params;
  const sqlRemove = "DELETE FROM indianobservatory_latitude WHERE observatory_id=?";
  db.query(sqlRemove, observatory_id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.get("/api/get/admin/:admin_id", (req, res) => {
  const { admin_id } = req.params;
  const sqlGet = "SELECT * FROM admin WHERE admin_id=?";
  db.query(sqlGet, admin_id, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/star/:star_id", (req, res) => {
  const { star_id } = req.params;
  const sqlGet = "SELECT * FROM star_details WHERE star_id = ?";
  db.query(sqlGet, star_id, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/latitude/:state_id", (req, res) => {
  const { state_id } = req.params;
  const sqlGet = "SELECT * FROM indianstates_latitude WHERE state_id = ?";
  db.query(sqlGet, state_id, (error, result) => {
    res.send(result);
  });
});
app.get("/api/get/obserlatitude/:observatory_id", (req, res) => {
  const { observatory_id } = req.params;
  const sqlGet = "SELECT * FROM indianobservatory_latitude WHERE observatory_id = ?";
  db.query(sqlGet, observatory_id, (error, result) => {
    res.send(result);
  });
});
app.put("/api/update/admin/:adminId", (req, res) => {
  const { adminId } = req.params;
  const { username, password, fav_physicist, fav_star } = req.body;
  const sqlUpdate = "UPDATE admin SET username=?, password=?, fav_physicist=?, fav_star=? WHERE admin_id=?";
  db.query(sqlUpdate, [username, password, fav_physicist, fav_star, adminId], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.put("/api/update/star/:starId", (req, res) => {
  const { starId } = req.params;
  const { HD, RA, DEC, V } = req.body;
  const sqlUpdate = "UPDATE star_details SET HD=?, Right_Ascension=?, Declination=?, Magnitude=? WHERE star_id=?";
  db.query(sqlUpdate, [HD, RA, DEC, V, starId], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.put("/api/update/state-latitude/:stateId", (req, res) => {
  const { stateId } = req.params;
  const { stateName, latitude } = req.body;
  const sqlUpdate = "UPDATE indianstates_latitude SET states=?, latitude=?  WHERE state_id=?";
  db.query(sqlUpdate, [stateName, latitude, stateId], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.put("/api/update/obser-latitude/:obserId", (req, res) => {
  const { obserId } = req.params;
  const { Obser_name, Obser_latitude, altitude } = req.body;
  const sqlUpdate = "UPDATE indianobservatory_latitude SET observatory_name=?, observatory_latitude=?, altitude=?  WHERE observatory_id=?";
  db.query(sqlUpdate, [Obser_name, Obser_latitude, altitude, obserId], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});
app.listen(3001, () => {
  console.log("running on port 3001");
});
