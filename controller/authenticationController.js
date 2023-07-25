const jwt = require("jsonwebtoken");
const User = require("../models/userschema");
const bcrypt = require("bcrypt");

exports.services = async (user) => {
  console.log(user);
  const accessToken = await generateAccesstoken(user);
  const refreshToken = await jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN);
  return { accessToken: accessToken, refreshToken: refreshToken };
};

async function generateAccesstoken(user) {
  console.log(user);
  return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
}

exports.login = async (req, res, next) => {
  try {
    console.log("login called");
    const name = req.body.name;
    const password = req.body.password;

    const dbuser = await User.findOne({ name }); // Use findOne() to get a single document
    if (!dbuser) return res.status(400).json({ msg: "No such username found" });

    bcrypt.compare(password, dbuser.password, async (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Error comparing passwords:", err });
      } else {
        if (!result) {
          return res.status(401).json({ msg: "Invalid Password" });
        } else {
          const user = { id : dbuser._id };
          res.status(200).json(await this.services(user));
          console.log(await this.services(user));
        }
      }
    });
  } catch (e) {
    console.error("Error in login:", e);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN,async (err, user) => {
    if (err) res.send(err);

    console.log(user);

    const accessToken = await generateAccesstoken({
      name: user.name,
      password: user.password,
    });

    res.status(200).json({ accessToken: accessToken });
  });
};
