import React from 'react'

import { faBattery, faBolt, faPlug } from '@fortawesome/free-solid-svg-icons'
import { Page } from 'src/blocks'
import styled from 'styled-components'

import { ControllerForm } from './components/controller-form'
import { Measurements } from './components/Measurements'

const StyledDashboard = styled(Page)`
  display: flex;
  flex-direction: row;

  > section {
    height: 100%;

    &.left {
      flex: 1;
    }

    &.right {
    }
  }
`

export const Dashboard = () => {
  return (
    <StyledDashboard>
      <section className="left">
        <ControllerForm />
      </section>
      <section className="right">
        <Measurements
          data={[
            {
              label: 'Tensão',
              value: '12',
              unit: 'V',
              icon: faBolt,
            },
            {
              label: 'Corrente',
              value: '1.2',
              unit: 'A',
              icon: faBattery,
            },
            {
              label: 'Potência',
              value: '144',
              unit: 'W',
              icon: faPlug,
            },
          ]}
        />
      </section>
    </StyledDashboard>
  )
}
