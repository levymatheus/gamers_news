'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', { // método  usado para aplicar as alterações no banco de dados. aqui ele está criando uma nova tabela chamada ‘categories’ com as propriedades abaixo.
      id: {
        allowNull: false, // Campos obrigatórios 
        autoIncrement: true, // Gerar o ID automaticamente a cada registro criado
        primaryKey: true, // o ID vai ser a chave primária no banco de dados
        type: Sequelize.DataTypes.INTEGER // O tipo do dado: Inteiro
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      position: { // Ordenar as categorias em uma ordem: posição, basicamente deixar alguma cateogoria em destaque. 
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      created_at: { // Datas em que foi criado o registro da categoria
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: { // Data em que foi atualizado pela ultima vez
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories') // reverte o que foi feito, usado para reverter as alterações feitas pelo método up
  }
};
