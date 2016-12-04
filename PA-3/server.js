var express=require('express');
var app=express();
var fs=require('fs');
var cmd=require('node-cmd');
app.get('/pi/sensors/temperature/application/json',function(req,res){
	var temp=fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
	var temp_c=temp/1000;
	cmd.get('vcgencmd measure_temp > temp.text')
    	cmd.get('date > date.text')
	
	console.log(fs.readFileSync("date.text"))
	var temp_data = {
                    "name":"Temperature Sensor",
                    "description":"A temperature sensor",
                    "type":"float",
                    "unit":"celsius",
                    "CPU temp":temp_c,
                    "GPU temp":" " + fs.readFileSync("temp.text"),
                    "timestamp":" " + fs.readFileSync("date.text")
                };
	cmd.get('JSON.stringify(temp_data) > file.json')
            res.write(JSON.stringify(temp_data));
            res.end();
});
app.get('/pi/sensors/temperature',function(req,res){
    	res.write("Sensor: Temperature Sensor");
        res.write("\n");
        res.write("Description: A Temperature Sensor");
        res.write("\n");
        res.write("Type: Float");
        res.write("\n");
        res.write("Recorded at: " + fs.readFileSync("date.text"));
        res.write("\n");
        res.write("CPU Temperature :" + fs.readFileSync("temp.text"));
        res.write("\n");
        res.write("GPU Temperature :" + fs.readFileSync("date.text"));
        res.end();
});
var server=app.listen(8080,function(){
    console.log("Server running..");
});