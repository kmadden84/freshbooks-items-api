'use strict';
module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    //freezeTableName: true
  });
  Items.associate = function(models) {
    // associations can be defined here
  };
  return Items;
};