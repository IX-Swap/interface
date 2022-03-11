import React from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { Box } from '@mui/material'
import { NoDeals } from 'app/pages/issuance/components/IssuanceLanding/NoDeals'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'

export const DSOFilter = () => {
  const { data, isLoading, selected, handleChange } =
    useDSOFilter('commitments')

  if (isLoading) {
    return null
  }

  if (data.list.length === 0) {
    return <NoDeals />
  }

  return (
    <Box>
      <DSOSelect
        fullWidth
        value={selected}
        options={data.list}
        onChange={handleChange}
      />
    </Box>
  )
}
