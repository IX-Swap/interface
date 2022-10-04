import { Grid } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'
import { useListingById } from 'app/pages/issuance/hooks/useListingById'
import React from 'react'
import { useParams } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'

export const EditListing = () => {
  const { listingId, issuerId, UserId, OTCListingId } = useParams<{
    listingId: string
    issuerId: string
    UserId: string
    OTCListingId: string
  }>()

  const { data, isLoading } = useListingById(
    listingId,
    issuerId,
    UserId,
    OTCListingId
  )

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
