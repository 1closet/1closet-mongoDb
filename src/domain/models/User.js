const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  manychatId: { type: String, required: true, unique: true },  
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  tom: { type: String },
  subtom: { type: String },
  contraste: { type: String },
  temperatura: { type: String },
  intensidade: { type: String },
  profundidade: { type: String },
  estacao: { type: String },
  coresFavoritas: [{ type: String }],
  dossieCompleto: { type: String } 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
