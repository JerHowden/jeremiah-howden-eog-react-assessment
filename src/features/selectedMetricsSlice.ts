import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface SelectedMetricsState {
  value: string[]
}

const initialState: SelectedMetricsState = {
  value: [],
}

export const selectedMetricsSlice = createSlice({
  name: 'selectedMetrics',
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
    selectMultiple: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    clear: (state) => {
      state.value = []
    },
  },
})

export const {
  select, deselect, selectMultiple, clear,
} = selectedMetricsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedMetrics = (state: RootState) => state.selectedMetrics.value

export default selectedMetricsSlice.reducer
