import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { DSOFormGuide } from 'app/components/DSO/DSOFormGuide'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOFormActions } from 'app/components/DSO/components/DSOFormActions'

export interface DSOFormSidebarProps {
  dso: DigitalSecurityOffering | undefined
  isNew: boolean
}

export const DSOFormSidebar = (props: DSOFormSidebarProps) => {
  const { dso, isNew } = props

  return (
    <Box position='sticky' top={90}>
      <Grid container direction='column' alignItems='flex-start' spacing={3}>
        <Grid item>
          <Typography>Status:</Typography>
          <AuthorizableStatus status={dso?.status} compact={false} />
        </Grid>

        <Grid item>
          <DSOFormGuide title='Progress' />
        </Grid>

        <Grid item>
          <DSOFormActions isNew={isNew} />
        </Grid>
      </Grid>
    </Box>
  )
}
