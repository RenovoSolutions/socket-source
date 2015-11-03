var rabbit = require('amqp');
var getExchange = require('./exchange');
var Rx = require('rx');

var config = require('./rabbit.json');
exports.config = config;
exports.connect = function() {
	var exchangeStream = new Rx.Subject();

	var connection = rabbit.createConnection({ host: config.host, login: config.login, password: config.password });
	var connected = Rx.Observable.fromEvent(connection, 'ready');
	connected.subscribe(function() {
		console.log('- connected to rabbit -');

		getExchange(connection).subscribe(function(exchange) {
			exchangeStream.onNext(exchange);
		}, function() {
			exchangeStream.onError('- failed to configure exchange -');
		});
	}, function() {
		exchangeStream.onError('- failed to connect to rabbit -');
	});

	return exchangeStream;
};
