import { Button, Grid, Typography } from '@mui/material'
import { NewDistributionForm } from 'app/pages/issuance/components/ManageDistributions/NewDistributionForm'
import React, { useState } from 'react'

export const NewDistribution = () => {
  const [showForm, setShowForm] = useState(false)

  const displayForm = () => {
    setShowForm(true)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>New Distribution</Typography>
      </Grid>
      <Grid item xs={12}>
        {showForm ? (
          <NewDistributionForm />
        ) : (
          <Button color='primary' variant='contained' onClick={displayForm}>
            create new distribution
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
