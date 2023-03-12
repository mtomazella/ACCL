import React from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faBoxArchive,
  faGear,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Tooltip } from '@mui/material'

import {
  StyledMeasurementPanel,
  StyledMeasurements,
  StyledPanel,
} from './Measurements.styled'

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

      <Tooltip title="Configurações da aplicação">
        <IconButton>
          <FontAwesomeIcon icon={faGear} />
        </IconButton>
      </Tooltip>
    </StyledPanel>

    {data.map(measurement => (
      <MeasurementPanel {...measurement} key={measurement.label} />
    ))}
  </StyledMeasurements>
)
