import "./settings.css";

import data from "../../Simulator.mjs";

let vehicleStatus = data.Armed ? "Armed" : "Disarmed";

const Settings = () => {
	return (
		<div className="settings">
			<h1>Settings</h1>
		</div>
	);
};

export default Settings;
