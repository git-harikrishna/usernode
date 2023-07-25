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

// exports.getUser = async (req, res, next) => {
//   console.log(req.user);
//   try {
//     const user = await User.find();
//     res.json(user);
//   } catch (e) {
//     res.send("Error : " + e);
//   }

  // res.send("get User is a function which returns the User Details");
// };

exports.getUserById = async (req, res, next) => {
  console.log("getUserById called");
  try {
    const name = req.user.name;
    const user = await User.findOne({name});

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
  // console.log(req.params.id);

  // if (!(req.user.id == req.params.id)) return res.json({ msg: "Unauthorized" });

  try {
    const user = await User.findOne({name : req.user.name});
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
    // user.id= 123;

    console.log(user.name);
    console.log(user);

    // req.body.name = user.name;

    const newuser = { name: req.body.name, password: req.body.password };
    
    user.save();

    res.json(user);
  } catch (e) {
    res.send("Error: " + e);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("deleteUser called");

  // if (!(req.user.id == req.params.id)) return res.json({ msg: "Unauthorized" });


  try {


    const dbuser = await User.findOne({name : req.user.name});

    const id = dbuser.id;

    const user = await User.findByIdAndRemove(id);

    if (user == null) {
      return res
        .status(400)
        .json({ message: "no user found with the given id" });
      // throw " no user found with the id";
    }

    res.send("User Deleted");
  } catch (e) {
    res.send("Error: " + e);
  }
};

// exports.login = async (req, res, next) => {
//   try {
//     const name = req.body.name;
//     const id = req.body.id;
//     const mobileno = req.body.mobileno;

//     const user = { name: name, id: id };

//     jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   } catch (e) {}

// };
