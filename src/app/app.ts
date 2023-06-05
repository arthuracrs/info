import express from "express";

export class AppModule {
  private router: express.IRouter;
  public app: express.Express;

  constructor(appRouter) {
    this.router = appRouter.router;
    this.app = express();

    this.app.use(express.json());
    this.app.use(this.router);
  }
}
