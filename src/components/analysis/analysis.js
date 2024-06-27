import "./analysis.css";

import { useEffect, useState } from "react";

const Analysis = ({ AnalysisData }) => {
	const [displayData, setDisplayData] = useState({
		FlightNumber: NaN,
		NumberOfCommandsSent: NaN,
		InitHeight: NaN,
		InitGPS: NaN,
		InitTime: NaN,
	});

	function FormatAnalysisData(data) {
		const lines = data.split("\n");

		const flightNumber = lines[0].trim();
		const numCommandsSent = parseInt(lines[1].trim(), 10);
		const initHeight = parseInt(lines[2].trim(), 10);
		const initGPS = lines[3].trim();
		const initTime = lines[4].trim();
		const uptime = lines[5].trim();
		const flightTime = lines[6].trim();

		let formattedData = {
			FlightNumber: flightNumber,
			NumberOfCommandsSent: numCommandsSent,
			InitHeight: initHeight,
			InitGPS: initGPS,
			InitTime: initTime,
			FlightTime: flightTime,
			Uptime: uptime,
		};

		return formattedData;
	}

	useEffect(() => {
		setDisplayData(FormatAnalysisData(AnalysisData));
	}, []);

	return (
		<div className="analysis">
			<h1>Analysis</h1>
			<div className="info">
				<div>
					<h2>Flight starting time: {displayData.InitTime}</h2>
					<h2>Initial height: {displayData.InitHeight} m</h2>
					<h2>Flight time: {displayData.FlightTime} s</h2>
					<h2>Uptime: {displayData.Uptime} s</h2>
					<h2>Initial GPS: {displayData.InitGPS}</h2>
				</div>
			</div>
		</div>
	);
};

export default Analysis;
