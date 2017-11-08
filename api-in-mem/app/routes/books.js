const express = require("express");
const router = express.Router();

const books = [
	{name: "book 1"},
	{name: "book 2"}
];

router.get("/books", (req, res) => {
	console.log("book type from middleware is: " + req.bookType);
	console.log("cookies ", req.cookies);
	res.send(books);
});

router.post("/books", (req, res) => {
	console.log("The book POST body: ", req.body);
	books.push(req.body);
	res.send(books);
});

router.get("/books/:bookName", (req, res) => {
	const bookName = req.params.bookName;
	let book = books.filter((b) => {
		return b.name === bookName;
	});
	if (book && book.length > 0) {
		res.send(book);
	} else {
		res.status(404).send("Can't find book by name " + bookName);
	}
});

module.exports = router;
