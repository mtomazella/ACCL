import React, { useCallback, useMemo } from 'react'

import { cloneDeep } from 'lodash'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { RoutineInterpolation } from 'src/hooks'

export const Chart: React.FC<{
  data: { time: number; current: number }[]
  interpolation: RoutineInterpolation
  loop: boolean
}> = ({ data, interpolation, loop }) => {
  const maxCurrent = useMemo(
    () => data.reduce((max, e) => (e.current > max ? e.current : max), 0),
    [data],
  )

  const formattedData = useMemo(() => {
    const points = cloneDeep(data) as {
      time: number
      current: number
    }[]
    points.push(
      !loop
        ? {
            time: Infinity,
            current: data.at(-1).current ?? 0,
          }
        : {
            time: Infinity,
            current: data.at(0).current ?? 0,
          },
    )
    return points
  }, [data, loop])

  const labelFormatter = useCallback(
    (time: number) =>
      time === Infinity
        ? !loop
          ? `A corrente se manterá nesse valor indefinidamente após ${
              data.at(-2).time
            } segundos.`
          : `A corrente retorna para o valor definido em 0`
        : `Tempo: ${time}s`,
    [loop],
  )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 30,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          name="Tempo"
          dataKey="time"
          label={{ value: 'Tempo (s)' }}
          tickFormatter={value =>
            value === Infinity ? (loop ? '0' : '∞') : value
          }
        />
        <YAxis
          label={{ value: 'Corrente (A)', angle: '-90' }}
          domain={[0, maxCurrent]}
        />
        <Tooltip
          formatter={value => [`${value} A`, 'Corrente']}
          labelFormatter={labelFormatter}
        />
        <Line type={interpolation} dataKey="current" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
