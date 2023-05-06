import React, { useCallback, useMemo, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { Page } from 'src/blocks'
import { Routine, useConfig, useMetrics, useRoutines } from 'src/hooks'
import styled from 'styled-components'

import { ControllerForm } from './components/controller-form'
import { SideBar } from './components/side-bar/SideBar'
import { formatMeasurements } from './functions'

const StyledDashboard = styled(Page)`
  display: flex;
  flex-direction: row;
  width: 100vw;

  > div {
    > .resize {
      width: 5px;
      background-color: lightgray;
      opacity: 0;
      margin: 0 0.5rem;

      transition-duration: 0.5s;
    }
    > .resize:hover {
      opacity: 1;
    }
  }
`

export const Dashboard = () => {
  const { currentMetrics } = useMetrics()
  const { upload, save } = useRoutines()
  const { fetch } = useConfig()

  const [routine, setRoutine] = useState<Routine | undefined>(undefined)

  const measurementsData = useMemo(
    () => formatMeasurements(currentMetrics),
    [currentMetrics],
  )

  const onUpload = useCallback(() => {
    upload(routine)
  }, [routine, upload])

  const onSave = useCallback(() => {
    save(routine)
  }, [routine, save])

  return (
    <StyledDashboard>
      <PanelGroup direction="horizontal">
        <Panel>
          <ControllerForm data={routine} exportData={setRoutine} />
        </Panel>

        <PanelResizeHandle className="resize" />

        <Panel defaultSize={20}>
          <SideBar
            metrics={measurementsData}
            buttonHandlers={{
              upload: { onClick: onUpload },
              save: { onClick: onSave },
            }}
          />
        </Panel>
      </PanelGroup>
    </StyledDashboard>
  )
}
