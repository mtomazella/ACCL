import React, { useCallback, useMemo, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import styled from 'styled-components'

import { Page } from './../../blocks/page'
import { Routine, useConfig, useMetrics, useRoutines } from './../../hooks'
import { ControllerForm } from './components/controller-form'
import { SideBar } from './components/side-bar/SideBar'
import { formatMeasurements } from './functions'

const StyledDashboard = styled(Page)`
  display: flex;
  flex-direction: row;
  background-color: white;

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
  const routineApi = useRoutines()
  const configApi = useConfig()

  const [routine, setRoutine] = useState<Routine | undefined>(undefined)

  const measurementsData = useMemo(
    () => formatMeasurements(currentMetrics),
    [currentMetrics]
  )

  const onUpload = useCallback(() => {
    routineApi.upload(routine)
  }, [routine, routineApi.upload])

  const onSave = useCallback(() => {
    routineApi.save(routine)
  }, [routine, routineApi.save])

  const onConfig = useCallback(() => {
    configApi.fetch()
  }, [configApi.fetch])

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
              config: { onClick: onConfig },
            }}
          />
        </Panel>
      </PanelGroup>
    </StyledDashboard>
  )
}
