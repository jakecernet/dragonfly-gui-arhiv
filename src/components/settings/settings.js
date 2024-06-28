import "./settings.css";

function Settings({ setTimeUnit, setDistanceUnit }) {
	const handleReset = () => {
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className="settings">
			<h1>Settings</h1>
			<div className="units">
				<div>
					<h2>Distance unit</h2>
					<select>
						<option value="m">m</option>
						<option value="km">km</option>
						<option value="ft">ft</option>
					</select>
				</div>
				<div>
					<h2>Time unit</h2>
					<select>
						<option value="s" onClick={() => setTimeUnit("s")}>
							s
						</option>
						<option value="min" onClick={() => setTimeUnit("min")}>
							min
						</option>
						<option value="h" onClick={() => setTimeUnit("h")}>
							h
						</option>
					</select>
				</div>
			</div>
			<button onClick={handleReset}>RESET SIMULATOR DATA</button>
		</div>
	);
}

export default Settings;
