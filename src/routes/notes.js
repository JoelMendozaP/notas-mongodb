const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require('../helpers/auth');

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});

//nuevo evento
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  const { title,fecha_inicio, fecha_fin, hora_inicio, hora_fin, description, objetivo } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Porfavor introduce un nombre al evento." });
  }
  if (!description) {
    errors.push({ text: "Porfavor introduce una descripcion al evento." });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      fecha_inicio, 
      fecha_fin, 
      hora_inicio, 
      hora_fin, 
      description, 
      objetivo
    });
  } else {
    const newNote = new Note({ title, fecha_inicio, fecha_fin, hora_inicio, hora_fin, description, objetivo });
    //este linea permite enlazar la nota con usuario
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Evento agregado Satisfactoriamente');
    res.redirect("/notes");
  }
});
//aqui se muestran las notas que tenemos

//Todas los eventos
router.get("/notes", isAuthenticated, async (req, res) => {
  //const notes = await Note.find().sort({ date: "desc" });
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render("notes/all-notes", { notes });
});

//Button Editar
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-note", { note });
});

//Editar
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, fecha_inicio, fecha_fin, hora_inicio, hora_fin, description, objetivo } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, fecha_inicio, fecha_fin, hora_inicio, hora_fin, description, objetivo });
  req.flash('success_msg', 'Evento actualizado Satisfactoriamente');
  res.redirect("/notes");
});

//Eliminar
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Evento eliminado Satisfactoriamente");
  res.redirect("/notes");
});

module.exports = router;
