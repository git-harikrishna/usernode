const User = require("../models/userschema");

const authenticationController = require("./authenticationController");

const bcrypt = require("bcrypt");
const { login } = require("./authenticationController");

exports.addUser = async (req, res, next) => {
  console.log("addUser called");

  const temp = req.body.password;
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(temp, saltPassword);

  const user = {
    name: req.body.name,
    mobileno: req.body.mobileno,
    password: securePassword
  };

  try {
    if (req.body.name == null) {
      return res.status(400).json({ message: "User name can't be null" });
    }

    const dbuser = await User.findOne({ name: req.body.name });
    if (dbuser != null) {
      return res.status(400).json({ message: "User name already exists. Please choose a different user name." });
    }

    const newuser = await new User(user);
    await newuser.save();
    res.status(200).json(newuser);
  } catch (e) {
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
};

exports.getUserById = async (req, res, next) => {
  console.log("getUserById called");
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (user == null) {
      return res.status(400).json({ message: "no user found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
};


exports.updateUser = async (req, res, next) => {
  console.log("updateUser called");

  console.log(req.user);
  
  const id = req.user.id;

  try {
    const user = await User.findById(id);
    console.log(user);

    if (user == null) {
      return res
        .status(400)
        .json({ message: "no user found" });
      // throw " no user found with the id";
    }

    console.log(req.body);

    user.name = req.body.name;
    user.mobileno = req.body.mobileno;

    console.log(user.name);
    console.log(user);
    
    user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(404).send("Error: " + e);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("deleteUser called");

  try {

    const user = await User.findByIdAndRemove(req.user.id);

    if (user == null) {
      return res
        .status(400)
        .json({ message: "no user found with the given id" });
      // throw " no user found with the id";
    }

    res.status(200).send("User Deleted");
  } catch (e) {
    res.status(404).send("Error: " + e);
  }
};

