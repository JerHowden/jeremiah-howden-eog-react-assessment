import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface NewMeasurement {
  metric: 'oilTemp' | 'waterTemp' | 'injValveOpen' | 'flareTemp' | 'tubingPressure' | 'casingPressure',
  at: number,
  value: number,
  unit: string
}

interface MeasurementsAtTime {
  [key: string]: number
}

interface Measurements {
  [key: string | number]: MeasurementsAtTime
}

interface Units {
  [key: string]: string
}

// Define a type for the slice state
interface LiveDataState {
  measurements: Measurements,
  latest: MeasurementsAtTime,
  units: Units,
}

// Define the initial state using that type
const initialState: LiveDataState = {
  measurements: {},
  latest: {},
  units: {},
}

export const liveDataSlice = createSlice({
  name: 'liveData',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<NewMeasurement>) => {
      state.latest[action.payload.metric] = action.payload.value
      if (state.measurements[action.payload.at]) {
        state.measurements[action.payload.at][action.payload.metric] = action.payload.value
      } else {
        state.measurements[action.payload.at] = { [action.payload.metric]: action.payload.value }
      }
      if (!state.units[action.payload.metric]) {
        state.units[action.payload.metric] = action.payload.unit
      }
    },
  },
})

export const {
  push,
} = liveDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const liveData = (state: RootState) => state.liveData

export default liveDataSlice.reducer
