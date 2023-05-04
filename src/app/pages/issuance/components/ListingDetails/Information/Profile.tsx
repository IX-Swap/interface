import { Box, Grid } from '@mui/material'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { useStyles } from 'app/pages/issuance/components/ListingDetails/Information/Profile.style'
import React from 'react'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface ProfileProps {
  profile?: string
}

export const Profile = ({ profile }: ProfileProps) => {
  const { profileContent } = useStyles()
  if (profile === undefined || profile.trim() === '') {
    return null
  }

  return (
    <Grid container direction='column' spacing={3}>
      <FieldContainer>
        <Grid item container direction={'column'} spacing={5}>
          <Grid item>
            <FormSectionHeader title={'Information Profile'} />
          </Grid>
          <Grid item>
            <Box className={profileContent}>{renderStringToHTML(profile)}</Box>
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
