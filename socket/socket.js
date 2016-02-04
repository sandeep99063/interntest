module.exports=function(io,mongodb){
	var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/interntest';
 
    var temp;
	io.on('connection',function(client){
    console.log('Connection Esatblished On Server..........!!!!');
     var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    //console.log(text);
    MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        
        console.log('Connection established to', url);
        var collection = db.collection('collection');
           var ocollection = db.collection('ocollection');
        var user1 = {couponcode: text};
        collection.insert([user1], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
    	 
        });

         client.on('mongodata',function(data){
         	temp=data[1];
     collection.update({'couponcode':data[1]},{$set:{'email': data[0],'status': 'New'}}, function (err, o) {
                    if (err) {
                        console.warn(err.message);
                    }
                    else {
                        console.log('Email Updatation Successfull');
                    }
                });//collection update wala
        });//mogodata wala
          client.on('orderdata',function(data){
            var e=data[0];
              var f=data[1];
         var user11 = {orderid: e,orderamount:f};
     ocollection.insert([user11], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Order Inserted ');
            }
    	 
        });

     collection.update({'couponcode':temp},{$set:{'cstate': 'Redeemed'}}, function (err, o) {
                    if (err) {
                        console.warn(err.message);
                    }
                    else {
                        console.log('Coupon Status Updatation Successfull');
                    }
                });//collection update wala
        });//orderdata wala

    }
});
 
    client.emit('ccode',text);
   });//io sockets wala
}