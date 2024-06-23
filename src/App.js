import { useState, useEffect, useRef } from "react";
import "./App.css";

import dashboardIcon from "./icons/dashboard.svg";
import settingsIcon from "./icons/settings.svg";
import analysisIcon from "./icons/analysis.svg";

import Dashboard from "./components/dashboard/dashboard";
import Analysis from "./components/analysis/analysis";
import Settings from "./components/settings/settings";

import GetData from "./Simulator.mjs";
import useWebSocket from "./useWebSocket";

function App() {
    const [selected, setSelected] = useState("dashboard");
    const [displayData, setDisplayData] = useState(GetData());
    const [flightNumber, setFlightNumber] = useState("");
    const inputRef = useRef(null);
    const [vehicleStatus, setVehicleStatus] = useState("Ready");

    const { data: WebSocketData, sendMessage } = useWebSocket('ws://localhost:8765');

    useEffect(() => {
        if (flightNumber.length > 10) {
            setFlightNumber(flightNumber.slice(0, 10));
        }
    }, [flightNumber]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newData = GetData();
            setDisplayData(newData);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (vehicleStatus === "Ready") {
            document.body.classList.toggle("armed", false);
            document.body.classList.toggle("ready", true);
        } else {
            document.body.classList.toggle("armed", true);
            document.body.classList.toggle("ready", false);
        }
    }, [vehicleStatus]);

    useEffect(() => {
        if (displayData.FlightNumber !== "") {
            document.title = `Flight ${displayData.FlightNumber}`;
        }
        if (vehicleStatus === "Launched") {
            document.getElementById("colored").style.color = "red";
        }
    }, [displayData, vehicleStatus]);

    useEffect(() => {
        if (WebSocketData) {
            console.log('Received data from WebSocket:', WebSocketData);
            // Handle the received data as needed
            // For example, update the display data based on the received data
            setDisplayData(prevData => ({ ...prevData, ...WebSocketData }));
        }
    }, [WebSocketData]);

    return (
        <div className="App">
            {/* <div className="overlay">
                <div className="box">
                    <div className="div_organize">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Enter flight number"
                            value={flightNumber}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            style={{ width: `${flightNumber.length + 1}ch` }}
                        />
                        <div className="fat_cursor"></div>
                    </div>
                </div>
            </div> */}
        
            <div className="status">
                <div className="left">
                    <h2>
                        Vehicle status:{" "}
                        <span
                            id="colored"
                            style={{
                                color:
                                    vehicleStatus === "Ready"
                                        ? "rgba(0, 255, 0, 0.745)"
                                        : "yellow",
                            }}>
                            {vehicleStatus}
                        </span>
                    </h2>
                </div>
                <div className="center">
                    <h1>Flight {displayData.FlightNumber}</h1>
                </div>
                <div className="right">
                    <h2>Flight time: {displayData.FlightTime.toFixed(1)}</h2>
                    <h2>Uptime: {displayData.Uptime.toFixed(1)}</h2>
                </div>
            </div>
            <div className="content">
                {selected === "dashboard" && (
                    <Dashboard
                        data={displayData}
                        setVehicleStatus={setVehicleStatus}
                        vehicleStatus={vehicleStatus}
                    />
                )}
                {selected === "analysis" && <Analysis data={displayData} />}
                {selected === "settings" && <Settings data={displayData} />}
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
        </div>
    );
}

export default App;
