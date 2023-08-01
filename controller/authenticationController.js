const jwt = require("jsonwebtoken");
const User = require("../models/userschema");
const bcrypt = require("bcrypt");

async function generateAccessToken(user) {
  console.log(user);
  const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });

  return accessToken;
}

async function generateRefreshToken(user){

  const refreshToken = await jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN,{
    expiresIn: "30m",
  })
  return  refreshToken ;
}

exports.login = async (req, res, next) => {
  try {
    console.log("login called");
    const loginname = req.body.name;
    const loginpassword = req.body.password;

    const dbuser = await User.findOne({ name: loginname }); // Use findOne() to get a single document
    if (!dbuser) return res.status(400).json({ msg: "No such username found" });

    bcrypt.compare(loginpassword, dbuser.password, async (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Error comparing passwords:", err });
      } else {
        if (!result) {
          return res.status(401).json({ msg: "Invalid Password" });
        } else {
          const user = { id: dbuser._id };

          const accessToken = await generateAccessToken(user);
          const refreshToken= await generateRefreshToken(user);

          res.status(200).json( { accessToken , refreshToken } );
        }
      }
    });
  } catch (e) {
    console.error("Error in login:", e);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.headers.token;

  try {
    if (
      refreshToken == null ||
      refreshToken === "" ||
      refreshToken == undefined
    ) 
    {
      res.status(401).json({msg : "refreshToken undefined"});
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_ACCESS_TOKEN,
      async (err, user) => {
        console.log(user);

        const accessToken = await generateAccessToken({
          id: user.id,
        });
        res.status(200).json({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
