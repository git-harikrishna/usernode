const mongoose = require("mongoose");
const userSchema = require("./models/userschema");

require("dotenv").config();

const connectDB = async () => {
  try {
    const url = process.env.dbUrl;

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
  const userDummy = [
    {
      name: "dummy1",
      id: 1,
      mobileno: "9445582495",
    },
    {
      name: "dummy2",
      id: 2,
      // mobileno : "67890"
    },
    {
      name: "dummy 3",
      id: 3,
    },
  ];
  await userSchema.deleteMany({});
  await userSchema.insertMany(userDummy);
};

module.exports = connectDB;
