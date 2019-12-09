const express = require('express');
const router = express.Router();
const Note = require("../models/Note");

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', async (req, res) => {
    const notes = await Note.find();
    res.render('about', {notes});
});

module.exports = router;