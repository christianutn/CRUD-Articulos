import { Model, DataTypes, InferAttributes} from "sequelize";
import BaseDatosConfig from "../config/bd";

class Usuario extends Model<InferAttributes<Usuario>> {
  declare legajo: string;
  declare nombre: string;
  declare rol: string;
  declare contrasena: string;
}

Usuario.init(
  {
    legajo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize: BaseDatosConfig.obtenerInstancia(),
    modelName: "usuario",
    timestamps: false,
  }
);

export default Usuario;