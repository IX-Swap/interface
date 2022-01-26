import { Box, Grid } from '@material-ui/core'
import { DSOScrollGuide } from 'app/components/DSO/DSOScrollGuide'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { LabelledValue } from 'components/LabelledValue'
import { isNonEmptyArray } from 'helpers/arrays'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Maybe } from 'types/util'

export interface DSOSidebarProps {
  dso: DigitalSecurityOffering | undefined
  footer: Maybe<JSX.Element>
  isNew?: boolean
}

export const DSOSidebar = (props: DSOSidebarProps) => {
  const { dso, footer, isNew = false } = props

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

        <Grid item data-testid='progress-section'>
          <DSOScrollGuide
            hasVideo={isNonEmptyArray(dso?.videos) || isNew}
            hasFAQ={isNonEmptyArray(dso?.faqs) || isNew}
          />
        </Grid>

        <Grid item>{footer}</Grid>
      </Grid>
    </Box>
  )
}
