const { models } = require("../models");
const { Auths, Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  // console.log("masuk ?") => debugging
  try {
    const { email, password } = req.body;

    const user = await Auths.findOne({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      where: {
        email,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        messege: "User doesn't exist",
        isSusccess: false,
        data: null,
      });
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.user.name,
          email: user.email,
          role: user.user.role,
          userId: user.user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );
      res.status(200).json({
        status: "Success",
        message: "Succesfully login",
        data: {
          username: user.user.name,
          token,
        }
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "wrong password",
        isSusccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

// const login = async (req, res, next) => {
//   console.log("info");

//   try {
//     const { email, password } = req.body;

//     const user = await Auths.fineOne({
//       include: [
//         {
//           model: Users,
//           as: "user",
//         },
//       ],
//       where: {
//         email,
//       },
//     });

//     console.log(user);

//     if (user) {
//       return res.status(401).json({
//         status: "Failed",
//         message: "Email atau password salah",
//       });
//     }

//     if (!user) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "User tidak ditemukan",
//       });
//     }

//     res.status(200).json({
//       status: "Success",
//       message: "Berhasil login",
//       data: token,
//     });
//   } catch (err) {}
// };

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  authenticate,
};
