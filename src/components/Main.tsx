import React from 'react';
// import Typography from '@mui/material/Typography'
import getMetrics from '../api/getMetricsLive'
import SelectMetric from './SelectMetric'

export default () => {
  const metrics = getMetrics()
  console.log('metrics:', metrics)

  return (
    <div>
      <div />
      <SelectMetric />
    </div>
  );
};
