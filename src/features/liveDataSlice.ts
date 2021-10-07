import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface NewMeasurement {
  metric: 'oilTemp' | 'waterTemp' | 'injValveOpen' | 'flareTemp' | 'tubingPressure' | 'casingPressure',
  at: number,
  value: number,
  unit: string
}

// Define a type for the slice state
interface LiveDataState {
  oilTemp: NewMeasurement[],
  waterTemp: NewMeasurement[],
  injValveOpen: NewMeasurement[],
  flareTemp: NewMeasurement[],
  tubingPressure: NewMeasurement[],
  casingPressure: NewMeasurement[],
}

// jer: is it better to shape the slice this way to future-proof new metrics by adding dynamically?
//      or is that too costly performant-wise?
/*
  interface LiveDataState2 {
    metrics: {
      oilTemp: [],
      waterTemp: [],
      etc...
    }
  }
*/

// Define the initial state using that type
const initialState: LiveDataState = {
  oilTemp: [],
  waterTemp: [],
  injValveOpen: [],
  flareTemp: [],
  tubingPressure: [],
  casingPressure: [],
}

export const liveDataSlice = createSlice({
  name: 'liveData',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<NewMeasurement>) => {
      state[action.payload.metric].push(action.payload)
    },
  },
})

export const {
  push,
} = liveDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const liveData = (state: RootState) => state.liveData

export default liveDataSlice.reducer
