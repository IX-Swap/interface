import React from 'react'
import { DSOSelect } from './DSOSelect'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { Box, Typography } from '@material-ui/core'
import { hasValue } from 'helpers/forms'

export const DSOFilter = () => {
  const {
    replace,
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOsByUserId()

  if (!isSuccess || data.list.length === 0) {
    return null
  }

  const handleChange = (e: any) => {
    replace('insight', { dsoId: e.target.value })
  }

  if (!hasValue(dsoId)) {
    handleChange({ target: { value: data.list[0]._id } })
  }

  return (
    <Box py={3}>
      <Typography variant='h5'>My DSO(s)</Typography>
      <DSOSelect fullWidth onChange={handleChange} />
    </Box>
  )
}
