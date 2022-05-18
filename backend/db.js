const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

fs.open('adatok.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Mentve!');
});

const db = new sqlite3.Database("./adatok.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("kapcsolat létrejött");
  });
  
db.run('CREATE TABLE adatok(id INTEGER PRIMARY KEY AUTOINCREMENT, nev TEXT NOT NULL, email TEXT NOT NULL, tipus TEXT NOT NULL, szin TEXT NOT NULL)');

