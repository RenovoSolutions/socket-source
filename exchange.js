var q = require('q');

var config = require('./rabbit.json');

module.exports = function(connection) {
	var deferred = q.defer();

	connection.exchange(config.exchange, {
		type: 'fanout',
		durable: true,
	}, function(exchange) {
		console.log('- exchange created -');
		deferred.resolve(exchange);
	});

	return deferred.promise;
}