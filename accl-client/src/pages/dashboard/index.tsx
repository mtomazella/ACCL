import React from 'react'
import { Line } from 'react-chartjs-2'

import { Page } from 'src/blocks'
import styled from 'styled-components'

const StyledDashboard = styled(Page)``

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1,
    },
  ],
}

export const Dashboard = () => {
  return (
    <StyledDashboard>
      <Line data={data} />
    </StyledDashboard>
  )
}
