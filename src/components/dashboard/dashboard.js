import { useEffect, useState } from "react";
import "./dashboard.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "react-circular-progressbar/dist/styles.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import locationMarker from "../../icons/location_marker.png";
import settingsIcon from "../../icons/settings.svg";

import useWebSocket from "../../useWebSocket";

const icon = new L.Icon({
	iconUrl: locationMarker,
	iconSize: [50, 50],
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

function Dashboard({
	data,
	setVehicleStatus,
	vehicleStatus,
	flightNumber,
	setAnalysisData,
	setInitialFlightTime,
	initialFlightTime,
	initialUptime,
}) {
	const { data: WebSocketData, sendMessage } = useWebSocket(
		"ws://localhost:8764"
	);

	const [InitialHeight, setInitialHeight] = useState("N/A");
	const [InitialGPS, setInitialGPS] = useState("N/A");
	let temperature = data.Temperature;
	let PressureHeight = data.PressureHeight;
	let voltage = data.BatteryVoltage.toFixed(2);
	let GPSHeight = data.GPSHeight;
	let RelativeHeight = GPSHeight - InitialHeight;
	let servoDeployed = data.ServoParachuteStatus ? "Deployed" : "Not deployed";
	let beeperEnabled = data.BeeperStatus ? "On" : "Off";
	let position = [data.GPSCords.latitude, data.GPSCords.longitude];
	let positionShort = [
		data.GPSCords.latitude.toFixed(6),
		", ",
		data.GPSCords.longitude.toFixed(6),
	];

	const [servoStatus, setServoStatus] = useState(servoDeployed);
	const [beeperStatus, setBeeperStatus] = useState(beeperEnabled);

	const handleServoClick = () => {
		setServoStatus(
			servoStatus === "Deployed" ? "Not deployed" : "Deployed"
		);

		if (servoStatus === "Deployed") {
			sendMessage({ command: "move_servo", payload: "90" });
		} else {
			sendMessage({ command: "move_servo", payload: "0" });
		}
	};

	const handleBeeperClick = () => {
		setBeeperStatus(beeperStatus === "On" ? "Off" : "On");
		if (beeperStatus === "On") {
			sendMessage({ command: "beeper_off" });
		} else {
			sendMessage({ command: "beeper_on" });
		}
	};

	function ChangeView({ center }) {
		const map = useMap();
		map.panTo(center);
		return null;
	}

	const toggleArm = () => {
		if (vehicleStatus === "Launched") {
			return;
		} else {
			if (vehicleStatus === "Ready") {
				setVehicleStatus("Armed");
			} else {
				setVehicleStatus("Ready");
			}
		}
	};

	const launchVehicle = () => {
		if (vehicleStatus === "Armed") {
			setVehicleStatus("Launched");
			setInitialFlightTime(Date.now() / 1000);
		} else {
			return;
		}
	};

	useEffect(() => {
		sendMessage({ command: "initial_height", payload: InitialHeight });
	}, [InitialHeight]);

	useEffect(() => {
		sendMessage({ command: "initial_gps", payload: InitialGPS });
	}, [InitialGPS]);

	useEffect(() => {
		sendMessage({ command: "flight_number", payload: flightNumber });
	}, [flightNumber]);

	useEffect(() => {
		if (WebSocketData) {
			if (WebSocketData.command === "view_only") {
				setVehicleStatus("View only");
				setAnalysisData(WebSocketData.payload);
			}
		}
	}, [WebSocketData]);

	useEffect(() => {
		sendMessage({ command: "vehicle_status", payload: vehicleStatus });
	}, [vehicleStatus]);

	const HandleEndFlight = () => {
		const uptime = Math.floor(Date.now() / 1000) - initialUptime;
		const flightTime = Math.floor(Date.now() / 1000) - initialFlightTime;

		sendMessage({
			command: "end_flight",
			payload: [flightNumber, uptime, flightTime],
		});
		window.location.reload();
	};

	return (
		<div className="dashboard">
			<section className="text">
				<div className="heights">
					<div>
						<h2>Relative height</h2>
						<p>{RelativeHeight} m</p>
					</div>
					<div>
						<h2>GPS height</h2>
						<p>{GPSHeight} m</p>
					</div>
					<div>
						<h2>Pressure height</h2>
						<p>{PressureHeight} m</p>
					</div>
				</div>
				<div className="heights init">
					<div>
						<span>
							<h2>Initial height</h2>
							<p>{InitialHeight} m</p>
						</span>
						<button
							title="Set initial height"
							disabled={
								vehicleStatus === "Armed" ||
								vehicleStatus === "Launched"
							}
							onClick={() => {
								setInitialHeight(GPSHeight);
							}}>
							<img src={settingsIcon} alt="Settings" />
						</button>
					</div>

					<div>
						<span>
							<h2>Initial GPS cords</h2>
							<p>{InitialGPS}</p>
						</span>
						<button
							title="Set initial GPS coordinates"
							disabled={
								vehicleStatus === "Armed" ||
								vehicleStatus === "Launched"
							}
							onClick={() => {
								setInitialGPS(positionShort);
							}}>
							<img src={settingsIcon} alt="Settings" />
						</button>
					</div>
				</div>
			</section>
			<section className="main-four">
				<div className="vodoravno">
					<div className="parameter">
						{circleDisplay({
							value: voltage,
							unit: "V",
							maxRange: 5,
							color: voltage < 2 ? "red" : "rgb(43, 82, 189)",
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

				<div className="vodoravno">
					<div
						className="launch"
						onClick={() => toggleArm()}
						style={{
							opacity: vehicleStatus === "Launched" ? 0.2 : 1,
						}}>
						<button
							style={{
								cursor:
									vehicleStatus === "Launched"
										? "not-allowed"
										: "pointer",
								backgroundColor:
									vehicleStatus === "Ready" ? "green" : "red",
							}}>
							{vehicleStatus === "Ready" ? "Arm" : "Disarm"}
						</button>
					</div>
					<div
						className="launch"
						onClick={() => launchVehicle()}
						style={{
							opacity: vehicleStatus === "Armed" ? 1 : 0.2,
						}}>
						<button
							style={{
								cursor:
									vehicleStatus === "Armed"
										? "pointer"
										: "not-allowed",
								backgroundColor:
									vehicleStatus === "Armed" ? "green" : "red",
							}}>
							Launch
						</button>
					</div>
					<div
						className="launch"
						onClick={HandleEndFlight}
						style={{
							opacity: vehicleStatus === "Launched" ? 1 : 0.2,
						}}>
						<button
							style={{
								cursor:
									vehicleStatus === "Launched"
										? "pointer"
										: "not-allowed",
								backgroundColor:
									vehicleStatus === "Launched"
										? "red"
										: "red",
							}}>
							End flight
						</button>
					</div>
				</div>
			</section>
			<section>
				<div id="map">
					<MapContainer
						center={position}
						zoom={20}
						scrollWheelZoom={true}
						attributionControl={false}
						preferCanvas={false}
						style={{
							height: "100%",
							width: "85%",
							borderRadius: "10px",
							marginTop: "10px",
						}}>
						<TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
						<Marker position={position} icon={icon}></Marker>
						<ChangeView center={position} />
					</MapContainer>
				</div>
			</section>
		</div>
	);
}

export default Dashboard;
