import express from "express";
import path from "path";
import cors from "cors";

export class AppModule {
  private router: express.IRouter;
  public app: express.Express;

  constructor(appRouter) {
    this.router = appRouter.router;
    this.app = express();
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(this.router);

    this.app.use(
      "/swagger",
      express.static(path.join(__dirname, "../../../swagger")),
    );
  }
}
