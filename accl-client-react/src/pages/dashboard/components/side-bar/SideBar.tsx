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
  StyledPanel,
  StyledSideBar,
} from './SideBar.styled'

export type MeasurementObject = {
  label: string
  value: string
  unit: string
  icon: IconProp
}

type ButtonKey = 'upload' | 'save' | 'archive' | 'config'

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

export const SideBar: React.FC<{
  metrics: MeasurementObject[]
  buttonHandlers: Partial<
    Record<
      ButtonKey,
      {
        onClick?: () => void
      }
    >
  >
}> = ({ metrics, buttonHandlers }) => (
  <StyledSideBar>
    <StyledPanel>
      <Tooltip title="Enviar para a carga">
        <IconButton onClick={buttonHandlers.upload?.onClick}>
          <FontAwesomeIcon icon={faArrowRight} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Salvar configurações">
        <IconButton onClick={buttonHandlers.save?.onClick}>
          <FontAwesomeIcon icon={faSave} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ver configurações salvas">
        <IconButton onClick={buttonHandlers.archive?.onClick}>
          <FontAwesomeIcon icon={faBoxArchive} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Configurações da aplicação">
        <IconButton onClick={buttonHandlers.config?.onClick}>
          <FontAwesomeIcon icon={faGear} />
        </IconButton>
      </Tooltip>
    </StyledPanel>

    {metrics.map(measurement => (
      <MeasurementPanel {...measurement} key={measurement.label} />
    ))}
  </StyledSideBar>
)
