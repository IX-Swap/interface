import { Typography } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { StyledToggleButtonGroup } from 'app/pages/issuance/components/DSOFilters/StyledToggleButtonGroup'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const StatusFilter = () => {
  const { updateFilters } = useQueryFilter()
  return (
    <SearchQueryFilter name='status' defaultValue='Open'>
      {({ value }) => {
        const handleChange = (_: any, value: string) => {
          updateFilters({ status: value, subfunds: '' })
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
