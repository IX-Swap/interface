import { Grid, Divider } from '@mui/material'
import { Conditions } from 'auth/pages/register/components/SingPass/SingPassDialog/Conditions'
import { DialogHeader } from 'auth/pages/register/components/SingPass/SingPassDialog/DialogHeader'
import { Note } from 'auth/pages/register/components/SingPass/SingPassDialog/Note'
import { RetrieveButton } from 'auth/pages/register/components/SingPass/SingPassDialog/RetrieveButton'
import React from 'react'

export const SingPassNotice = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <DialogHeader />
      </Grid>
      <Grid item xs={12}>
        <Divider
          sx={{
            borderColor: '#A5B5D7'
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Note />
      </Grid>
      <Grid item xs={12}>
        <Divider
          sx={{
            borderColor: '#A5B5D7'
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <RetrieveButton />
      </Grid>
      <Grid item xs={12}>
        <Conditions />
      </Grid>
    </Grid>
  )
}
