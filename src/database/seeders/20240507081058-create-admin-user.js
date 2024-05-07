'use strict';
const bcrypt = require('bcrypt') // como estamos no js chamamos o bcrypt pelo require

// o método abaixo cria um usuário padrão por seedeer
module.exports = {
  async up (queryInterface, Sequelize) {  
    const hashedPassword = await bcrypt.hash('123456',10) // criptografamos a senha do user padrão 
     await queryInterface.bulkInsert('users', [{
      first_name: 'Admin',
      last_name: 'User',
      phone:'0000-0000',
      birth: '1999-09-09',
      email: 'user@email.com',
      password:hashedPassword,
      role: 'admin', 
      created_at: new Date(),
      updated_at: new Date()
     }], {});

  },

  async down (queryInterface, Sequelize) {
 await queryInterface.bulkDelete('users', null, { where: {email: 'user@email.com'}})} // remove apenas o usuário padrão
};

// comando: npx sequelize-cli db:seed --seed \src\database\seeders\20240507081058-create-admin-user.js