import { useState } from "react";

import "./dashboard.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import settingsIcon from "../../icons/settings.svg";

import setSelected from "../../App";

const icon = new L.Icon({
	iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
	iconSize: [50, 50],
	popupAnchor: [-25, -35],
	iconAnchor: [25, 50],
});

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
	let servoDeployed = data.ServoParachuteStatus ? "Deployed" : "Not deployed";
	let beeperEnabled = data.BeeperStatus ? "On" : "Off";
	let position = [data.GPSCords.latitude, data.GPSCords.longitude];

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

	function handleSettingsClick() {
		setSelected("settings");
	}

	return (
		<div className="dashboard">
			<h1>Vehicle overview</h1>
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
						<div className="changeable">
							<h2>Initial height</h2>
							<img src={settingsIcon} alt="Settings" onClick={handleSettingsClick} />
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
					<div className="text settingsDash">
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
						zoom={20}
						scrollWheelZoom={false}
						attributionControl={false}
						preferCanvas={false}
						style={{
							height: "100%",
							width: "85%",
							borderRadius: "10px",
							marginTop: "10px",
						}}>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={position} icon={icon}>
						</Marker>
					</MapContainer>
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
