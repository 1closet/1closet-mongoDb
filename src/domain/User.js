class User {
    constructor(id, nome, email, telefone, tom, subtom, contraste, temperatura, intensidade, profundidade, estacao, coresFavoritas, dossieCompleto) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
      this.tom = tom;
      this.subtom = subtom;
      this.contraste = contraste;
      this.temperatura = temperatura;
      this.intensidade = intensidade;
      this.profundidade = profundidade;
      this.estacao = estacao;
      this.coresFavoritas = coresFavoritas;
      this.dossieCompleto = dossieCompleto;
    }
  }
  
  module.exports = User;
  