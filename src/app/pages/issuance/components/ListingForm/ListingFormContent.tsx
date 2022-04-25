import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { isDSOLive } from 'app/components/DSO/utils'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { ListingFormFields } from 'app/pages/issuance/components/ListingForm/ListingFormFields'
import { ListingSidebar } from 'app/pages/issuance/components/ListingForm/ListingSidebar'
import { ListingFormActions } from 'app/pages/issuance/components/ListingForm/ListingFormActions'
import { Listing } from 'app/pages/issuance/types/listings'
import {
  transformDataFromDSOToListingFormValue,
  transformListingToListingFormValue
} from 'app/pages/issuance/utils/listing'

export interface ListingFormProps {
  data?: DigitalSecurityOffering | Listing
  isNew?: boolean
}

export const ListingFormContent = (props: ListingFormProps) => {
  const { data, isNew = false } = props
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
      <Grid container>
        <Grid item lg={9} container direction='column'>
          <ListingFormFields
            isNew={isNew}
            isLive={isLive}
            isDataFromDSO={isDataFromDSO}
          />
        </Grid>

        <Grid item lg={3}>
          <ListingSidebar
            dso={data}
            isDataFromDSO={isDataFromDSO}
            footer={
              <ListingFormActions
                isDataFromDSO={isDataFromDSO}
                listing={data}
              />
            }
          />
        </Grid>
      </Grid>
    </Form>
  )
}
