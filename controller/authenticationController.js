const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    console.log("login called");
    const name = req.body.name;
    const id = req.body.id;
    // const mobileno = req.body.mobileno;

    const user = { name: name, id: id };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({ accessToken });
  } catch (e) {
    console.error("Error in login:", e);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
