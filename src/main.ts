import app from "./app/app.js";
import { dbConnections, port } from "./config/config.js";

export const bootstrap = async () => {
  return Promise.all([
    dbConnections.sequelizeConnection.getInstance().init(),
  ]).then(() => {
    return app.listen(port, () => {
      console.log("Running on " + port + " port");
    });
  });
};

bootstrap();
