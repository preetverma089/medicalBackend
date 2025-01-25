import { getUsers, Register } from "../controllers/userController.js";
import express from "express";
import cors from "cors";
const router = express.Router();

router.get("/getUser", cors(), getUsers);
router.post("/register", cors(), Register);

export default router;
