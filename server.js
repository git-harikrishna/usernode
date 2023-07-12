const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const router = express.Router();

const url =
  "mongodb+srv://harikrish24work:PuJznXDXengqqHNM@cluster0.bpj1clt.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const userRouter = require("./routes/user");


app.use("/", userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);
});
