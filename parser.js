var commandLineArgs = require('command-line-args');

var args = commandLineArgs([
	{ name: 'channel', alias: 'c' },
	{ name: 'message', alias: 'm' },
]);

exports.load = function() {
	var options = args.parse();
	return {
		channel: options.channel,
		body: options.message,
	};
};
