import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import styled from "styled-components";
import { useWeatherContext } from '../hooks';

const ChartContainer = styled.div`
    width: 100%;
    height: 400px;
`;

export const Chart: React.FC = () => {
    const { weatherData, selectedData, granularity } = useWeatherContext();

    // Формируем данные для графика
    const formattedDataByCity = weatherData.map(({ city, data }) => {
        let filteredData = data;

        // Фильтруем данные для гранулярности "день"
        if (granularity === "day") {
            filteredData = data.filter((_, index) => index % 8 === 0); // Берём каждые 8 элементов
        }

        return {
            city,
            data: filteredData.map((item: any) => {
                const timestamp = new Date(item.dt * 1000);
                const cloudsAll = item.clouds?.all || 0;
                const pop = (item.pop || 0) * 100;
                const rain3h = item.rain?.["3h"] || 0;

                return {
                    timestamp,
                    temp: item.main.temp,
                    feels_like: item.main.feels_like,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    pressure: item.main.pressure,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed,
                    clouds_all: cloudsAll,
                    pop: pop,
                    rain_3h: rain3h,
                };
            }),
        };
    });

    // Создаём массив всех уникальных временных меток для оси X
    const allTimestamps = Array.from(
        new Set(
            formattedDataByCity.flatMap(({ data }) =>
                data.map((d) => d.timestamp.getTime())
            )
        )
    ).sort((a, b) => a - b);

    // Создаём массив данных для графика с объединёнными точками по временным меткам
    const combinedData = allTimestamps.map((timestamp) => {
        const timestampDate = new Date(timestamp);
        const pointData: any = { timestamp: timestampDate };

        formattedDataByCity.forEach(({ city, data }) => {
            const cityDataPoint = data.find((d) =>
                granularity === "day"
                    ? d.timestamp.toDateString() === timestampDate.toDateString()
                    : d.timestamp.getTime() === timestamp
            );

            if (cityDataPoint) {
                pointData[city] = cityDataPoint[selectedData];
            }
        });

        return pointData;
    });

    return (
        <ChartContainer>
            <LineChart
                width={1600}
                height={400}
                data={combinedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(tick) =>
                        new Date(tick).toLocaleDateString()
                    }
                />
                <YAxis />
                <Tooltip />
                <Legend />

                {/* Добавляем линию для каждого города */}
                {formattedDataByCity.map(({ city }, index) => (
                    <Line
                        key={city}
                        type="monotone"
                        dataKey={city}
                        name={city}
                        stroke={`hsl(${(index * 120) % 360}, 70%, 50%)`}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ChartContainer>
    );
};
