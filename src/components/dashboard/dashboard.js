import { useState } from "react";
import "./dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
	let position = [1.3521, 74.8198];

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
					<iframe
						src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${position[1]}!3d${position[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDU1JzEwLjAiTiAxMDPCsDAwJzUwLjAiVw!5e0!3m2!1sen!2suk!4v1634234567890!5m2!1sen!2suk`}
						height="450"
						width="85%"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						title="map"></iframe>
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
