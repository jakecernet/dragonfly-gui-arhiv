function getRandomGpsCoordinates() {
	// Latitude ranges from -90 to 90
	const lat = 46.11775450274306;
	
	const lon = 14.022392745016298;

	return {
		latitude: lat,
		longitude: lon,
	};
}

function GetRandomTemperature() {
	return 22 + Math.floor(Math.random() * 10 - 1);
}
function getInitialTime() {
	return new Date().getTime() / 1000;
}
console.log(getInitialTime());

let InitialInputData = {
	initialTime: getInitialTime(),
	GPSCords: getRandomGpsCoordinates(),
	PressureHeight: 870,
	GPSHeight: 860,
	RelativeHeight: 0,
	InitialHeight: 860,
	Pressure: 2,
	BatteryVoltage: 5,
	Temperature: GetRandomTemperature(),
	AccelerationX: 0,
	AccelerationY: 0,
	AccelerationZ: 0,
	BeeperStatus: Math.random() > 0.5,
	ServoParachuteStatus: 0,
	Armed: Math.random() > 0.5,
	InFlight: Math.random() > 0.5,
	FlightTime: 0,
	Uptime: 0,
	speedUnit: "km/h",
	PressureUnit: "Bar",
	TimeUnit: "s",
};




function GetData() {
	if (localStorage.getItem("data") === null) {
		localStorage.setItem("data", JSON.stringify(InitialInputData));
	}

	let data = JSON.parse(localStorage.getItem("data"));

	if (data.GPSHeight > 1100 ){
		data = InitialInputData;

	}
	else {
		data.GPSCords.latitude += Math.random() * 0.00001;
	data.GPSCords.longitude += Math.random() * 0.00001;
	data.GPSHeight += Math.floor(Math.random() * 3);
	data.PressureHeight = data.GPSHeight + 14;
	data.RelativeHeight = data.GPSHeight - data.InitialHeight;
	data.Pressure -= Math.floor(Math.random() + 0.01);
	}

	

	if(data.BatteryVoltage > 0.1) {
		data.BatteryVoltage -= 0.0001;

	}

	data.Temperature = data.Temperature - Math.floor(Math.random() * 0.02);
	data.AccelerationX = Math.floor(Math.random() * 100);
	data.AccelerationY = Math.floor(Math.random() * 100);
	data.AccelerationZ = Math.floor(Math.random() * 100);
	data.Armed = Math.random() > 0.5;
	data.InFlight = Math.random() > 0.5;
	data.FlightTime = getInitialTime() - data.initialTime;
	data.Uptime = getInitialTime() - data.initialTime;
	data.speedUnit = "km/h";
	data.PressureUnit = "Bar";
	data.TimeUnit = "s";

	localStorage.setItem("data", JSON.stringify(data));

	return data;
}

export default GetData;