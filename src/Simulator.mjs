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

let InitialInputData = {
	GPSCords: getRandomGpsCoordinates(),
	PressureHeight: 870,
	GPSHeight: 860,
	RelativeHeight: 0,
	InitialHeight: 860,
	Pressure: 2,
	BatteryVoltage: parseInt(Math.random() * 100).toFixed(2),
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
};

if (localStorage.getItem("data") === null) {
	localStorage.setItem("data", JSON.stringify(InitialInputData));
}

console.log(GetData());
function GetData() {
	const data = JSON.parse(localStorage.getItem("data"));

	data.GPSCords = getRandomGpsCoordinates();
	data.PressureHeight += Math.floor(Math.random() * 10 - 1);
	data.GPSHeight += Math.floor(Math.random() * 10);
	data.RelativeHeight = data.GPSHeight - data.InitialHeight;
	data.Pressure -= Math.floor(Math.random() + 0.01);
	data.BatteryVoltage = parseInt(1243 * 0.01 + Math.random(2)).toFixed(2);
	data.Temperature = data.Temperature - Math.floor(Math.random() * 0.02);
	data.AccelerationX = Math.floor(Math.random() * 100);
	data.AccelerationY = Math.floor(Math.random() * 100);
	data.AccelerationZ = Math.floor(Math.random() * 100);
	data.Armed = Math.random() > 0.5;
	data.InFlight = Math.random() > 0.5;
	data.FlightTime += 1;
	data.Uptime += 1;

	localStorage.setItem("data", JSON.stringify(data));

	return data;
}

export default GetData;
