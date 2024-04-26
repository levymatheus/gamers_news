'use strict';
// seeders: "semear" servem basicamente para preencher o banco de dados com valores de teste, evitando que seja feito testes de forma manual "automatizando" o processo de por dados no banco.
// também podem ser usados para dar valores iniciais que a aplicação possa precisar para dar seus primeiros passos. 
// comando para criar um seeder para categories: npx sequelize-cli seed:generate --name seed-categories-table

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('categories', [ // Inserir em lotes passando a tabela categorias e o objeto com array e os valores.
    {name:'Ação', position: 1, created_at: new Date(), updated_at: new Date()},
    {name: 'Aventura', position: 2, created_at: new Date(), updated_at: new Date()},
    {name: 'Esportes', position: 3, created_at: new Date(), updated_at: new Date()},
    {name: 'Survival Horror', position: 4, created_at: new Date(), updated_at: new Date()},
    {name: 'FPS', position: 5, created_at: new Date(), updated_at: new Date()}
   ], {})
  },

  // Revertando o método up com o down
  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('categories', null, {})
  }
};

// comando para add seeders: npx sequelize-cli db:seed:all
// comando para desfazer seeders para todos os seeders criados: npx sequelize-cli db:seed:undo:all 