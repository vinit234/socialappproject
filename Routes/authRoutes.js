import express from "express"
import { registerUser } from "../Controllers/authControllers.js";
const router = express.Router();
router.post("/",registerUser);
export default router;
