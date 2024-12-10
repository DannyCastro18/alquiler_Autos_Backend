'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alquiler', { // Nombre de la tabla en singular
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaInicio: {
        type: Sequelize.DATE
      },
      fechaFin: {
        type: Sequelize.DATE
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes', // debe coincidir con el nombre de la tabla de clientes
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      autoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'autos', // debe coincidir con el nombre de la tabla de autos
          key: 'id'
        },
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alquiler'); // Nombre en singular, debe coincidir
  }
};
