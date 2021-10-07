import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface SelectedMetricsState {
  value: string[]
}

// Define the initial state using that type
const initialState: SelectedMetricsState = {
  value: [],
}

export const selectedMetricsSlice = createSlice({
  name: 'selectedMetrics',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    select: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload)
    },
    deselect: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.value.length; i += 1) {
        if (state.value[i] === action.payload) {
          state.value.splice(i, 1)
          break
        }
      }
    },
    selectAll: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    clear: (state) => {
      state.value = []
    },
  },
})

export const {
  select, deselect, selectAll, clear,
} = selectedMetricsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedMetrics = (state: RootState) => state.selectedMetrics.value

export default selectedMetricsSlice.reducer
