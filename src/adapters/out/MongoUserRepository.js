const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const UserMongooseModel = require('../../domain/models/User');  
const User = require('../../domain/User');  

class MongoUserRepository {

  async createUser(userData) {
    const userDocument = this._toMongoDocument(userData);  
    const newUser = new UserMongooseModel(userDocument);
    const savedUser = await newUser.save();  


    const pdfFileName = `dossie_${savedUser.manychatId}.pdf`;
    const pdfFilePath = path.join(__dirname, '..', 'pdfs', pdfFileName);

    if (!fs.existsSync(path.join(__dirname, '..', 'pdfs'))) {
      fs.mkdirSync(path.join(__dirname, '..', 'pdfs'), { recursive: true });
    }

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);


    doc.text('Dossiê Completo:', { align: 'center' });
    doc.moveDown();
    doc.text(`ID: ${savedUser.manychatId}`);
    doc.text(`Nome: ${savedUser.nome}`);
    doc.text(`Email: ${savedUser.email}`);
    doc.text(`Telefone: ${savedUser.telefone}`);
    doc.text(`Tom: ${savedUser.tom}`);
    doc.text(`Subtom: ${savedUser.subtom}`);
    doc.text(`Contraste: ${savedUser.contraste}`);
    doc.text(`Temperatura: ${savedUser.temperatura}`);
    doc.text(`Intensidade: ${savedUser.intensidade}`);
    doc.text(`Profundidade: ${savedUser.profundidade}`);
    doc.text(`Estação: ${savedUser.estacao}`);
    doc.text(`Cores Favoritas: ${savedUser.coresFavoritas.join(', ')}`);
    doc.text(`Dossiê Completo: ${savedUser.dossieCompleto}`);

    doc.end();


    await new Promise((resolve) => writeStream.on('finish', resolve));

    const pdfUrl = `/pdfs/${pdfFileName}`;
    savedUser.dossieCompleto = pdfUrl;
    await savedUser.save();

    return { user: savedUser, pdfFilePath };
  }

  async findUserById(userId) {
    return await UserMongooseModel.findOne({ manychatId: userId });
  }

  _toMongoDocument(user) {
    return {
      manychatId: user.manychatId,
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      tom: user.tom,
      subtom: user.subtom,
      contraste: user.contraste,
      temperatura: user.temperatura,
      intensidade: user.intensidade,
      profundidade: user.profundidade,
      estacao: user.estacao,
      coresFavoritas: user.coresFavoritas,
      dossieCompleto: user.dossieCompleto,
    };
  }

  _fromMongoDocument(document) {
    return new User(
      document.manychatId,
      document.nome,
      document.email,
      document.telefone,
      document.tom,
      document.subtom,
      document.contraste,
      document.temperatura,
      document.intensidade,
      document.profundidade,
      document.estacao,
      document.coresFavoritas,
      document.dossieCompleto
    );
  }
  async listUsers() {
    return await UserMongooseModel.find();  
  }
}

module.exports = MongoUserRepository;
