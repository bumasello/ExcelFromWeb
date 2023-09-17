import qualiService from "../Service/qualiService.js";
import fs from "fs-extra";

async function importacao(req, filename, next, err) {
  try {
    console.log("Controller", filename);
    await qualiService.importacao(filename);
    console.log("Importado");
  } catch {
    next(err);
  }
}

export default {
  importacao,
};
