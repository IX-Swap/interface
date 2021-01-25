import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { DSOScrollGuide } from 'app/components/DSO/DSOScrollGuide'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { DigitalSecurityOffering } from 'types/dso'
import { Maybe } from 'types/util'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOSidebarProps {
  dso: DigitalSecurityOffering | undefined
  footer: Maybe<JSX.Element>
}

export const DSOSidebar = (props: DSOSidebarProps) => {
  const { dso, footer } = props

  return (
    <Box position='sticky' top={90} marginLeft={8}>
      <Grid container direction='column' alignItems='flex-start' spacing={3}>
        <Grid item>
          <LabelledValue
            label='Status:'
            value={<AuthorizableStatus status={dso?.status} compact={false} />}
            labelColor='light'
          />
        </Grid>

        <Grid item>
          <DSOScrollGuide />
        </Grid>

        <Grid item>{footer}</Grid>
      </Grid>
    </Box>
  )
}
