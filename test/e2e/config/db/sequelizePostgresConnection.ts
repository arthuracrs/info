import { Sequelize } from "sequelize";
import { IDbConnectionSingleton } from "../../../../src/config/db/IDbConnection";

export class SequelizePostgresConnection implements IDbConnectionSingleton {
  private static instance: SequelizePostgresConnection;
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

  public static getInstance(): SequelizePostgresConnection {
    if (!SequelizePostgresConnection.instance) {
      SequelizePostgresConnection.instance = new SequelizePostgresConnection();
    }
    return SequelizePostgresConnection.instance;
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
