var rabbit = require('./rabbit');
var messageParser = require('./parser');
var logger = require('node-queue-logger');

var rabbitConfig = rabbit.config;
logger.configure({
	host: rabbitConfig.host,
	login: rabbitConfig.login,
	password: rabbitConfig.password,
	exchange: 'log',
});

var message = messageParser.load();

var defaultRoute = '';

var exchangeStream = rabbit.connect();
exchangeStream.subscribe(function(exchange) {
	console.log('- publishing message -');
	logger.info({
		area: 'sockets',
		topic: 'populate source queue',
		message: message,
	});
	exchange.publish(defaultRoute, message.body, {
		headers: {
			channel: message.channel,
		},
	});
	process.exit();
}, function(error) {
	console.error(error);
	logger.error({
		area: 'sockets',
		topic: 'populate socket queue',
		error: error,
	});
	process.exit();
});
