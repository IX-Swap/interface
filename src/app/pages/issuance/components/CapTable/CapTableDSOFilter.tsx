import React from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { Box } from '@mui/material'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'

export const CapTableDSOFilter = () => {
  const { data, isLoading, selected, handleChange } = useDSOFilter(
    'captable',
    undefined,
    'Fund'
  )

  if (isLoading) {
    return null
  }

  return (
    <Box width={250}>
      <DSOSelect
        fullWidth
        value={selected}
        options={data.list}
        onChange={handleChange}
      />
    </Box>
  )
}
