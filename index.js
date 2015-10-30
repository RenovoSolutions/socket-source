var rabbit = require('./rabbit');
var messageParser = require('./parser');
var getExchange = require('./exchange');

var message = messageParser.load();

var defaultRoute = '';

rabbit.connect().then(function(connection) {
	getExchange(connection).then(function(exchange) {
		console.log('- publishing message -');
		exchange.publish(defaultRoute, message.body, {
			headers: {
				channel: message.channel,
			},
		});
		connection.disconnect();
		process.exit();
	});
});
