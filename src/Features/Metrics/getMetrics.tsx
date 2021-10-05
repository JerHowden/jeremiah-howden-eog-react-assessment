import {
  useSubscription,
  gql,
} from '@apollo/client'

const subscription = gql`
  subscription GetMetrics {
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

type MetricData = {
  data: NewMeasurement,
  loading: boolean,
}

export default function getMetrics(): MetricData {
  const { data, loading } = useSubscription(subscription)
  return { data, loading }
}
