import { db } from "../libs/db.js";
import { getJudge0LanguageId } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  // Get all data from request
  const {
    title,
    description,
    diggiculty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  if (req.user.role !== "ADMIN") {
    return response.status(403).json({
      error: "You are not allowed to create a problem",
    });
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
    }
  } catch (error) {}
};
export const getAllProblems = async () => {};
export const getProblemById = async () => {};
export const updateProblem = async () => {};
export const deleteProblem = async () => {};
export const getSolvedProblems = async () => {};
