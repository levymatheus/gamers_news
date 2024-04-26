'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query('SELECT id FROM categories') // Usamos essa atribuição SQL para selecionar as chaves estrangeiras de categories e passar na atribuição dos jogos abaixo.
    await queryInterface.bulkInsert('games', [
      { name: 'God Of War 2018', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'God of War Ragnarök', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[0].id, created_at: new Date(), updated_at: new Date() }, // Setamos em qual categorias queremos por o curso
      { name: 'EA Sports FC 24', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Resident Evil 4 Remake', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'League Of Legends', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Dota 2', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Counter-Strike: Global Offensive', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Battlefield 2048', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Call of Duty: Warzone', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Grand Theft Auto V', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Valorant', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Grand Theft Auto VI', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[3].id, created_at: new Date(), updated_at: new Date() },
      { name: 'eFootball 2024', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Fortinite', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
    ])
  },

  async down(queryInterface, Sequelize)  { 
      await queryInterface.bulkDelete('games', null, {});
  }
};

// Podemos executar apenas um seed: npx sequelize-cli db:seed --seed \src\database\seeders\20240426071540-seed-games-table.js   
// Todos de uma vez: npx sequelize-cli db:seed:all 
// Remover todos de uma vez: npx sequelize-cli db:seed:undo:all