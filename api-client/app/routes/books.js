const express = require("express");
const router = express.Router();
const envData = require("../app-env");
const request = require("request");

console.log(`API host is ${envData.apiHost}`);
console.log(`API port is ${envData.apiPort}`);

function doProxy(req, res, routePath, method) {
	request({method: method, uri: `http://${envData.apiHost}:${envData.apiPort}${routePath}`}, (remoteErr, remoteRes, remoteBody) => {
		if (remoteErr) {
			res.status(500).send(`Couldn't ${method} books against server ${envData.apiHost} at port ${envData.apiPort}!`);
		} else {
			res.send(remoteBody);
		}
	});
}

router.get("/books", (req, res) => {
	doProxy(req, res, "/books", "GET");
});

router.post("/books", (req, res) => {
	doProxy(req, res, "/books", "POST");
});

router.get("/books/:bookName", (req, res) => {
	doProxy(req, res, `/books/${req.params.bookName}`, "GET");
});

module.exports = router;
