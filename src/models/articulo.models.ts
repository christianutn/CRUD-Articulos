import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import BaseDatosConfig from "../config/bd";

class Articulo extends Model<InferAttributes<Articulo>, InferCreationAttributes<Articulo>> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare fechaModificacion: Date;
  declare marca: string;
  declare estadoActivacion: boolean;
}

Articulo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estadoActivacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: BaseDatosConfig.obtenerInstancia(),
    modelName: "articulo",
    timestamps: false,
  }
);

export default Articulo;