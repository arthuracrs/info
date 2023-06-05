import { DataTypes } from "sequelize";
import { dbConnections } from "../../../../config/config";

export const CarSequelizeModel = dbConnections.sequelizeConnection.getInstance()
  .getSequelize().define("Car", {
    carId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chassi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
