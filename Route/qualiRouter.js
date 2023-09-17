import multer from "multer";
import express from "express";
import qualiController from "../Controller/qualiController.js";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname);
    callback(null, `${Date.now()}${extname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/profile", upload.single("file"), async function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }
  console.log("Arquivo enviado com sucesso: ", req.file.filename);
  try {
    await qualiController.importacao(req, req.file.filename, next);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

export default {
  router,
  storage,
};
