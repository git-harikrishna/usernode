const User = require("../models/userschema");

exports.addUser = async (req, res, next) => {
  console.log("addUser called");

  const user = {
    name: req.body.name,
    id: req.body.id,
    mobileno: req.body.mobileno,
  };

  try {
    if (req.body.name == null) {
      return res.status(400).json({ message: "User name can't be null" });
    }

    if (req.body.id == null) {
      return res.status(400).json({ message: "id field can't be null" });
    }

    const newuser = await new User(user);
    newuser.save();
    res.json(newuser);
  } catch (e) {
    res.send("error : " + e);
  }
};

exports.getUser = async (req, res, next) => {
  console.log("getUser called");

  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    res.send("Error : " + e);
  }

  // res.send("get User is a function which returns the User Details");
};

exports.getUserById = async (req, res, next) => {
  console.log("getUserById called");

  try {
    console.log(req.params);
    const id = req.params.id;
    const user = await User.findById(id);

    if (user == null) {
      return res.status(400).json({ message: "no user found with that id" });
      // throw " no user found with the id";
    }

    res.json(user);
  } catch (e) {
    res.send("Error: " + e);
  }
};

exports.updateUser = async (req, res, next) => {
  console.log("updateUser called");

  try {
    const user = await User.findById(req.params.id);

    if (user == null) {
      return res
        .status(400)
        .json({ message: "no user found with the given id" });
      // throw " no user found with the id";
    }

    console.log(req.body);

    user.name = req.body.name;
    user.mobileno = req.body.mobileno;
    // user.id= 123;

    console.log(user.name);
    console.log(user);

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (e) {
    res.send("Error: " + e);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("deleteUser called");

  try {
    const user = await User.findByIdAndRemove(req.params.id);

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
