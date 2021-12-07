import { Typography } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { StyledToggleButtonGroup } from 'app/pages/issuance/components/DSOFilters/StyledToggleButtonGroup'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'

export const StatusFilter = () => {
  return (
    <SearchQueryFilter name='status' defaultValue='Closed'>
      {({ value, onChange }) => {
        const handleChange = (_: any, value: string) => {
          onChange(value)
        }
        return (
          <StyledToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value='Closed'>
              <Typography variant='subtitle1'>Closed</Typography>
            </ToggleButton>
            <ToggleButton value='Open'>
              <Typography variant='subtitle1'>Open</Typography>
            </ToggleButton>
          </StyledToggleButtonGroup>
        )
      }}
    </SearchQueryFilter>
  )
}
