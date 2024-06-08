import "./App.css";
import { useState } from "react";

import Dashboard from "./components/dashboard/dashboard";

function App() {
	const [selected, setSelected] = useState("dashboard");

	return (
		<div className="App">
			<nav>
				<ul>
					<li onClick={() => setSelected("dashboard")}>
						<a>Dashboard</a>
					</li>
					<li onClick={() => setSelected("profile")}>
						<a>Profile</a>
					</li>
					<li onClick={() => setSelected("settings")}>
						<a>Settings</a>
					</li>
				</ul>
			</nav>
			<div className="content">
				{selected === "dashboard" && <Dashboard />}
			</div>
		</div>
	);
}

export default App;
