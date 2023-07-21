const express = require("express");
const userFunctions = require("../controller/userController");
const { authenticateToken } = require("../middleware/authenticate");

const userRouter = express.Router();

userRouter.post("/", userFunctions.addUser);
userRouter.get("/", authenticateToken, userFunctions.getUser);
userRouter.get("/:id", authenticateToken,userFunctions.getUserById); // Updated route definition
userRouter.put("/:id", authenticateToken, userFunctions.updateUser);
userRouter.delete("/:id",authenticateToken, userFunctions.deleteUser);

module.exports = userRouter;
