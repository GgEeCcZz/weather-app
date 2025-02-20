import React from "react";
import styled from "styled-components";
import { useWeatherContext } from '../hooks';

const SelectorContainer = styled.div`
    margin-bottom: 20px;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const WeatherDataSelector: React.FC = () => {
    const { selectedData, setSelectedData } = useWeatherContext();

    return (
        <SelectorContainer>
            <label htmlFor="data-selector">Select Data:</label>
            <Select
                id="data-selector"
                value={selectedData}
                onChange={(e) => setSelectedData(e.target.value)}
            >
                <option value="temp">Temperature</option>
                <option value="feels_like">Feels Like Temperature</option>
                <option value="temp_min">Min Temperature</option>
                <option value="temp_max">Max Temperature</option>
                <option value="pressure">Pressure</option>
                <option value="humidity">Humidity</option>
                <option value="windSpeed">Wind Speed</option>
                <option value="clouds_all">Cloudiness (%)</option>
                <option value="pop">Probability of Precipitation (%)</option>
                <option value="rain_3h">Rainfall (3h)</option>
            </Select>
        </SelectorContainer>
    );
};
