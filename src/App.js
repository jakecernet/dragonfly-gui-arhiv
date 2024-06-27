import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Dashboard from "./components/dashboard/dashboard";
import Analysis from "./components/analysis/analysis";
import Settings from "./components/settings/settings";

import dashboardIcon from "./icons/dashboard.svg";
import settingsIcon from "./icons/settings.svg";
import analysisIcon from "./icons/analysis.svg";

import GetData from "./Simulator.mjs";

function App() {
	const [selected, setSelected] = useState("dashboard");
	const [AnalysisData, setAnalysisData] = useState("");
	const [displayData, setDisplayData] = useState(GetData());
	const [flightNumber, setFlightNumber] = useState("");
	const inputRef = useRef(null);
	const [vehicleStatus, setVehicleStatus] = useState("Ready");
	const [inputFlightNumber, setInputFlightNumber] = useState("");
	const [initialUptime, setInitialUptime] = useState(
		Math.floor(Date.now() / 1000)
	);
	const [initialFlightTime, setInitialFlightTime] = useState(false);

	useEffect(() => {
		if (flightNumber.length > 10) {
			setFlightNumber(flightNumber.slice(0, 10));
		}
	}, [flightNumber]);

	useEffect(() => {
		const interval = setInterval(() => {
			const newData = GetData();
			setDisplayData(newData);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(() => {
		if (vehicleStatus === "Ready") {
			document.body.classList.toggle("armed", false);
			document.body.classList.toggle("ready", true);
			document.title = `Flight ${flightNumber} - Ready`;
		} else {
			document.body.classList.toggle("armed", true);
			document.body.classList.toggle("ready", false);
			document.title = `Flight ${flightNumber} - ${vehicleStatus}`;
		}
	}, [vehicleStatus, flightNumber]);

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			setFlightNumber(inputFlightNumber);
			const newFlightNumber = flightNumber.trim();
			if (newFlightNumber !== "") {
				const existingFlightNumbers = document.cookie
					.split(";")
					.map((cookie) => cookie.trim().split("=")[0]);
				if (!existingFlightNumbers.includes("flightNumber")) {
					document.cookie = `flightNumber=${newFlightNumber}; path=/;`;
				} else {
					const existingFlightNumber = document.cookie
						.split(";")
						.find((cookie) =>
							cookie.trim().startsWith("flightNumber")
						)
						.split("=")[1];
					document.cookie = `flightNumber=${existingFlightNumber},${newFlightNumber}; path=/;`;
				}
			}
			document.querySelector(".overlay").style.display = "none";
			document.title = `Flight ${newFlightNumber} - Ready`;
		}
	};

	const handleInputChange = (event) => {
		setInputFlightNumber(event.target.value);
		if (inputRef.current) {
			inputRef.current.style.width = `${event.target.value.length + 1}ch`;
		}
	};

	useEffect(() => {
		if (flightNumber.length === 0) {
			inputRef.current.style.width = "17ch";
		}
	}, [flightNumber]);

	useEffect(() => {
		if (vehicleStatus === "View only") {
			setSelected("analysis");
			document.querySelector(".right").style.opacity = "0";
			document.querySelector(
				"nav ul li:nth-child(1)"
			).style.pointerEvents = "none";
			document.querySelector("nav ul li:nth-child(1)").style.opacity =
				"0.5";
			document.querySelector(
				"nav ul li:nth-child(2)"
			).style.pointerEvents = "auto";
			document.querySelector("nav ul li:nth-child(2)").style.opacity =
				"1";
			document.querySelector(
				"nav ul li:nth-child(3)"
			).style.pointerEvents = "none";
			document.querySelector("nav ul li:nth-child(3)").style.opacity =
				"0.5";
		} else {
			document.querySelector(".right").style.opacity = "1";
			document.querySelector(
				"nav ul li:nth-child(2)"
			).style.pointerEvents = "none";
			document.querySelector("nav ul li:nth-child(2)").style.opacity =
				"0.5";
		}
	}, [vehicleStatus]);

	useEffect(() => {
		if (vehicleStatus === "Launched") {
			document.getElementById("colored").style.color = "red";
		}
	}, [vehicleStatus]);

	return (
		<div className="App">
			<div className="overlay">
				<div className="box">
					<div className="div_organize">
						<input
							ref={inputRef}
							type="text"
							placeholder="Enter flight number"
							value={inputFlightNumber}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
							style={{ width: `${flightNumber.length + 1}ch` }}
						/>
						<div className="fat_cursor"></div>
					</div>
				</div>
			</div>
			<div className="status">
				<div className="left">
					<h2>
						Vehicle status:{" "}
						<span
							id="colored"
							style={{
								color:
									vehicleStatus === "Ready"
										? "rgba(0, 255, 0, 0.745)"
										: "yellow",
							}}>
							{vehicleStatus}
						</span>
					</h2>
				</div>
				<div className="center">
					<h1>Flight {flightNumber}</h1>
				</div>
				<div className="right">
					<h2>
						Flight time:{" "}
						{initialFlightTime
							? (Date.now() / 1000 - initialFlightTime).toFixed(1)
							: "N/A"}
					</h2>
					<h2>
						Uptime: {(Date.now() / 1000 - initialUptime).toFixed(1)}
					</h2>
				</div>
			</div>
			<div className="content">
				{selected === "dashboard" && (
					<Dashboard
						data={displayData}
						setVehicleStatus={setVehicleStatus}
						vehicleStatus={vehicleStatus}
						setFlightNumber={setFlightNumber}
						flightNumber={flightNumber}
						setAnalysisData={setAnalysisData}
						setInitialFlightTime={setInitialFlightTime}
						initialFlightTime={initialFlightTime}
						initialUptime={initialUptime}
					/>
				)}
				{selected === "analysis" && (
					<Analysis
						AnalysisData={AnalysisData}
					/>
				)}
				{selected === "settings" && <Settings data={displayData} />}
			</div>
			<nav>
				<ul>
					<li onClick={() => setSelected("dashboard")}>
						<a>
							<img src={dashboardIcon} alt="Dashboard" />
							Dashboard
						</a>
					</li>
					<li onClick={() => setSelected("analysis")}>
						<a>
							<img src={analysisIcon} alt="Analysis" />
							Analysis
						</a>
					</li>
					<li onClick={() => setSelected("settings")}>
						<a>
							<img src={settingsIcon} alt="Settings" />
							Settings
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default App;
