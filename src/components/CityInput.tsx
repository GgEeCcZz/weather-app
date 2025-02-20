import React, { useState } from "react";
import styled from "styled-components";
import { useWeatherContext } from '../hooks';

const InputContainer = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export const CityInput: React.FC = () => {
    const [city, setCity] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { addCity, weatherData } = useWeatherContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Очистка ошибок перед новой попыткой
        setError(null);

        // Проверка на пустое значение
        if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }

        // Валидация: только буквы и пробелы
        const cityRegex = /^[a-zA-Zа-яА-Я\s]+$/u;
        if (!cityRegex.test(city)) {
            setError("City name can only contain letters and spaces.");
            return;
        }


        const existingCity = weatherData.find(({ city: c }) =>
            c.toLowerCase() === city.trim().toLowerCase()
        );
        if (existingCity) {
            setError("This city is already added.");
            return;
        }


        await addCity(city.trim());
        setCity("");
    };

    return (
        <InputContainer>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        // Разрешаем ввод только букв и пробелов
                        const sanitizedValue = inputValue.replace(/[^a-zA-Zа-яА-Я\s]/gi, "");
                        setCity(sanitizedValue);
                    }}
                />
                <Button type="submit" disabled={!city.trim()}>
                    Add City
                </Button>
            </form>
            {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>
    );
};
