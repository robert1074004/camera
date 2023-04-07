'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Records', 'deadline', {
      type: Sequelize.Sequelize.DATEONLY
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Records', 'deadline', {
      type: Sequelize.Sequelize.DATEONLY
    })
  }
}
