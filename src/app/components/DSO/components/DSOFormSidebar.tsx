import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { DSOFormGuide } from 'app/components/DSO/DSOFormGuide'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOFormActions } from 'app/components/DSO/components/DSOFormActions'

export interface DSOFormSidebarProps {
  dso: DigitalSecurityOffering | undefined
  togglePreviewMode: () => void
  isPreviewMode: boolean
  isNew: boolean
  showActions?: boolean
}

export const DSOFormSidebar = (props: DSOFormSidebarProps) => {
  const {
    dso,
    isPreviewMode,
    togglePreviewMode,
    isNew,
    showActions = true
  } = props

  return (
    <Box position='sticky' top={90} marginLeft={8}>
      <Grid container direction='column' alignItems='flex-start' spacing={3}>
        <Grid item>
          <Typography>Status:</Typography>
          <AuthorizableStatus status={dso?.status} compact={false} />
        </Grid>

        <Grid item>
          <DSOFormGuide title='Progress' />
        </Grid>

        {showActions && (
          <Grid item>
            <DSOFormActions
              dso={dso}
              isNew={isNew}
              togglePreviewMode={togglePreviewMode}
              isPreviewMode={isPreviewMode}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
