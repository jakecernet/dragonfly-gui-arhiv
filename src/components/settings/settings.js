import "./settings.css";

const Settings = () => {
	const handleReset = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className="settings">
			<h1>Settings</h1>
			<button className="reset_button" onClick={handleReset}>
				RESET SIMULATOR DATA
			</button>
			<div className="units">
				<div>
					<h2>Speed unit</h2>
					<select>
						<option value="m/s">m/s</option>
						<option value="km/h">km/h</option>
						<option value="mph">mph</option>
					</select>
				</div>
				<div>
					<h2>Pressure unit</h2>
					<select>
						<option value="Pa">Pa</option>
						<option value="hPa">hPa</option>
						<option value="bar">bar</option>
					</select>
				</div>
				<div>
					<h2>Time unit</h2>
					<select>
						<option value="s">s</option>
						<option value="min">min</option>
						<option value="h">h</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Settings;
