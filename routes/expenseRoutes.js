import express from "express";
import { getExpensesAndPrice } from "../controller/expensesController.js";
const router = express.Router();

router.route("/").get(getExpensesAndPrice);
export default router;
