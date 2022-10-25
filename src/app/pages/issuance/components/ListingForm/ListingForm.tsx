import React, { useEffect, useState } from 'react'
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
  listingType: null | ListingType | any
}

export const ListingForm = (props: ListingFormProps) => {
  const { data, isNew = false, listingType } = props
  const isLive = isDSOLive(data as any)
  const isDataFromDSO = data !== undefined && !('maximumTradeUnits' in data)
  const [listingTypeUpdated, setListingTypeUpdated] = useState('')

  useEffect(() => {
    switch (data?.listingType) {
      case 'Exchange':
        setListingTypeUpdated('Secondary')
        break
      case 'OTC':
        setListingTypeUpdated('Otc')
        break
      case 'Exchange/OTC':
        setListingTypeUpdated('Both')
        break
    }
  }, [data?.listingType])

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
              listingType={
                listingType === '' ? listingTypeUpdated : listingType
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}
