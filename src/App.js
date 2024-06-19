import { useState, useEffect } from "react";
import "./App.css";

import dashboardIcon from "./icons/dashboard.svg";
import settingsIcon from "./icons/settings.svg";
import analysisIcon from "./icons/analysis.svg";

import Dashboard from "./components/dashboard/dashboard";
import Analysis from "./components/analysis/analysis";
import Settings from "./components/settings/settings";

import GetData from "./Simulator.mjs";

let vehicleStatus = "Armed";

function App() {
	const [selected, setSelected] = useState("dashboard");
	const [displayData, setDisplayData] = useState(GetData());
	const [flightNumber, setFlightNumber] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			const newData = GetData();
			setDisplayData(newData);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
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
			setFlightNumber("");
			document.querySelector(".overlay").style.display = "none";
		}
	};

	return (
		<div className="App">
			<div className="overlay">
				<div className="box">
					<h2>Enter flight number</h2>
					<div className="div_organize">
						<input
							type="text"
							value={flightNumber}
							onChange={(event) =>
								setFlightNumber(event.target.value)
							}
							onKeyPress={handleKeyPress}
						/>
						<div className="fat_cursor"></div>
					</div>
				</div>
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
			<div className="status">
				<div className="left">
					<h2>
						Vehicle status: <span>{vehicleStatus}</span>
					</h2>
				</div>
				<div className="right">
					<h2>Flight time: {displayData.FlightTime.toFixed(1)}</h2>
					<h2>Uptime: {displayData.Uptime.toFixed(1)}</h2>
				</div>
			</div>
			<div className="content">
				{selected === "dashboard" && <Dashboard data={displayData} />}
				{selected === "analysis" && <Analysis data={displayData} />}
				{selected === "settings" && <Settings data={displayData} />}
			</div>
		</div>
	);
}

export default App;
