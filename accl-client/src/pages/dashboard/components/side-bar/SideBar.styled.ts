import { Card } from '@mui/material'
import styled from 'styled-components'

export const StyledSideBar = styled.div`
  display: grid;
  grid-column: 1f;
  grid-row-gap: 1rem;
  padding: 1rem 1rem 1rem 0;
  width: 100%;
`

export const StyledPanel = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  align-items: center;
  font-family: monospace;
  color: gray;
  border: 1px solid #e0e0e0;
  font-size: 1.5rem;
  padding: 0.8rem;

  > .MuiIconButton-root {
    color: white;
    aspect-ratio: 1;
    width: fit-content;
    padding: 0.5rem;
    align-self: center;
    justify-self: center;

    &:nth-of-type(1) {
      background-color: #82d582;
    }
    &:nth-of-type(2) {
      background-color: #6363c2;
    }
    &:nth-of-type(3) {
      background-color: #bb5dbb;
    }
    &:nth-of-type(4) {
      background-color: #ffbf47;
    }
  }
`

export const StyledMeasurementPanel = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  color: gray;
  border: 1px solid #e0e0e0;
  font-size: 1.5rem;
  padding: 1rem 3rem;

  > h3 {
    font-size: 1.2rem;
    text-transform: uppercase;
    padding-top: 0.5rem;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  h1,
  h3,
  svg {
    color: gray;
  }
`
