const router = require("express").Router();

const { authController } = require("../controllers");
// const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// router.post("", shopController.createShop);
// router.get("", shopController.getAllShop);
router.get("", userController.findUsers);
// router.get("/:id", shopController.getShopById);
// router.patch("/:id", shopController.updateShop);
// router.delete("/:id", shopController.deleteShop);

module.exports = router;
