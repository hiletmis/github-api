import express from "express";
import cors from "cors";
import { errorHandler } from "./helpers/error-handler.js";
import router from "./github/github.controller.js";

const app = express();
app.use(express.json({ limit: "1MB" }));
app.use(cors());

app.use("/", router);

app.use(errorHandler);

app.listen(3059, () => console.log(`Github API listening on port 3059!`));
