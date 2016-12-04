var AWS = require("aws-sdk");
var express = require("express");
var fs = require("fs");
var app = express();
/*-------------------------------------------------------------------------------*/
//Set AWS config.

AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "AKIAIEPSCA6UJWHYFESA",
  secretAccessKey: "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"
});


//Get dynamodb client object to communicate with table
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {																	
//contains the details of table from which we get data.
    TableName: "Temperature_149",
    ProjectionExpression: "#yr, Temperature",
    ExpressionAttributeNames: {"#yr": "Time",}
};

var Time = [];
var Temperature = [];

app.get("/rpi_temperature",function(req,res){
		//Fetch html raw data in to String.
	fs.readFile('Browser.html', 'utf-8', function (err, object_html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });


        //Request scan the data from table and insert into empty array of Time and Temperature
	        docClient.scan(params, onScan);
		    function onScan(err, data) 
		    {
		           data.Items.forEach(function(temp) {
		           Time.push("'" + temp.Time + "'");
		           Temperature.push(temp.Temperature);});

		           if (typeof data.LastEvaluatedKey != "undefined") {
				   console.log("Scanning for more...");
				   params.ExclusiveStartKey = data.LastEvaluatedKey;
				   docClient.scan(params, onScan);
		           }
		            
		    }

		  	

		    console.log(Time.length);
		    var h1  =object_html; 
	            if(Time.length!=0){
			 h1=object_html.replace('Waiting for update...',"");
		    }
	            h1 = h1.replace('{{Time}}',Time.sort());
		    h1 = h1.replace('{{Temperature}}',Temperature);
	            res.write(h1);		
	            res.end();
    });
});
app.listen(80);
