import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { DSONameAndStructure } from 'app/pages/invest/components/DSOTable/DSONameAndStructure'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { useParams } from 'react-router-dom'

export const DSOInfo = () => {
  const params = useParams<{ dsoId: string }>()
  const { data } = useDSOById(params.dsoId)

  if (data === undefined) {
    return null
  }

  return (
    <Grid container justify='center' direction='column' alignItems='center'>
      <AuthorizableStatus status={data.status} compact={false} />
      <Box py={2.25} />
      <DSONameAndStructure dso={data} tokenName={data.tokenName} />
    </Grid>
  )
}
