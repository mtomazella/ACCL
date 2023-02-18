import React from 'react'

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
      width: 80%;
    }

    &.right {
      width: 20%;
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
            { label: 'Corrente', value: '1.2', unit: 'A', color: 'red' },
            { label: 'Tensão', value: '12', unit: 'V', color: 'blue' },
            { label: 'Potência', value: '144', unit: 'W', color: 'purple' },
          ]}
        />
      </section>
    </StyledDashboard>
  )
}
