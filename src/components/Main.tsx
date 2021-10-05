import React from 'react';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import getMetrics from '../Features/Metrics/getMetrics';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles()

  // const metrics = getMetrics()
  // console.log('metrics:', metrics)

  return (
    <div className={classes.grow}>
      <div />
    </div>
  );
};
