import React from 'react';
// import Typography from '@mui/material/Typography'
import getMetrics from '../Features/Metrics/getMetrics'

export default () => {
  const metrics = getMetrics()
  console.log('metrics:', metrics)

  return (
    <div>
      <div />
    </div>
  );
};
