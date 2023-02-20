import React from 'react'

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
        <XAxis name="Tempo" dataKey="time" label={{ value: 'Tempo (s)' }} />
        <YAxis label={{ value: 'Corrente (A)', angle: '-90' }} />
        <Tooltip
          formatter={value => [`${value} A`, 'Corrente']}
          labelFormatter={time =>
            time === Infinity
              ? `A corrente se manterá nesse valor\n indefinidamente após ${
                  data.at(-2).time
                } segundos.`
              : `Tempo: ${time}s`
          }
        />
        <Line type="stepAfter" dataKey="current" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}
