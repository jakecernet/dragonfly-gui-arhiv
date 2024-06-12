import "./analysis.css";

import data from "../../Simulator.mjs";

let vehicleStatus = data.Armed ? "Armed" : "Disarmed";

const Analysis = () => {
    return (
		<div className="analysis">
			<h1>Analysis</h1>
		</div>
	);
};

export default Analysis;