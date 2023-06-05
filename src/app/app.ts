import express from "express";

import router from "./router.js";

const app = express();

app.use(express.json());
app.use(router);
// app.use(cors())

app.use((error, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

export default app;
