const express = require("express");
const router = express.Router();

router.use("/", require("./generic-routes"));
router.use("/", require("./books"));

module.exports = router;
