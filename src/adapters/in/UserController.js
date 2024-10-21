const UserService = require('../../domain/UserService');
const MongoUserRepository = require('../../adapters/out/MongoUserRepository');

const userRepository = new MongoUserRepository();
const userService = new UserService(userRepository);

class UserController {
  static async createUserAndDownloadPDF(req, res) {
    try {
      const userData = req.body;
      const result = await userService.createUser(userData);

      const { user, pdfFilePath } = result;
      const pdfUrl = `${req.protocol}://${req.get('host')}/pdfs/dossie_${user.manychatId}.pdf`;

      user.dossieCompleto = pdfUrl;
      await user.save();

      res.status(201).json({
        message: 'Usuário criado com sucesso. Baixe aqui o seu dossiê:',
        downloadLink: pdfUrl,
      });

    } catch (error) {
      console.error('Erro ao criar o usuário e gerar o PDF:', error);
      res.status(500).json({ message: 'Erro ao criar o usuário ou gerar o PDF' });
    }
  }

  static async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao buscar o usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await userService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ message: 'Erro ao listar usuários' });
    }
  }
}

module.exports = UserController;