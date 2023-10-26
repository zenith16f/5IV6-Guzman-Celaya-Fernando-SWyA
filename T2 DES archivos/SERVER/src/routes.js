//* Imports
import { Router } from "express";
import { desencriptado } from "./descipher.js";

//* Const
const router = Router();

//* Routes
router.post("/descifrar", desencriptado);
//* Export
export default router;
