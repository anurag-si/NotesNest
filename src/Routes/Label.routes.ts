const express = require("express");
import { createLabel } from "../Controllers";
import TokenUtils from "../Utilities/tokenUtils";
const labelRoutes = express.Router();

labelRoutes.post("/create", TokenUtils.verifyToken, createLabel);

export default labelRoutes;
