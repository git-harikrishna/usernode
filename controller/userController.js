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
  console.log(req.user);
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

  console.log(req.user);
  console.log(req.params.id);

  try {
    const user = await User.findById(req.params.id);
    console.log(user);

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
    if (!(req.user.id == user.id)) return res.json({ msg: "Unauthorized" });
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

// exports.login = async (req, res, next) => {
//   try {
//     const name = req.body.name;
//     const id = req.body.id;
//     const mobileno = req.body.mobileno;

//     const user = { name: name, id: id };

//     jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   } catch (e) {}

// };
