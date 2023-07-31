const express = require("express");
// const { authenticateToken } = require("../middleware/authenticate");
const authFunctions = require("../controller/authenticationController");
const { authenticateToken } = require("../middleware/authenticate");

const authenticateRouter = express.Router();
authenticateRouter.post("/", authFunctions.login);
authenticateRouter.get("/refreshToken",authenticateToken,authFunctions.refreshToken);

module.exports = authenticateRouter;
