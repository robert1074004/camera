'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Record.init({
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    equipmentName: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  })
  return Record
}
