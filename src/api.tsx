import {
  gql,
} from '@apollo/client'
import { toast } from 'react-toastify'

export const GET_METRICS = gql`
  query GetMetrics {
    getMetrics
  }
`

export const GET_METRICS_LIVE = gql`
  subscription GetMetricsLive {
    newMeasurement {
      metric
      value
      at
      unit
    }
  }
`

export const GET_HISTORICAL_MEASUREMENTS = gql`
  query GetHistoricalMeasurements {
    getMetrics
  }
`

export const HEARTBEAT = gql`
  query Heartbeat {
    heartBeat
  }
`

export const ErrorToast = (content: string) => toast.error(content || 'Unknown Error.', {
  position: 'bottom-right',
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})
