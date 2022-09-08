import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { isDSOLive } from 'app/components/DSO/utils'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { ListingFormFields } from 'app/pages/issuance/components/ListingForm/ListingFormFields'
import { ListingFormActions } from 'app/pages/issuance/components/ListingForm/ListingFormActions'
import { Listing } from 'app/pages/issuance/types/listings'
import {
  transformDataFromDSOToListingFormValue,
  transformListingToListingFormValue
} from 'app/pages/issuance/utils/listing'
import { ListingType } from 'app/pages/issuance/components/ListingForm/ListingDetails'

export interface ListingFormProps {
  data?: DigitalSecurityOffering | Listing
  isNew?: boolean
  listingType: null | ListingType
}

export const ListingForm = (props: ListingFormProps) => {
  const { data, isNew = false, listingType } = props
  const isLive = isDSOLive(data as any)
  const isDataFromDSO = data !== undefined && !('maximumTradeUnits' in data)

  return (
    <Form
      data-testid='listing-form'
      defaultValues={
        data !== undefined && 'maximumTradeUnits' in data
          ? // TODO Needs to refactor this function for edit listing page
            transformListingToListingFormValue(data)
          : // TODO Needs to refactor this function after completed backend api endpoint for create listing
            transformDataFromDSOToListingFormValue(data)
      }
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <ListingFormFields
            isNew={isNew}
            isLive={isLive}
            isDataFromDSO={isDataFromDSO}
          />
        </Grid>

        <Grid item container justifyContent={'flex-end'}>
          <Grid item>
            <ListingFormActions
              isDataFromDSO={isDataFromDSO}
              listing={data}
              listingType={listingType}
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}
