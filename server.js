// DEPENDENCIES
const express = require("express");
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const apiRoutes= require('./routes/api-routes')

//DATA

//APP/PORT
const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //what does this mean 
app.use(express.static("public"));

//ROUTES

//homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use("/api", apiRoutes);

// wildcard 404 route
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

// START THE SERVER
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


//to do :
// api call should return all saved notes  in JSON format 
//post api notes should recevie a new note to save on the request body, add to db.json, return new note to client
    //give each note a unique ID (with an npm package)