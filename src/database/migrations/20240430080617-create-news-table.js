'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('news', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true, 
      type: Sequelize.DataTypes.INTEGER
    }, 
    name: {
      allowNull: false, 
      type: Sequelize.DataTypes.STRING
    }, 
    text_news: {
      allowNull: false,
      type: Sequelize.DataTypes.TEXT
    },
    order: { // podemos definir uma ordem para mostrar um determinado item
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER
    },
    video_url: {
      type: Sequelize.DataTypes.STRING // Não será salvo no bd, mas sim em um servidor externo local ou na nuvem. 
    },
    image_url: {
      type: Sequelize.DataTypes.STRING // Não será salvo no bd, mas sim em um servidor externo local ou na nuvem. 
    },
    seconds_long: {
      type: Sequelize.DataTypes.INTEGER
    }, 
    game_id: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      references: {model: 'games', key: 'id'}, // temos os itens em uma outra tabela pasando a chave id.
      onUpdate:'CASCADE', // não podemos excluir um game se tiver noticias nele.
      onDelete: 'RESTRICT'
    }, 
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('news')
  }
};
