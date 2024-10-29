const router = require("express").Router();

const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

router.post("", productController.createProduct);
router.get("", productController.getAllProduct);
router.get("/:id", authenticate, productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;