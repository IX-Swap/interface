import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { SecondaryListingsTable } from 'app/pages/issuance/components/SecondaryListingsTable/SecondaryListingsTable'
import { Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { AddListingButton } from 'app/pages/issuance/components/SecondaryListingsTable/AddListingButton'

export const SecondaryListings = () => {
  return (
    <Grid container style={{ display: 'table' }}>
      <PageHeader
        title={'Secondary Listings'}
        mainWrapperSX={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'initial', md: 'normal' }
        }}
        endComponent={
          <Grid container spacing={2} wrap={'nowrap'}>
            <Grid item minWidth={320} width={'100%'}>
              <TextInputSearchFilter
                fullWidth
                placeholder='Search'
                inputAdornmentPosition='start'
                sx={{ height: 50 }}
              />
            </Grid>
            <Grid item width={'100%'}>
              <AddListingButton />
            </Grid>
          </Grid>
        }
      />
      <RootContainer>
        <SecondaryListingsTable />
      </RootContainer>
    </Grid>
  )
}
