const express = require("express");
// const { authenticateToken } = require("../middleware/authenticate");
const authFunctions = require("../controller/authenticationController");

const authenticateRouter = express.Router();
authenticateRouter.post("/", authFunctions.login);
authenticateRouter.get("/",authFunctions.refreshToken);

module.exports = authenticateRouter;
