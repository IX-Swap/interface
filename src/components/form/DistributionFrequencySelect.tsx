import React from 'react'
import { MenuItem, Select } from '@mui/material'

export const DistributionFrequencySelect = (props: any) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Distribution Frequency
      </MenuItem>
      <MenuItem value='Not Applicable'>Not Applicable</MenuItem>
      <MenuItem value='Monthly'>Monthly</MenuItem>
      <MenuItem value='Quarterly'>Quarterly</MenuItem>
      <MenuItem value='Semi-Annually'>Semi-Annually</MenuItem>
      <MenuItem value='Annually'>Annually</MenuItem>
    </Select>
  )
}
