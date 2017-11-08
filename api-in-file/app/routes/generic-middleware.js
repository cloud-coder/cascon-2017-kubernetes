exports.timeLogger = (req, res, next) => {
	console.log('Time:', Date.now());
	next();
}

exports.logger = (req, res, next) => {
	console.log("called me! at " + req.path);
	next();
};

exports.errorLogger = (err, req, res, next) => {
	console.error("Error Happened!");
	next(err);
};

exports.error500 = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err); // which triggers Express default error handler that
								// handles a situation that response is already halfway written
	}
	console.error(err.stack);

	res.status(500).send('Something broke!');
};

exports.error404 = (req, res, next) => {
	res.status(404).send('Sorry cant find that!');
};
