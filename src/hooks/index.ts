import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext.tsx';

export const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeatherContext must be used within a WeatherProvider");
    }
    return context;
};