Question:-
Here is a method to get current CPU temperature of your RPi.
http://www.cyberciti.biz/faq/linux-find-out-raspberry-pi-gpu-and-arm-cpu-temperature-command/

You need to implement a REST API to get this temperature of your board. 
1. The REST URL should be http://<IP_address_of_RPi>/pi/sensors/temperature/
2. When one uses HTTP GET for the URL, the output should be in HTML file with the following output.
Sensor: Temperature Sensor
Description: A temperature sensor.

Type: float
Recorded at: <Current date and time>
Value: <current value>
3. When one uses HTTP GET with header containing Accept with application/json option, the output should be a JSON file with the following output.
{
  "name": "Temperature Sensor",
  "description": "A temperature sensor",
  "type": "float",
  "unit": "celsius",
  "value": <current value>,
  "timestamp": "<Current date and time>"
}



Solution:-
run cmd "npm install node-cmd" if not installed
run cmd "npm install -g express" if not installed
run the server.js file
