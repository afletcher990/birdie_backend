import * as express from "express";
import {pingController} from "./controllers/ping";
import {visitApi} from "./controllers/visitApi";

const app = express();

app.use(pingController);
app.use(visitApi);

export default app;
