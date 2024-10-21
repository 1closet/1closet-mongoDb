class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;  
    }
  

    async createUser(userData) {
      return await this.userRepository.createUser(userData);
    }
  

    async getUserById(userId) {
      return await this.userRepository.findUserById(userId);
    }

    async listUsers() {
        return await this.userRepository.listUsers();
      }
  }
  
  module.exports = UserService;
  