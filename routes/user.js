const express = require("express");
const userFunctions = require("../controller/userController");
const { authenticateToken } = require("../middleware/authenticate");

const userRouter = express.Router();

userRouter.post("/", userFunctions.addUser);
// userRouter.get("/", authenticateToken, userFunctions.getUser);
userRouter.get("/", authenticateToken,userFunctions.getUserById); // Updated route definition
userRouter.put("/", authenticateToken, userFunctions.updateUser);
userRouter.delete("/",authenticateToken, userFunctions.deleteUser);

module.exports = userRouter;
