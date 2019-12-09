const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  fecha_inicio: {
    type: String,
    required: false
  },
  fecha_fin: {
    type: String,
    required: false
  },
  hora_inicio: {
    type: String,
    required: false
  },
  hora_fin: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  objetivo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);
