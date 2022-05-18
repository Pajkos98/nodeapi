const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./adatok.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("kapcsolat létrejött");
});

app.get("/view", function (request, response) {
  const sql = 'SELECT * FROM adatok';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/savedetails/:param', function (request, response) {
  var data = request.params.param.split(';');
  for (var item in data) {
    console.log(item);
  }
  const sql = "INSERT into adatok (nev, email, tipus, szin) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "')";
  console.log(sql);
  db.run(sql);
  console.log("Új rekord hozzáadva");
});

app.post('/update/:param', function (request, response) {
  var data = request.params.param.split(';');
  const sql = "UPDATE adatok SET nev='" + data[1] + "', email='" + data[2] + "', tipus='" + data[3] + "', szin='" + data[4] + "' WHERE id='" + data[0] + "'";
  console.log(sql);
  console.log("frissites");
  db.run(sql);
  console.log("Adatok frissítve, id: " + data[0]);

});

app.post('/deleterecord/:param', function (request, response) {
  console.log("Törlés...");
  var data =request.params.param;
  const sql = "delete from adatok where id = "+data+"";
  console.log(sql);
  db.run(sql);
  console.log("Adatok törölve, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Szerver sikeresen elindítva!");
});