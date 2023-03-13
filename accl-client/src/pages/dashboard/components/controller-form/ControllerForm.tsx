import React, { useEffect, useMemo } from 'react'
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
  Tooltip,
} from '@mui/material'
import { cloneDeep, isEqual } from 'lodash'
import { Routine } from 'src/hooks'

import { Chart } from '../chart'

import { StyledControllerForm } from './ControllerForm.styled'

type Form = {
  newTime: string | undefined
  newCurrent: string | undefined
  controlPoints: { time: number; current: number }[]
}

export const ControllerForm: React.FC<{
  exportData: (routine: Routine) => void
  data: Routine
}> = ({ data, exportData }) => {
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
  } = useForm<Form>({
    defaultValues: {
      controlPoints: [
        { time: 0, current: 0 },
        { time: Infinity, current: 0 },
      ],
    },
  })
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
    const newPoints = cloneDeep(points).sort((p1, p2) => p1.time - p2.time)

    if (!isEqual(points, newPoints)) setValue('controlPoints', newPoints)
  }, [controlPointsWatcher])

  useEffect(() => {
    const newRoutine: Routine = {
      name: undefined,
      curveType: 'linear',
      loop: false,
      points: controlPoints,
    }
    if (!isEqual(data, newRoutine)) {
      exportData(newRoutine)
    }
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
      point => point.time.toString() === time.toString(),
    )

    if (indexOfExitingPoint !== -1)
      updateControlPoint(indexOfExitingPoint, {
        time: +time,
        current: +current,
      })
    else appendControlPoint({ time: +time, current: +current })

    resetField('newTime')
    resetField('newCurrent')
    setFocus('newTime')
  }

  const handleFieldKeyDown = ({ key }) => {
    if (key === 'Enter') addNewControlPoint()
  }

  const graphPoints = useMemo(() => {
    const points = cloneDeep(controlPoints) as {
      time: number
      current: number
    }[]
    points.push({
      time: Infinity,
      current: controlPoints.at(-1).current ?? 0,
    })
    return points
  }, [controlPoints])

  return (
    <StyledControllerForm>
      <section className="plot">
        <Chart data={graphPoints ?? []} />
      </section>
      <section className="form">
        <TableContainer component={Paper}>
          <Table aria-label="Points">
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
                  <Tooltip
                    title={
                      <>
                        <h3>
                          <b>Insira o tempo em segundos.</b>
                        </h3>
                        <h4>
                          É possível editar um ponto inserindo outro com o mesmo
                          valor de tempo.
                        </h4>
                      </>
                    }
                    enterDelay={1000}
                    placement="top"
                    arrow
                  >
                    <TextField
                      type="number"
                      onKeyDown={handleFieldKeyDown}
                      error={!!formErrors?.newTime}
                      helperText={formErrors?.newTime?.message}
                      {...register('newTime')}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell className="align-top">
                  <Tooltip
                    title={
                      <>
                        <h3>
                          <b>Insira a corrente esperada em amperes.</b>
                        </h3>
                      </>
                    }
                    enterDelay={1000}
                    placement="top"
                    arrow
                  >
                    <TextField
                      type="number"
                      onKeyDown={handleFieldKeyDown}
                      error={!!formErrors?.newCurrent}
                      helperText={formErrors?.newCurrent?.message}
                      {...register('newCurrent')}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip
                    title={
                      <>
                        <h3>
                          <b>Adicionar ponto à rotina</b>
                        </h3>
                      </>
                    }
                    placement="top"
                    arrow
                  >
                    <IconButton className="add" onClick={addNewControlPoint}>
                      <FontAwesomeIcon icon={faAdd} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>

              {controlPoints.slice(0, -1).map(({ time, current }, index) => (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                  <TableCell>{current}</TableCell>
                  <TableCell align="right">
                    {time === 0 ? null : (
                      <Tooltip
                        title={
                          <>
                            <h3>
                              <b>Remover ponto da rotina</b>
                            </h3>
                          </>
                        }
                        placement="top"
                        arrow
                      >
                        <IconButton onClick={() => removeControlPoint(index)}>
                          <FontAwesomeIcon icon={faRemove} />
                        </IconButton>
                      </Tooltip>
                    )}
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
