import "./settings.css";

import data from "../../Simulator.mjs";

const Settings = () => {

	const handleReset = () => {
		localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="settings">
			<h1>Settings</h1>
			<button className="reset_button" onClick={handleReset}>RESET SIMULATOR DATA</button>
			<div className="units">
				<div>
					<h2>Speed unit</h2>
					<p>{data.speedUnit}</p>
				</div>
				<div>
					<h2>Pressure unit</h2>
					<p>{data.PressureUnit}</p>
				</div>
				<div>
					<h2>Time unit</h2>
					<p>{data.TimeUnit}</p>
				</div>
			</div>
		</div>
	);
};

export default Settings;
