import "./analysis.css";

import data from "../../Simulator.mjs";

const Analysis = () => {
    return (
		<div className="analysis">
			<h1>Analysis</h1>
			<div className="stats">
				<div className="graph">					
				</div>
				<div className="statsText">
					<h2>Statistics</h2>
					<p>Max height: {data.maxHeight}</p>
					<p>Max speed: {data.maxSpeed}</p>
					</div>
			</div>
		</div>
	);
};

export default Analysis;