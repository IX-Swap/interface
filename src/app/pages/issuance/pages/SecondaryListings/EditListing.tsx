import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'
import { useParams } from 'react-router-dom'
import { useListingById } from 'app/pages/issuance/hooks/useListingById'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const EditListing = () => {
  const { listingId, issuerId } = useParams<{
    listingId: string
    issuerId: string
  }>()

  const { data, isLoading } = useListingById(listingId, issuerId)

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title={'Edit Listing'}
          alignment='flex-start'
          showBreadcrumbs={true}
        />
      </Grid>
      <RootContainer>
        <Grid item>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <ListingFormWrapper data={data} />
          )}
        </Grid>
      </RootContainer>
    </Grid>
  )
}
