const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const methodLogger = require("./logger/logger");
const connectDB = require("./config");

app.use(express.json());
app.use(methodLogger);
app.use("/", userRouter);

const port = 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});
