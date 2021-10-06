import {
  gql,
  useQuery,
} from '@apollo/client'

const subscription = gql`
  query GetHistoricalMeasurements {
    
  }
`

type Metrics = {
  getMetrics: string[]
}

type MetricData = {
  data: Metrics,
  loading: boolean,
}

export default function getMetrics(): MetricData {
  const { data, loading } = useQuery(subscription)
  return { data, loading }
}
