'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Equipment.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Equipment.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Equipment',
    tableName: 'Equipments',
    underscored: true
  })
  return Equipment
}
