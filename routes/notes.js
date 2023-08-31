const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/auth');

const notesController = require('../controllers/notes');


router.post('/notes/add-note',userAuthentication.authenticate,notesController.addNote);
router.get('/notes/getAll-notes',userAuthentication.authenticate,notesController.getAllNotes);
router.get('/notes/get-note/:noteid',userAuthentication.authenticate,notesController.getNote);
router.post('/notes/update-note/:noteid',userAuthentication.authenticate,notesController.updateNote);
router.delete('/notes/delete-note/:noteid',userAuthentication.authenticate,notesController.deleteNote);


module.exports = router;