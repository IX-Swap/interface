import React, { useEffect } from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { Box, Typography } from '@material-ui/core'
import { hasValue } from 'helpers/forms'
import { NoDeals } from 'app/pages/issuance/components/IssuanceLanding/NoDeals'

export const DSOFilter = () => {
  const {
    replace,
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOsByUserId()

  useEffect(() => {
    if ((!hasValue(dsoId) || dsoId === ':dsoId') && data.list.length > 0) {
      replace('insight', { dsoId: data.list[0]._id })
    }
  }, [dsoId, data.list, replace])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      replace('insight', { dsoId: e.target.value })
    }
  }

  if (!isSuccess) {
    return null
  }

  if (data.list.length === 0) {
    return <NoDeals />
  }

  return (
    <Box py={3}>
      <Typography variant='h5'>My DSO(s)</Typography>
      <DSOSelect fullWidth onChange={handleChange} />
    </Box>
  )
}
