import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getCityCoordinates = async (city: string) => {
    const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    return response.data[0];
};

export const getWeatherByCity = async (lat: number, lon: number) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return response.data;
};