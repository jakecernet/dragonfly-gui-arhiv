import { useState, useEffect } from "react";
import "./App.css";

import dashboardIcon from "./icons/dashboard.svg";
import settingsIcon from "./icons/settings.svg";
import analysisIcon from "./icons/analysis.svg";

import Dashboard from "./components/dashboard/dashboard";
import GetData from "./Simulator.mjs";

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
                    <li onClick={() => setSelected("profile")}>
                        <a>
                            <img src={settingsIcon} alt="Settings" />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="content">
                {selected === "dashboard" && <Dashboard data={displayData} />}
            </div>
        </div>
    );
}

export default App;
