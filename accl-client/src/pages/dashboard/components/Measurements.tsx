import React from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faBoxArchive,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, IconButton, Tooltip } from '@mui/material'
import styled from 'styled-components'

const StyledMeasurements = styled.div`
  display: grid;
  grid-column: 1f;
  grid-row: 1fr 1fr 1fr;
  grid-row-gap: 2rem;
  padding: 1rem 1rem 1rem 0;
  width: 100%;
`

const StyledPanel = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-family: monospace;
  color: gray;
  border: 1px solid #e0e0e0;
  font-size: 1.5rem;
  padding: 1rem;

  > .MuiIconButton-root {
    color: white;

    &:nth-of-type(1) {
      background-color: #82d582;
    }
    &:nth-of-type(2) {
      background-color: #6363c2;
    }
    &:nth-of-type(3) {
      background-color: #bb5dbb;
    }
  }
`

const StyledMeasurementPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  color: gray;
  border: 1px solid #e0e0e0;
  aspect-ratio: 1;
  font-size: 1.5rem;
  padding: 3rem;

  > h3 {
    font-size: 1.2rem;
    text-transform: uppercase;
    padding-top: 0.5rem;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
`

export type MeasurementObject = {
  label: string
  value: string
  unit: string
  icon: IconProp
}

const MeasurementPanel: React.FC<MeasurementObject> = ({
  label,
  value,
  unit,
  icon,
}) => (
  <StyledMeasurementPanel>
    <FontAwesomeIcon icon={icon} />
    <h3>{label}</h3>
    <div>
      <h1>{value}</h1>
      <h3>{unit}</h3>
    </div>
  </StyledMeasurementPanel>
)

export const Measurements: React.FC<{
  data: MeasurementObject[]
}> = ({ data }) => (
  <StyledMeasurements>
    <StyledPanel>
      <Tooltip title="Enviar para a carga">
        <IconButton>
          <FontAwesomeIcon icon={faArrowRight} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Salvar configurações">
        <IconButton>
          <FontAwesomeIcon icon={faSave} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ver configurações salvas">
        <IconButton>
          <FontAwesomeIcon icon={faBoxArchive} />
        </IconButton>
      </Tooltip>
    </StyledPanel>

    {data.map(measurement => (
      <MeasurementPanel {...measurement} key={measurement.label} />
    ))}
  </StyledMeasurements>
)
