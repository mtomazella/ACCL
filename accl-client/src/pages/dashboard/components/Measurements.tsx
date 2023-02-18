import React from 'react'

import styled from 'styled-components'

const StyledMeasurements = styled.div`
  display: grid;
  grid-column: 1f;
  grid-row: 1fr 1fr 1fr;
  height: 100%;
  width: 100%;
`

const StyledMeasurementPanel = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  color: ${({ color }) => color};

  > label {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    > p {
      font-size: 3rem;
      line-height: 3rem;
    }
    > span {
      font-size: 1.5rem;
      line-height: 1.8rem;
    }
  }
`

export type MeasurementObject = {
  label: string
  value: string
  unit: string
  color: string
}

const MeasurementPanel: React.FC<MeasurementObject> = ({
  label,
  value,
  unit,
  color,
}) => (
  <StyledMeasurementPanel color={color}>
    <label>{label}</label>
    <div>
      <p>{value}</p>
      <span>{unit}</span>
    </div>
  </StyledMeasurementPanel>
)

export const Measurements: React.FC<{
  data: MeasurementObject[]
}> = ({ data }) => (
  <StyledMeasurements>
    {data.map(measurement => (
      <MeasurementPanel {...measurement} key={measurement.label} />
    ))}
  </StyledMeasurements>
)
