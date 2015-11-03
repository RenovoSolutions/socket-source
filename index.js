var rabbit = require('./rabbit');
var messageParser = require('./parser');

var message = messageParser.load();

var defaultRoute = '';

var exchangeStream = rabbit.connect();
exchangeStream.subscribe(function(exchange) {
	console.log('- publishing message -');
	exchange.publish(defaultRoute, message.body, {
		headers: {
			channel: message.channel,
		},
	});
	process.exit();
});
