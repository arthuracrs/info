import app from "../../src/app/app";
import { dbConnections, port } from "./config/config";

export const bootstrap = async () => {
  try {
    return Promise.all([
      dbConnections.sequelizeConnection.getInstance().init(),
    ]).then(() => {
      return app.listen(port, () => {
        console.log("Running on " + port + " port");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
