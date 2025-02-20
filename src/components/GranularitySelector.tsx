import React from "react";
import styled from "styled-components";
import { useWeatherContext } from '../hooks';

const SelectorContainer = styled.div`
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  margin-right: 20px;
  font-size: 16px;
`;

export const GranularitySelector: React.FC = () => {
    const { granularity, setGranularity } = useWeatherContext();

    return (
        <SelectorContainer>
            <RadioLabel>
                <input
                    type="radio"
                    name="granularity"
                    value="3h"
                    checked={granularity === "3h"}
                    onChange={() => setGranularity("3h")}
                />
                3 Hours
            </RadioLabel>
            <RadioLabel>
                <input
                    type="radio"
                    name="granularity"
                    value="day"
                    checked={granularity === "day"}
                    onChange={() => setGranularity("day")}
                />
                Day
            </RadioLabel>
        </SelectorContainer>
    );
};
