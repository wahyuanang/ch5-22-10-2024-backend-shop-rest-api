const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  //   console.log(req.headers.authorization);

  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        status: "Failed",
        msg: " token is missing",
        isSuccess: false,
        data: null,
      });
    }
    const token = bearerToken.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(payload.userId);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};
