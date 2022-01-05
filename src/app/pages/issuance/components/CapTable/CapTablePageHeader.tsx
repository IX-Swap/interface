import { Grid, Typography } from '@material-ui/core'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { CapTableDSOFilter } from 'app/pages/issuance/components/CapTable/CapTableDSOFilter'
import React from 'react'
import { useParams } from 'react-router-dom'

export const CapTablePageHeader = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)

  return (
    <Grid container justifyContent='space-between' alignContent='center'>
      <Grid item>
        <Typography variant='h4' style={{ lineHeight: '40px' }}>
          {data?.tokenName}
        </Typography>
      </Grid>
      <Grid item>
        <CapTableDSOFilter />
      </Grid>
    </Grid>
  )
}
