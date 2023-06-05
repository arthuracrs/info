import { SequelizeConnection } from "./db/sequelizeConnection";

export const port = 3000;

export const dbConnections = {
  sequelizeConnection: SequelizeConnection,
};
