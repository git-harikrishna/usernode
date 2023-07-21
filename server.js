const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const methodLogger = require("./middleware/logger");
const connectDB = require("./config");

const jwt = require("jsonwebtoken");
const authenticateRouter = require("./routes/authenticationRoute");

app.use(express.json());
app.use(methodLogger);
app.use("/login", authenticateRouter); // Use authenticateRouter for login route
app.use("/user", userRouter);

const port = 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});
