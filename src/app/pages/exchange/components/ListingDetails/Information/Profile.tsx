import { Box, Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { useStyles } from 'app/pages/exchange/components/ListingDetails/Information/Profile.style'
import React from 'react'

export interface ProfileProps {
  profile?: string
}

export const Profile = ({ profile }: ProfileProps) => {
  const { profileContent } = useStyles()
  if (profile === undefined || profile.trim() === '') {
    return null
  }

  return (
    <Grid item>
      <Grid direction='column' container spacing={2}>
        <Grid item>
          <FormSectionHeader title='Information Profile' />
        </Grid>
        <Grid item>
          <Box className={profileContent}>{renderStringToHTML(profile)}</Box>
        </Grid>
      </Grid>
    </Grid>
  )
}
