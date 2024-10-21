const MongoUserRepository = require('../src/adapters/out/MongoUserRepository');
const User = require('../src/domain/User');
const UserMongooseModel = require('../src/domain/models/User');

jest.mock('../src/domain/models/User');

describe('MongoUserRepository', () => {
  let repository;
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

  beforeEach(() => {
    repository = new MongoUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve criar um novo usuário', async () => {
    UserMongooseModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockUserData),
    }));

    const user = new User(...Object.values(mockUserData));
    user.id = user.manychatId;
    const createdUser = await repository.createUser(user);

    expect(createdUser).toEqual(mockUserData);  
  });

  test('deve buscar um usuário pelo manychatId', async () => {
    UserMongooseModel.findOne = jest.fn().mockResolvedValue(mockUserData);

    const foundUser = await repository.findUserById('123456789');

    const expectedUserData = { ...mockUserData, id: mockUserData.manychatId };  // Ajusta o mock para refletir 'id'
  expect(UserMongooseModel.findOne).toHaveBeenCalledWith({ manychatId: '123456789' });
  expect(foundUser).toEqual(expectedUserData);
  });
});
