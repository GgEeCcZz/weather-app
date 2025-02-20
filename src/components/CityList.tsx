import React from "react";
import styled from "styled-components";
import { useWeatherContext } from '../hooks';

const CityListContainer = styled.div`
  margin-top: 20px;
`;

const CityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
`;

const CityName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;

export const CityList: React.FC = () => {
    const { weatherData, removeCity } = useWeatherContext();

    return (
        <CityListContainer>
            <h3>Added Cities</h3>
            {weatherData.length > 0 ? (
                weatherData.map(({ city }) => (
                    <CityItem key={city}>
                        <CityName>{city}</CityName>
                        <RemoveButton onClick={() => removeCity(city)}>Remove</RemoveButton>
                    </CityItem>
                ))
            ) : (
                <p>No cities added yet.</p>
            )}
        </CityListContainer>
    );
};
