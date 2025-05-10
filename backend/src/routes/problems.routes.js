import express, { Router } from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware";
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  getSolvedProblems,
} from "../controllers/problem.controller";

const problemRoutes = express.Router();
problemRoutes.post(
  "/create-problem",
  authMiddleware,
  checkAdmin,
  createProblem
);
problemRoutes.get("/get-problems", authMiddleware, checkAdmin, getAllProblems);
problemRoutes.get(
  "/get-problem/:id",
  authMiddleware,
  checkAdmin,
  getProblemById
);
problemRoutes.put(
  "/update-problem/:id",
  authMiddleware,
  checkAdmin,
  updateProblem
);
problemRoutes.delete(
  "/delete-problem",
  authMiddleware,
  checkAdmin,
  deleteProblem
);

problemRoutes.get(
  "/get-solved-problems",
  authMiddleware,
  checkAdmin,
  getSolvedProblems
);

export default problemRoutes;
