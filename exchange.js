var Rx = require('rx');

var config = require('./rabbit.json');

module.exports = function(connection) {
	var exchangeStream = new Rx.Subject();

	connection.exchange(config.exchange, {
		type: 'fanout',
		durable: true,
		autoDelete: false,
	}, function(exchange) {
		console.log('- exchange created -');
		exchangeStream.onNext(exchange);
	});

	return exchangeStream;
}
