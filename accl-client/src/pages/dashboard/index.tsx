import React, { useMemo } from 'react'

import { Page } from 'src/blocks'
import { useMetrics } from 'src/hooks'
import styled from 'styled-components'

import { ControllerForm } from './components/controller-form'
import { Measurements } from './components/measurements/Measurements'
import { formatMeasurements } from './functions'

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
      min-width: 10rem;

      > div {
        height: 96vh;
        overflow-y: auto;
      }
    }
  }
`

export const Dashboard = () => {
  const { currentMetrics } = useMetrics()

  const measurementsData = useMemo(
    () => formatMeasurements(currentMetrics),
    [currentMetrics],
  )

  return (
    <StyledDashboard>
      <section className="left">
        <ControllerForm />
      </section>
      <section className="right">
        <div>
          <Measurements data={measurementsData} />
        </div>
      </section>
    </StyledDashboard>
  )
}
