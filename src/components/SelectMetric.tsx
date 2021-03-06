import React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import {
  Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, CircularProgress, Button,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useQuery } from '@apollo/client'
import { GET_METRICS, ErrorToast } from '../api'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectMultiple, clear } from '../features/selectedMetricsSlice'
// import { select, deselect, selectAll, clear } from '../features/selectedMetricsSlice'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, options: readonly string[], theme: Theme) {
  return {
    fontWeight:
      options.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function SelectMetric() {
  const selectedMetrics = useAppSelector((state) => state.selectedMetrics.value)
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const { data, loading, error } = useQuery(GET_METRICS)
  if (error) ErrorToast(error.message)

  const handleChange = (event: SelectChangeEvent<typeof selectedMetrics>) => {
    if (typeof event.target.value === 'object') dispatch(selectMultiple(event.target.value))
  }

  return (
    <Box
      sx={{
        display: 'flex', p: 1, gap: 1, justifyContent: 'center',
      }}
    >
      <FormControl sx={{ minWidth: '40vw' }}>
        <InputLabel id='select-multiple-metrics-label'>Metrics</InputLabel>
        <Select
          labelId='select-multiple-metrics-label'
          id='select-multiple-metrics'
          multiple
          value={selectedMetrics}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-metrics-input' label='Metrics' />}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedMetrics.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {loading
            ? (
              <Box>
                <CircularProgress />
              </Box>
            )
            : data?.getMetrics.map((metric: string) => (
              <MenuItem
                key={metric}
                value={metric}
                style={getStyles(metric, selectedMetrics, theme)}
              >
                {metric}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        variant={selectedMetrics.length === data?.getMetrics.length ? 'contained' : 'outlined'}
        style={{ boxShadow: 'none' }}
        onClick={() => {
          if (selectedMetrics.length === data?.getMetrics.length) {
            dispatch(clear())
          } else {
            dispatch(selectMultiple(data.getMetrics || []))
          }
        }}
      >
        { selectedMetrics.length === data?.getMetrics.length ? 'Clear All' : 'Select All' }
      </Button>
    </Box>
  )
}
