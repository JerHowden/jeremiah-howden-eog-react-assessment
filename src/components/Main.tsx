import React from 'react'
import { useSubscription } from '@apollo/client'
import { GET_METRICS_LIVE, ErrorToast } from '../api'
import { useAppDispatch } from '../app/hooks'
import { push } from '../features/liveDataSlice'
import Chart from './Chart'
import SelectMetric from './SelectMetric'

const Main = () => {
  const dispatch = useAppDispatch()

  const { error } = useSubscription(GET_METRICS_LIVE, {
    onSubscriptionData: ({ subscriptionData: { data } }) => dispatch(push(data.newMeasurement)),
  })
  if (error) {
    ErrorToast(error.message)
  }

  return (
    <div>
      <Chart />
      <SelectMetric />
    </div>
  )
}

export default Main
