import React, { useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Panel, PanelResizeHandle } from 'react-resizable-panels'

import { faAdd, faRemove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { Routine, RoutineInterpolation } from 'src/hooks'

import { Chart } from '../chart'

import { StyledControllerForm } from './ControllerForm.styled'

type Form = {
  newTime: string | undefined
  newCurrent: string | undefined
  controlPoints: { time: number; current: number }[]
  curve_type: RoutineInterpolation
  loop: 'Y' | 'N'
}

export const ControllerForm: React.FC<{
  exportData: (routine: Routine) => void
  data: Routine | undefined
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
      controlPoints: [{ time: 0, current: 0 }],
      curve_type: 'linear',
      loop: 'N',
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
  const curveTypeWatcher = watch('curve_type')
  const loopWatcher = watch('loop')

  const interpolation: RoutineInterpolation = useMemo(
    () => getValues('curve_type'),
    [curveTypeWatcher]
  )

  const loop = useMemo(() => getValues('loop') === 'Y', [loopWatcher])

  useEffect(() => {
    const points = getValues('controlPoints')
    const newPoints = cloneDeep(points).sort((p1, p2) => p1.time - p2.time)

    if (!isEqual(points, newPoints)) setValue('controlPoints', newPoints)
  }, [controlPointsWatcher])

  useEffect(() => {
    const newRoutine: Routine = {
      name: undefined,
      curveType: interpolation,
      loop,
      points: controlPoints,
    }
    if (!isEqual(data, newRoutine)) {
      exportData(newRoutine)
    }
  }, [controlPointsWatcher, interpolation, loop])

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
        {
          ...errorOptions.error,
          message: 'Defina o tempo em segundos',
        },
        errorOptions.options
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
        errorOptions.options
      )
      return
    }

    const indexOfExitingPoint = getValues('controlPoints').findIndex(
      point => point.time.toString() === time.toString()
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

  const handleFieldKeyDown = ({ key }: { key: string }) => {
    if (key === 'Enter') addNewControlPoint()
  }

  return (
    <StyledControllerForm direction="vertical">
      <Panel className="plot" defaultSize={20}>
        <Chart
          data={controlPoints ?? []}
          interpolation={interpolation}
          loop={loop}
        />
      </Panel>

      <PanelResizeHandle className="resize" />

      <Panel className="form">
        <TableContainer component={Paper}>
          <Table aria-label="Points">
            <TableHead>
              <TableRow>
                <TableCell>Tempo (s)</TableCell>
                <TableCell colSpan={2}>
                  <div className="controls">
                    <label>Corrente (A)</label>
                    <div>
                      <FormControl>
                        <InputLabel>Interpolação</InputLabel>
                        <Select
                          label="Interpolação"
                          defaultValue="linear"
                          {...register('curve_type')}
                        >
                          <MenuItem value="linear">Linear</MenuItem>
                          <MenuItem value="stepAfter">Instantâneo</MenuItem>
                          <MenuItem value="monotone">Curva</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <InputLabel>Repetir</InputLabel>
                        <Select
                          label="Repetir"
                          defaultValue="N"
                          {...register('loop')}
                        >
                          <MenuItem value="Y">Sim</MenuItem>
                          <MenuItem value="N">Não</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </TableCell>
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
                      <h3>
                        <b>Adicionar ponto à rotina</b>
                      </h3>
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

              {controlPoints.map(({ time, current }, index) => (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                  <TableCell>{current}</TableCell>
                  <TableCell align="right">
                    {time === 0 ? null : (
                      <Tooltip
                        title={
                          <h3>
                            <b>Remover ponto da rotina</b>
                          </h3>
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
      </Panel>
    </StyledControllerForm>
  )
}
