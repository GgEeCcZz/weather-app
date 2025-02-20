import { createContext, useState } from "react";
import { getCityCoordinates, getWeatherByCity } from '../services/api.ts';
import { WeatherContextType, WeatherData } from '../types';

export const WeatherContext = createContext<WeatherContextType | undefined>(
    undefined
);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                             children,
                                                                         }) => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [selectedData, setSelectedData] = useState<string>("temp");
    const [granularity, setGranularity] = useState<string>("3h");

    const addCity = async (city: string) => {
        try {
            const coords = await getCityCoordinates(city);
            const forecast = await getWeatherByCity(coords.lat, coords.lon);
            setWeatherData((prev) => [
                ...prev,
                { city: coords.name, data: forecast.list },
            ]);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const removeCity = (cityToRemove: string) => {
        setWeatherData((prev) =>
            prev.filter(({ city }) => city !== cityToRemove)
        );
    };

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                addCity,
                removeCity,
                selectedData,
                setSelectedData,
                granularity,
                setGranularity,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};