import React from "react";
import { WeatherProvider } from "./contexts/WeatherContext";
import { CityInput } from './components/CityInput.tsx';
import { WeatherDataSelector } from './components/WeatherDataSelector.tsx';
import { GranularitySelector } from './components/GranularitySelector.tsx';
import { Chart } from './components/Chart.tsx';
import { CityList } from './components/CityList.tsx';

const App: React.FC = () => {
    return (
        <WeatherProvider>
            <div style={{ padding: "20px" }}>
                <h1>Weather App</h1>
                <CityInput />
                <WeatherDataSelector />
                <GranularitySelector />
                <Chart />
                <CityList />
            </div>
        </WeatherProvider>
    );
};

export default App;