import { Sequelize } from "sequelize";


// Crear base de datos que solo dure en memoria para hacer pruebas
class BaseDatosConfig {
  private static _instancia: Sequelize | null;

  private constructor() {}

  public static obtenerInstancia (): Sequelize {
    if (!BaseDatosConfig._instancia) {
      BaseDatosConfig._instancia = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:', // Base de datos en memoria
        logging: false, // Desactivar logs de SQL
      });
    }
    return BaseDatosConfig._instancia;
  }

  public static async cerrarConexion(): Promise<void> {
    if (BaseDatosConfig._instancia) {
      await BaseDatosConfig._instancia.close();
      BaseDatosConfig._instancia = null;
    }
  }

  public static autenticar(): Promise<void> {
    if (!BaseDatosConfig._instancia) {
      throw new Error("La instancia de la base de datos no ha sido creada.");
    }
    return BaseDatosConfig._instancia.authenticate();
  }
}

export default BaseDatosConfig;