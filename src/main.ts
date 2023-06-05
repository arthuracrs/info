import { port } from "./config/config.js";

import { AppModule } from "./app/app.js";
import { AppRouter } from "./app/router.js";
import { CarModule } from "./modules/car/index.js";

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

bootstrap();
