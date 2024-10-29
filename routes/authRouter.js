const router = require("express").Router();

const authController = require("../controllers/authController");

// router.post("", shopController.createShop);
// router.get("", shopController.getAllShop);
router.post("/login", authController.login);
// router.get("/:id", shopController.getShopById);
// router.patch("/:id", shopController.updateShop);
// router.delete("/:id", shopController.deleteShop);

module.exports = router;
