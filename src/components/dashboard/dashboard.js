import { useState } from "react";
import "./dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const circleDisplay = ({ value, unit, maxRange, color }) => {
	return (
		<div className="circle">
			<CircularProgressbar
				value={value}
				text={`${value} ${unit}`}
				maxValue={maxRange}
				styles={buildStyles({
					textColor: "#fff",
					pathColor: color || "rgb(43, 82, 189)",
					trailColor: "#fff",
					pathTransitionDuration: 0.5,
					textSize: "14px",
					rotation: 0.6,
				})}
			/>
		</div>
	);
};

function Dashboard({ data }) {
	console.log(data);
	let temperature = data.Temperature;
	let pressure = data.Pressure;
	let voltage = data.BatteryVoltage;
	let height = data.RelativeHeight;
	let vehicleStatus = data.Armed ? "Armed" : "Disarmed";
	let servoDeployed = data.ServoParachuteStatus ? "Deployed" : "Not deployed";
	let beeperEnabled = data.BeeperStatus ? "On" : "Off";
	let position = [1.3521, 103.8198];

	const [servoStatus, setServoStatus] = useState(servoDeployed);
	const [beeperStatus, setBeeperStatus] = useState(beeperEnabled);

	const handleServoClick = () => {
		setServoStatus(
			servoStatus === "Deployed" ? "Not deployed" : "Deployed"
		);
	};

	const handleBeeperClick = () => {
		setBeeperStatus(beeperStatus === "On" ? "Off" : "On");
	};

	return (
		<div className="dashboard">
			<h1>Vehicle overview</h1>
			<div className="status">
				<div className="left">
					<h2>
						Vehicle status: <span>{vehicleStatus}</span>
					</h2>
				</div>
				<div className="right">
					<h2>Flight time: 00 : 00 : 12</h2>
					<h2>Uptime: 00 : 34 : 12</h2>
				</div>
			</div>
			<div className="parameters">
				<section className="text">
					<div className="heights">
						<div>
							<h2>Relative height</h2>
							<p>{height} m</p>
						</div>
						<div>
							<h2>GPS height</h2>
							<p>735 m</p>
						</div>
						<div>
							<h2>Pressure height</h2>
							<p>{pressure} m</p>
						</div>
						<div>
							<h2>Initial height</h2>
							<p>735 m</p>
						</div>
					</div>
					<div>
						<h2>GPS coordinates</h2>
						<p>
							{data.GPSCords.latitude}, {data.GPSCords.longitude}
						</p>
					</div>
				</section>
				<section className="main-four">
					<div className="parameter">
						{circleDisplay({
							value: voltage,
							unit: "V",
							maxRange: 18,
							color: voltage < 11 ? "red" : "rgb(43, 82, 189)",
						})}
					</div>
					<div className="parameter">
						{circleDisplay({
							value: temperature,
							unit: "°C",
							maxRange: 50,
							color:
								temperature > 40 ? "red" : "rgb(43, 82, 189)",
						})}
					</div>
					<div className="settings text">
						<div onClick={handleServoClick}>
							<h2>Servo status</h2>
							<p>{servoStatus}</p>
						</div>
						<div onClick={handleBeeperClick}>
							<h2>Beeper</h2>
							<p>{beeperStatus}</p>
						</div>
					</div>
				</section>
				<section className="map">
					<MapContainer
						center={position}
						zoom={13}
						scrollWheelZoom={false}
						style={{ height: "400px", width: "400px" }}
						>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					</MapContainer>
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
