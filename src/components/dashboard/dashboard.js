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
	let vehicleStatus = data.Armed ? "Armed" : "Disarmed";
	let servoDeployed = data.ServoParachuteStatus ? "Deployed" : "Not Deployed";

	return (
		<div className="dashboard">
			<h1>Vehicle overview</h1>
			<div className="parameters">
				<section className="text">
					<div>
						<h2>Relative height</h2>
						<p>{height} m</p>
					</div>
					<div>
						<h2>GPS height</h2>
						<p>735 m</p>
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
							value: pressure,
							unit: "bar",
							maxRange: 5,
							color: pressure < 1 ? "red" : "rgb(43, 82, 189)",
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
					<div className="parameter">
						{circleDisplay({
							value: vehicleStatus,
							unit: "",
							maxRange: 1,
							color: vehicleStatus === "Armed" ? "red" : "green",
						})}
					</div>
				</section>
				<section className="text">
					<div>
						<h2>Flight time</h2>
						<p>06 : 34 : 12</p>
					</div>
					<div>
						<h2>Servo status</h2>
						<p>{servoDeployed}</p>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
