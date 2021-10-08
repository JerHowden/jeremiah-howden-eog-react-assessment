import React from 'react'
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { deselect } from '../features/selectedMetricsSlice'

interface ColorTypes {
  [key: string]: string
}

export default function Chart() {
  const dispatch = useAppDispatch()
  const liveData = useAppSelector(state => state.liveData)
  const selectedMetrics = useAppSelector(state => state.selectedMetrics.value)
  const colors: ColorTypes = {
    oilTemp: '#070707',
    waterTemp: '#3454D1',
    injValveOpen: '#DD1C1A',
    flareTemp: '#008F58',
    tubingPressure: '#5E239D',
    casingPressure: '#FFA114',
  }
  // console.log(liveData)

  return (
    <div style={{ height: '80vh', padding: '16px', fontSize: '0.75em' }}>
      <ResponsiveContainer>
        <LineChart
          width={730}
          height={250}
          data={
            Object.entries(liveData.measurements)
              .map(measurement => ({ at: parseInt(measurement[0], 10), ...measurement[1] }))
          }
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='at'
            minTickGap={40}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.toLocaleTimeString()}`
            }}
          />
          { Object.values(liveData.units)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(unit => (
              <YAxis
                yAxisId={unit}
                unit={unit}
                tickCount={6}
                hide={!selectedMetrics.some(metric => liveData.units[metric] === unit)}
              />
            ))}
          <Tooltip
            labelFormatter={(value: number) => (new Date(value).toLocaleTimeString())}
            labelStyle={{ fontWeight: 400, fontSize: '1.75em', borderBottom: '1px solid #ccc' }}
            contentStyle={{ borderColor: '#ccc', backgroundColor: 'rgba(236, 241, 248, 0.95)' }}
            wrapperStyle={{ display: 'flex' }}
            itemStyle={{ fontWeight: 300, fontSize: '1.25em' }}
            animationDuration={0}
            offset={0}
            separator=': '
          />
          <Legend
            content={(props) => {
              let { payload } = props
              if (!payload) payload = []
              return (
                <div
                  style={{
                    display: 'flex', justifyContent: 'center', gap: 16,
                  }}
                >
                  {
                    payload.map((entry) => (
                      <button
                        key={`metric-${entry.value}`}
                        type='button'
                        title={`Deselect ${entry.value}`}
                        style={{
                          color: 'white', fontSize: '1.5em', padding: 10, backgroundColor: entry.color, borderRadius: 4, border: 'none', cursor: 'pointer',
                        }}
                        onClick={() => dispatch(deselect(entry.value))}
                      >
                        <span>{liveData.latest[entry.value].toFixed(2)}</span>
                        <span style={{ fontSize: '0.8em', fontWeight: 300, marginLeft: 2 }}>{liveData.units[entry.value]}</span>
                      </button>
                    ))
                  }
                </div>
              )
            }}
          />
          { selectedMetrics.map((metric) => (
            <Line key={metric} type='monotone' dataKey={metric} stroke={colors[metric]} strokeWidth={1} yAxisId={liveData.units[metric]} activeDot={false} />
          )) }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
