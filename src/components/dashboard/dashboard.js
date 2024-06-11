import "./dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useState } from "react";

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
					</div>
				<div className="right">
					<div>
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
					<div className="map"></div>
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
				<section className="text">
					<div>
						<h2>Flight time</h2>
						<p>00 : 00 : 12</p>
					</div>
					<div>
						<h2>Uptime</h2>
						<p>00 : 34 : 12</p>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
