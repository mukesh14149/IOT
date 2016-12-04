var express=require('express');
var app=express();
app.get('/hello',function(req,res){
	res.send("Hello World!");
});
var server=app.listen(8080,function(){
	console.log("Server running..");
});
