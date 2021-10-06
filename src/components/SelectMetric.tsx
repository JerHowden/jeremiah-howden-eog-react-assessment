import React, { useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import {
  Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, CircularProgress,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useQuery } from '@apollo/client'
import { GET_METRICS, ErrorToast } from '../api'

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
  const theme = useTheme()
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const { data, loading, error } = useQuery(GET_METRICS)
  if (error) ErrorToast(error.message)

  const handleChange = (event: SelectChangeEvent<typeof selectedMetrics>) => {
    const {
      target: { value },
    } = event
    setSelectedMetrics(
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='select-multiple-metrics-label'>Chip</InputLabel>
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
            : data.getMetrics.map((metric: string) => (
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
    </Box>
  )
}
