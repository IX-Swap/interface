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
import { LISTING_TYPES } from '../../consts/listing'

export interface ListingFormProps {
  data?: DigitalSecurityOffering | Listing
  isNew?: boolean
  listingType?: LISTING_TYPES
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
          ? transformListingToListingFormValue(data)
          : transformDataFromDSOToListingFormValue(data)
      }
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item>
          <ListingFormFields
            isNew={isNew}
            isLive={isLive}
            isDataFromDSO={isDataFromDSO}
            status={data?.status}
            data={data}
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