var express = require("express");
var router = express.Router();

router.get("/books", function (req, res) {
	res.send("Second level Books");
});

module.exports = router;