var awsIot = require('aws-iot-device-sdk');
var cmd = require('node-cmd');
var fs = require('fs');
var device = awsIot.thingShadow({
   keyPath: '/home/pi/Desktop/2014149_certs/bc2996934c-private.pem.key',
  certPath: '/home/pi/Desktop/2014149_certs/bc2996934c-certificate.pem.crt',
    caPath: '/home/pi/Desktop/2014149_certs/VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem',
  clientId: '2014149_Assignment',
    region: 'us-east-1'
});


device
  .on('connect', function() {
    console.log('connected');
    	setInterval(function() {
		    	cmd.get(
									'date > date.txt'
					);
					var date = fs.readFileSync("/home/pi/Desktop/Assignment_6/Rpi/date.txt");
					date = date.toString();
					var full_time = date.split(' ');
					var time = full_time[3];

					var d = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
					d = d/1000;
					InitialTemperatureState=d.toString();
					InitialTimeState=time;
					var TemperatureState = {"state":{"reported":{"Time":InitialTimeState,"Temperature":InitialTemperatureState}}};
								//console.log(JSON.stringify(TemperatureState));


				device.register('2014149_Assignment');
				    setTimeout(function(){
					clientToken = device.update('2014149_Assignment',TemperatureState);
				},2000);

				device.publish('temperature', JSON.stringify({
					 "time": InitialTimeState,
			        "temperature": InitialTemperatureState}));
				device.subscribe('temperature', function(error, result) {
		      		console.log(result);
		    });

			},2000);
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
 });


