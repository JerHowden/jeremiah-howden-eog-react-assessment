import React from 'react';
// import Typography from '@mui/material/Typography'
import { useSubscription } from '@apollo/client'
import { GET_METRICS_LIVE, ErrorToast } from '../api'
import SelectMetric from './SelectMetric'

export default () => {
  const { data, loading, error } = useSubscription(GET_METRICS_LIVE)
  if (error) {
    ErrorToast(error.message)
  } else {
    console.log(data, loading)
  }

  return (
    <div>
      <div />
      <SelectMetric />
    </div>
  )
}
