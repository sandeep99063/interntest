var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	mongodb = require('mongodb');

	app.set('views',path.join(__dirname,'views'));
	app.engine('html',require('hogan-express'));//template engine use html file to render
	app.set('view engine','html');
	app.use(express.static(path.join(__dirname,'public')));//where it will look for css file
	app.route('/').get(function(req,res,next){
		res.render('index',{title:'Sandeep'})
	})
	app.route('/order').get(function(req,res,next){
		res.render('order',{title:'Order Checkout'})
	})
	app.set('port',process.env.PORT || 3000);
	var server = require('http').createServer(app);
	var io =require('socket.io').listen(server);
		require('./socket/socket.js')(io,mongodb);
	 server.listen(app.get('port'),function(){
	 	console.log('App. is listening on Port:' + app.get('port'));

	 })
