import React from 'react'
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { useAppSelector } from '../app/hooks'

export default function Chart() {
  const liveData = useAppSelector(state => state.liveData)
  // console.log(liveData)

  return (
    <div style={{ height: '80vh', padding: '16px' }}>
      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          data={
            Object.entries(liveData.measurements)
              .map(measurement => ({ at: parseInt(measurement[0], 10), ...measurement[1] }))
          }
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3' />
          <XAxis dataKey='at' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='oilTemp' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
