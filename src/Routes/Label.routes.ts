const express = require("express");
import {
  createLabel,
  deleteLabel,
  getLabels,
  updateLabel,
} from "../Controllers";
import TokenUtils from "../Utilities/tokenUtils";
const labelRoutes = express.Router();

labelRoutes.post("/create", TokenUtils.verifyToken, createLabel);
labelRoutes.get("/fetch", TokenUtils.verifyToken, getLabels);
labelRoutes.put("/update/:id", TokenUtils.verifyToken, updateLabel);
labelRoutes.delete("/delete/:id", TokenUtils.verifyToken, deleteLabel);

export default labelRoutes;
