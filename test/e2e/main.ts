import { AppModule } from "../../src/app/app.js";
import { AppRouter } from "../../src/app/router.js";
import { CarModule } from "../../src/modules/car/index.js";
import { port } from "./config/config.js";

export const bootstrap = async () => {
  return Promise.all([]).then(() => {
    const carModule = new CarModule();
    const appRouter = new AppRouter(carModule);
    const appModule = new AppModule(appRouter);

    return appModule.app.listen(port, () => {
      console.log("Running on " + port + " port");
    });
  });
};
