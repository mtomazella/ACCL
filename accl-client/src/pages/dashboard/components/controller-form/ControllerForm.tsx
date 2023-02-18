import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { isEqual } from 'lodash'
import styled from 'styled-components'

const StyledControllerForm = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;

  > section.plot {
    height: 50%;
    width: 100%;
    border: 1px #e0e0e0 solid;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }

  > section.form {
    > div.MuiTableContainer-root {
      border-top: none;
      border-radius: 0 0 4px 4px;

      table {
        th {
          font-weight: 900;
        }

        td.align-top {
          vertical-align: top;
        }

        div.MuiTextField-root {
          width: 100%;
        }
      }
    }
  }
`

type Form = {
  newTime: number | undefined
  newCurrent: number | undefined
  controlPoints: { time: number; current: number }[]
}

export const ControllerForm: React.FC = () => {
  const {
    control,
    formState: { errors: formErrors },
    resetField,
    setFocus,
    getValues,
    setValue,
    watch,
    register,
    setError,
    clearErrors,
  } = useForm<Form>()
  const {
    fields: controlPoints,
    append: appendControlPoint,
    remove: removeControlPoint,
    update: updateControlPoint,
  } = useFieldArray({
    name: 'controlPoints',
    control,
  })
  const controlPointsWatcher = watch('controlPoints')

  useEffect(() => {
    const points = getValues('controlPoints')
    const newPoints = [...points].sort((p1, p2) => p1.time - p2.time)

    if (!isEqual(points, newPoints))
      setValue(
        'controlPoints',
        getValues('controlPoints').sort((p1, p2) => p1.time - p2.time),
      )
  }, [controlPointsWatcher])

  const addNewControlPoint = () => {
    clearErrors()

    const time = getValues('newTime')
    const current = getValues('newCurrent')

    const errorOptions = {
      error: { message: 'Campo obrigatório', type: 'required' },
      options: { shouldFocus: true },
    }
    if (!time) {
      setError(
        'newTime',
        { ...errorOptions.error, message: 'Defina o tempo em segundos' },
        errorOptions.options,
      )
      return
    }
    if (!current) {
      setError(
        'newCurrent',
        {
          ...errorOptions.error,
          message: 'Defina a corrente que a carga deve manter',
        },
        errorOptions.options,
      )
      return
    }

    const indexOfExitingPoint = getValues('controlPoints').findIndex(
      point => point.time === time,
    )

    if (indexOfExitingPoint !== -1)
      updateControlPoint(indexOfExitingPoint, { time, current })
    else appendControlPoint({ time, current })

    resetField('newTime')
    resetField('newCurrent')
    setFocus('newTime')
  }

  const handleFieldKeyDown = ({ key, ...event }) => {
    console.log(event)
    if (key === 'Enter') addNewControlPoint()
  }

  return (
    <StyledControllerForm>
      <section className="plot"></section>
      <section className="form">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Points">
            <TableHead>
              <TableRow>
                <TableCell>Tempo (s)</TableCell>
                <TableCell>Corrente (A)</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="addRow">
                <TableCell className="align-top">
                  <TextField
                    type="number"
                    onKeyDown={handleFieldKeyDown}
                    error={!!formErrors?.newTime}
                    helperText={formErrors?.newTime?.message}
                    {...register('newTime')}
                  />
                </TableCell>
                <TableCell className="align-top">
                  <TextField
                    type="number"
                    onKeyDown={handleFieldKeyDown}
                    error={!!formErrors?.newCurrent}
                    helperText={formErrors?.newCurrent?.message}
                    {...register('newCurrent')}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={addNewControlPoint}>
                    <FontAwesomeIcon icon={faAdd} />
                  </IconButton>
                </TableCell>
              </TableRow>

              {controlPoints.map(({ time, current }, index) => (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                  <TableCell>{current}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <FontAwesomeIcon
                        icon={faRemove}
                        onClick={() => removeControlPoint(index)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </StyledControllerForm>
  )
}
