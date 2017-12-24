const fs = require("fs");
const express = require("express");
const router = express.Router();
const envData = require("../app-env");

console.log(`Storage path is ${envData.storagePath}`);

function initStorage() {
	let books = [
		{name: "book1"},
		{name: "book2"}
	];
	if (!fs.existsSync(envData.storagePath)) {
		fs.writeFile(envData.storagePath, JSON.stringify(books), (err) => {
			if (err) console.error("Couldn't initialize to books storage!");
		})
	} else {
		fs.readFile(envData.storagePath, (err, data) => {
			if (data && data.length === 0) {
				fs.writeFile(envData.storagePath, JSON.stringify(books), (err) => {
					if (err) console.error("Couldn't initialize to books storage!");
				})
			}
		});
	}
}

function readBooks() {
	return new Promise((resolve, reject) => {
		fs.readFile(envData.storagePath, (err, data) => {
			if (err) {
				reject("Couldn't read books data!");
			} else {
				let books = [];
				if (data && data.length === 0) {
					books = [];
				} else {
					books = JSON.parse(data.toString());
				}
				console.log(books);
				resolve(books);
			}
		});
	});
}

function storeBook(book) {
	readBooks().then((books) => {
		books.push(book);
		fs.writeFile(envData.storagePath, JSON.stringify(books), (err) => {
			if (err) console.error("Couldn't write to books storage!");
		});
	}, (err) => {
		if (err) console.error("Couldn't read books from storage!");
	});
}

initStorage();

router.get("/books", (req, res) => {
	readBooks().then((books) => {
		res.send(books);
	}, (err) => {
		res.status(500).send("Couldn't read books data!");
	});
});

router.post("/books", (req, res) => {
	let book = req.body;
	console.log("The book POST body: ", book);
	readBooks().then((books) => {
		storeBook(book);
		books.push(book);
		res.send(books);
	}, (err) => {
		res.status(500).send("Error writing books");
	});
});

router.get("/books/:bookName", (req, res) => {
	const bookName = req.params.bookName;
	readBooks().then((books) => {
		let book = books.filter((b) => {
			return b.name === bookName;
		});
		if (book && book.length > 0) {
			res.send(book);
		} else {
			res.status(404).send("Can't find book by name " + bookName);
		}
	}, (err) => {
		res.status(500).send("Error reading books");
	});
});

module.exports = router;
