import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { createUser } from "../controller/userController.js";
const router = express.Router();
router.get("/:address", catchAsync(createUser));

export default router;
