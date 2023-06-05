import { Sequelize } from "sequelize";
import { IDbConnectionSingleton } from "./IDbConnection";

export class SequelizeConnection implements IDbConnectionSingleton {
  private static instance: SequelizeConnection;
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      "mydb",
      "root",
      "changeme",
      {
        host: "localhost",
        dialect: "postgres",
        logging: false,
      },
    );
  }

  public static getInstance(): SequelizeConnection {
    if (!SequelizeConnection.instance) {
      SequelizeConnection.instance = new SequelizeConnection();
    }
    return SequelizeConnection.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  public async init(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      console.log("Database connection initialized and models synchronized.");
    } catch (error) {
      console.error("Error initializing database connection:", error);
      throw error;
    }
  }
}
