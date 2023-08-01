const express = require("express");
// const { authenticateToken } = require("../middleware/authenticate");
const authFunctions = require("../controller/authenticationController");
const { authenticateToken } = require("../middleware/authenticate");

const authenticateRouter = express.Router();
authenticateRouter.post("/login", authFunctions.login);
authenticateRouter.get("/refreshToken",authFunctions.refreshToken);

module.exports = authenticateRouter;
