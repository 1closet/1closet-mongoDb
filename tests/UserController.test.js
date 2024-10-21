const request = require('supertest');
const app = require('../src/app'); 
const UserMongooseModel = require('../src/domain/models/User');


jest.mock('../src/domain/models/User');

describe('UserController', () => {
  const mockUserData = {
    manychatId: '123456789',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '1234567890',
    tom: 'claro',
    subtom: 'frio',
    contraste: 'alto',
    temperatura: 'fria',
    intensidade: 'alta',
    profundidade: 'média',
    estacao: 'Inverno',
    coresFavoritas: ['azul', 'cinza'],
    dossieCompleto: 'https://linkparadocumento.com/dossie.pdf',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar um usuário como PDF', async () => {
    UserMongooseModel.findOne = jest.fn().mockResolvedValue(mockUserData);

    const response = await request(app).get('/users/123456789/pdf');

    expect(UserMongooseModel.findOne).toHaveBeenCalledWith({ manychatId: '123456789' });
    expect(response.statusCode).toBe(200);  
    expect(response.header['content-type']).toBe('application/pdf');  
  });
});
