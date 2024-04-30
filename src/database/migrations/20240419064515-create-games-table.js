'use strict';
// Temos o model em que será criada a tabela de games e suas colunas.
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
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
      synopsis: { // Aqui temos a sinopse contendo algumas informações do jogo como data de lançamento, criadores, e um breve resumo do jogo.
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      thumbnail_url: { // Aqui iremos colocar a capa do game que iremos criar na nossa tabela.
        type: Sequelize.DataTypes.STRING
      },
      featured: { // aqui basicamente iremos usar para dizer se o jogo é um lançamento ou não e vai servir para destaques futuramente
        defaultValue: false,
        type: Sequelize.DataTypes.BOOLEAN
      },
      category_id: { // Chave estrangeira: referencia outra tabela, no caso a tabela de categorias
        allowNull: false, // obrigatório, todo jogo precisa de uma categoria
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'categories', key: 'id' }, // referenciamos no objeto o model categories e a chave id da categoria que queremos
        onUpdate: 'CASCADE', // se tiver uma mudança de registros na tabela categorias, elas reflitam na tabela de games
        onDelete: 'RESTRICT' // Se for tentar excluir uma tabela que algum game dependa dela, não será possivel
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games')
  }
};
