import {
  useSubscription,
  gql,
} from '@apollo/client'

const subscription = gql`
  subscription GetMetricsLive {
    newMeasurement {
      metric
      value
      at
      unit
    }
  }
`

type Metric = {
  metric: string,
  value: number,
  at: number,
  unit: string,
}

type NewMeasurement = {
  newMeasurement: Metric,
}

type MetricLiveData = {
  data: NewMeasurement,
  loading: boolean,
}

export default function getMetricsLive(): MetricLiveData {
  const { data, loading } = useSubscription(subscription)
  return { data, loading }
}
