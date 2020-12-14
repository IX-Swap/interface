import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSONameAndStructure'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

export const DSOInfo = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId)

  if (data === undefined) {
    return null
  }

  return (
    <Grid container justify='center' direction='column' alignItems='center'>
      <AuthorizableStatus status={data.status} compact={false} />
      <Box py={2.25} />
      <DSONameAndStructure dso={data} corporate={data.corporate} />
    </Grid>
  )
}
