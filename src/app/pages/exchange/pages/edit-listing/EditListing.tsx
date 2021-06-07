import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@material-ui/core'
import { ListingForm } from 'app/pages/exchange/components/ListingForm/ListingForm'
import { useParams } from 'react-router-dom'
import { useListingById } from 'app/pages/exchange/hooks/useListingById'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const EditListing = () => {
  const { listingId, issuerId } = useParams<{
    listingId: string
    issuerId: string
  }>()

  const { data, isLoading } = useListingById(listingId, issuerId)

  return (
    <RootContainer>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader
            title={'Edit Listing'}
            alignment='flex-start'
            showBreadcrumbs={true}
          />
        </Grid>
        <Grid item>
          {isLoading ? <LoadingIndicator /> : <ListingForm data={data} />}
        </Grid>
      </Grid>
    </RootContainer>
  )
}
