import React, { useCallback, useMemo, useState } from 'react'

import { Page } from 'src/blocks'
import { Routine, useMetrics, useRoutines } from 'src/hooks'
import styled from 'styled-components'

import { ControllerForm } from './components/controller-form'
import { SideBar } from './components/side-bar/SideBar'
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
    }
  }
`

export const Dashboard = () => {
  const { currentMetrics } = useMetrics()
  const { upload } = useRoutines()

  const [routine, setRoutine] = useState<Routine | undefined>(undefined)

  const measurementsData = useMemo(
    () => formatMeasurements(currentMetrics),
    [currentMetrics],
  )

  const onUpload = useCallback(() => {
    upload(routine)
  }, [routine, upload])

  return (
    <StyledDashboard>
      <section className="left">
        <ControllerForm data={routine} exportData={setRoutine} />
      </section>
      <section className="right">
        <SideBar
          metrics={measurementsData}
          buttonHandlers={{ upload: { onClick: onUpload } }}
        />
      </section>
    </StyledDashboard>
  )
}
