import React, { useMemo } from 'react'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const Chart: React.FC<{
  data: { time: number; current: number }[]
}> = ({ data }) => {
  const maxCurrent = useMemo(
    () => data.reduce((max, e) => (e.current > max ? e.current : max), 0),
    [data],
  )

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
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
          tickFormatter={value => (value === Infinity ? '∞' : value)}
        />
        <YAxis
          label={{ value: 'Corrente (A)', angle: '-90' }}
          domain={[0, maxCurrent]}
        />
        <Tooltip
          formatter={value => [`${value} A`, 'Corrente']}
          labelFormatter={time =>
            time === Infinity
              ? `A corrente se manterá nesse valor indefinidamente após ${
                  data.at(-2).time
                } segundos.`
              : `Tempo: ${time}s`
          }
        />
        <Line type="linear" dataKey="current" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
