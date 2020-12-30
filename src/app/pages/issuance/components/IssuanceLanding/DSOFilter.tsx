import React from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { Box, Typography } from '@material-ui/core'
import { NoDeals } from 'app/pages/issuance/components/IssuanceLanding/NoDeals'
import { VSpacer } from 'components/VSpacer'
import { useDSOFilter } from 'app/pages/issuance/hooks/useDSOFilter'

export const DSOFilter = () => {
  const { data, isLoading, selected, handleChange } = useDSOFilter()

  if (isLoading) {
    return null
  }

  if (data.list.length === 0) {
    return <NoDeals />
  }

  return (
    <Box py={3}>
      <Typography variant='h5'>My DSO(s)</Typography>
      <VSpacer size='small' />
      <DSOSelect
        fullWidth
        value={selected}
        options={data.list}
        onChange={handleChange}
      />
    </Box>
  )
}
