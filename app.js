const express = require('express');
const bodyParser = require('body-parser'); //read body of http request/response
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
  res.header("Content-Type",'application/json');
  res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.post('/api/notes', (req, res) => {
  // read request body
  let note = req.body;
// add respond body to db.json and make unique ID
  note.id = uuidv4();

  let data = fs.readFileSync("./db/db.json");
  let myObject = JSON.parse(data);
  myObject.push(note);
  console.log(myObject);
  //fs.writeFileSync('db.json',data);
  fs.writeFileSync("./db/db.json", JSON.stringify(myObject, null, 2));

  // send note back to client 
})

// all scenerio - stays at bottom b/c how js read
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})