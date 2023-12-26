const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: Number, required: true },
});

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {
    constructor(){
        
    }
}

module.exports = Home;
