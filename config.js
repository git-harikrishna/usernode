const mongoose = require("mongoose");
const userSchema = require("./models/userschema");

require("dotenv").config();

const bcrypt = require("bcrypt");

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
      // id: 1,
      mobileno: "9445582495",
      password : "password"
    },
    {
      name: "dummy2",
      // id: 2,
      // mobileno : "67890"
      password : "password"
    },
    {
      name: "dummy 3",
      // id: 3,
      password : "password"
    },
  ];
  await userSchema.deleteMany({});

  for ( let i=0;i<userDummy.length;i++){
    let temp = userDummy[i].password;

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(temp, saltPassword);

    userDummy[i].password = securePassword;

  }

  await userSchema.insertMany(userDummy);
};

module.exports = connectDB;
