const express = require("express");
const router = express.Router();

router.get("/fakeError", (req, res) => {
	throw new Error("Fake Error");
});
router.get("/", (req, res) => {
	res.send("Hello world!!");
});

module.exports = router;
