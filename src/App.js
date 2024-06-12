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

	useEffect(() => {
		const interval = setInterval(() => {
			const newData = GetData();
			setDisplayData(newData);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="App">
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
					<h2>Flight time: 00 : 00 : 12</h2>
					<h2>Uptime: 00 : 34 : 12</h2>
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
