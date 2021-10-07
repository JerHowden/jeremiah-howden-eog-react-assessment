import { configureStore } from '@reduxjs/toolkit'
import { selectedMetricsSlice } from '../features/selectedMetricsSlice'
import { liveDataSlice } from '../features/liveDataSlice'

export const store = configureStore({
  reducer: {
    selectedMetrics: selectedMetricsSlice.reducer,
    liveData: liveDataSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
