export type WeatherData = {
    city: string;
    data: any[];
};

export type WeatherContextType = {
    weatherData: WeatherData[];
    addCity: (city: string) => Promise<void>;
    removeCity: (city: string) => void;
    selectedData: string;
    setSelectedData: (data: string) => void;
    granularity: string;
    setGranularity: (granularity: string) => void;
};