import express from "express";
import routes from "./routes.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {
  constructor() {
    this.server = express();

    mongoose.connect("AQUI A CONEXÃO DO SEU BANCO DE DADOS MONGODB");

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());

    this.server.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
