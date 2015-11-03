var rabbit = require('./rabbit');
var messageParser = require('./parser');
var logger = require('node-queue-logger');

var rabbitConfig = rabbit.config;
logger.configure({
	host: rabbitConfig.host,
	login: rabbitConfig.login,
	password: rabbitConfig.password,
	exchange: 'LOG',
});

var message = messageParser.load();

var defaultRoute = '';

var exchangeStream = rabbit.connect();
exchangeStream.subscribe(function(exchange) {
	console.log('- publishing message -');
	logger.info(message);
	exchange.publish(defaultRoute, message.body, {
		headers: {
			channel: message.channel,
		},
	});
	process.exit();
});
