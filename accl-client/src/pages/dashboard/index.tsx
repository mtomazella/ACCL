import React, { useMemo } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faBattery,
  faBolt,
  faCrosshairs,
  faFan,
  faPlug,
  faTemperature3,
} from '@fortawesome/free-solid-svg-icons'
import { Page } from 'src/blocks'
import { Metrics, MetricsField, MetricsFieldData, useMetrics } from 'src/hooks'
import styled from 'styled-components'

import { ControllerForm } from './components/controller-form'
import { Measurements } from './components/Measurements'

const StyledDashboard = styled(Page)`
  display: flex;
  flex-direction: row;
  width: 100vw;

  > section {
    height: 100%;

    &.left {
      flex: 1;
    }

    &.right {
      width: fit-content;
    }
  }
`

export const Dashboard = () => {
  const { currentMetrics } = useMetrics()

  const measurementsData = useMemo(() => {
    const infoToAddAndOrder: Record<MetricsField, object> = {
      tension: {
        icon: faBolt,
      },
      actual_current: {
        icon: faBattery,
      },
      target_current: {
        icon: faCrosshairs,
      },
      power: {
        icon: faPlug,
      },
      temperature: {
        icon: faTemperature3,
      },
      fan_percentage: {
        icon: faFan,
      },
    }
    const result = {}
    Object.keys(infoToAddAndOrder).forEach(field => {
      if (!currentMetrics[field]) return
      result[field] = { ...currentMetrics[field], ...infoToAddAndOrder[field] }
    })
    return Object.values(result) as (MetricsFieldData & { icon: IconProp })[]
  }, [currentMetrics])

  return (
    <StyledDashboard>
      <section className="left">
        <ControllerForm />
      </section>
      <section className="right">
        <Measurements data={measurementsData} />
      </section>
    </StyledDashboard>
  )
}
