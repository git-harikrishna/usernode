const express = require("express");
const userFunctions = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/user", userFunctions.addUser);
userRouter.get("/user", userFunctions.getUser);
userRouter.get("/user/:id", userFunctions.getUserById); // Updated route definition
userRouter.put("/user/:id", userFunctions.updateUser);
userRouter.delete("/user/:id", userFunctions.deleteUser);

module.exports = userRouter;
