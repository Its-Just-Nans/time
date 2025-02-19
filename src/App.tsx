import { useEffect, useState } from "react";
import TimeDisplayer from "./TimeDisplayer";

import "./App.css";

const App = () => {
    const [selectedTimeZone, setSelectedTimeZone] = useState("");
    const [timeZones, setTimeZones] = useState([]);
    const [savedTimeZones, setSavedTimeZones] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // Get all supported time zones using Intl API
        const allTimeZones = Intl.supportedValuesOf("timeZone");
        setTimeZones(allTimeZones);

        // Load saved time zones from localStorage
        const saved = JSON.parse(localStorage.getItem("timeZones")) || [];
        setSavedTimeZones(saved);
    }, []);

    const handleTimeZoneSelect = (event) => {
        const selected = event.target.value;
        if (!selected) return;
        setSelectedTimeZone(selected);

        // Save selected timezone to localStorage
        const updatedTimeZones = [...savedTimeZones, selected];
        setSavedTimeZones(updatedTimeZones);
        localStorage.setItem("timeZones", JSON.stringify(updatedTimeZones));
    };

    const handleDeleteTimeZone = (zoneToDelete) => {
        // Remove the selected time zone from the saved list
        const updatedTimeZones = savedTimeZones.filter((zone) => zone !== zoneToDelete);
        setSavedTimeZones(updatedTimeZones);
        localStorage.setItem("timeZones", JSON.stringify(updatedTimeZones));
    };

    const timer = () => setDate(new Date());

    useEffect(() => {
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
    }, [date]);

    return (
        <div>
            <div>
                <select value={selectedTimeZone} onChange={handleTimeZoneSelect}>
                    <option value="">-- Select a Timezone --</option>
                    {timeZones.map((timeZone) => (
                        <option key={timeZone} value={timeZone}>
                            {timeZone}
                        </option>
                    ))}
                </select>
            </div>
            <br />

            {savedTimeZones.length > 0 ? (
                savedTimeZones.map((zone) => (
                    <div key={zone} className="time-zone">
                        <TimeDisplayer timeZone={zone} date={date} />
                        <button onClick={() => handleDeleteTimeZone(zone)} style={{ marginLeft: "10px", color: "red" }}>
                            ❌
                        </button>
                    </div>
                ))
            ) : (
                <p>No time zones saved yet.</p>
            )}
        </div>
    );
};

export default App;
