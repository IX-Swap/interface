import React from 'react'
import { Box, Grid } from '@mui/material'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { DigitalSecurityOffering } from 'types/dso'
import { Maybe } from 'types/util'
import { LabelledValue } from 'components/LabelledValue'
import { ListingScrollGuide } from 'app/pages/exchange/components/ListingForm/ListingScrollGuide'
import { Listing } from 'app/pages/exchange/types/listings'

export interface ListingSidebarProps {
  dso: DigitalSecurityOffering | Listing | undefined
  footer: Maybe<JSX.Element>
  isDataFromDSO: boolean
}

export const ListingSidebar = (props: ListingSidebarProps) => {
  const { dso, footer, isDataFromDSO } = props

  return (
    <Box position='sticky' top={90} marginLeft={8}>
      <Grid container direction='column' alignItems='flex-start' spacing={3}>
        <Grid item>
          <LabelledValue
            label='Status:'
            value={
              <AuthorizableStatus
                status={isDataFromDSO ? 'Draft' : dso?.status}
                compact={false}
              />
            }
            labelColor='light'
          />
        </Grid>

        <Grid item>
          <ListingScrollGuide />
        </Grid>

        <Grid item>{footer}</Grid>
      </Grid>
    </Box>
  )
}
