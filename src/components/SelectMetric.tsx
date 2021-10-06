import React, { useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import {
  Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip, CircularProgress,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import getMetrics from '../api/getMetrics'

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectMetric() {
  const theme = useTheme()
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const { data, loading } = getMetrics()

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
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedMetrics}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={() => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selectedMetrics.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {loading ? <CircularProgress /> : data.getMetrics.map((metric) => (
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
