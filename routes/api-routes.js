const router = require('express').Router();//pulling only the router functionality from express 
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


//ROUTES
//api routes
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    const saveNotes = fs.readFileSync(path.join(__dirname, '../db/db.json'))
    res.json(JSON.parse(saveNotes))
    
  });
//posts the new notes in array in db 
  router.post('/notes', (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
    saveNotes.push({...req.body, id: uuidv4()})
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(saveNotes))
    res.json({message: "You've saved a note!"})
  }
  );
//deletes the notes from the array in db
  router.delete('/notes/:id', (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
    const updatedNotes = saveNotes.filter(note => note.id !== req.params.id )
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes))
    res.json({message: "You've deleted a note..."})

  })

  module.exports = router

