var mongoose  = require('mongoose');
var dburl = 'mongodb://localhost:27017/e2isa';

//Now to connect to DB using mongoose we will use this method

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
	console.log('mongoose has connected to DB:-'+ dburl);
});


mongoose.connection.on('disconnected',function(){
	console.log('mongoose has disconnected to DB:-'+ dburl);
});

mongoose.connection.on('error',function(err){
	console.log('mongoose has errors which is as:-'+ err);
});

process.on('SIGINT',function(){
	mongoose.connection.close(function (argument) {
	console.log('Mongose disconnected through app terminated module');
	process.exit(0);
	});
});

process.on('SIGTERM',function(){
	mongoose.connection.close(function (argument) {
	console.log('Mongose disconnected through app terminated module');
	process.exit(0);
	});
});

process.once('SIGUSR2',function(){
	mongoose.connection.close(function (argument) {
	console.log('Mongose disconnected through app terminated module (SIGUSR2)');
	process.kill(process.pid,'SIGUSR2');
	});
});

// Bringing your schecmas to here
require('./expense.model.js');
require('./earning.model.js');
require('./invest.model.js');
require('./share.model.js');