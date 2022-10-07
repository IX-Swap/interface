import React from 'react'
import { ListingMarketInfo } from 'app/pages/issuance/components/ListingForm/ListingMarketInfo'
import { ListingBaseFields } from 'app/pages/issuance/components/ListingForm/ListingBaseFields'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { Grid } from '@mui/material'

export interface ListingFormFieldsProps {
  isNew: boolean
  isLive: boolean
  isDataFromDSO: boolean
  status?: string
}

export const ListingFormFields = (props: ListingFormFieldsProps) => {
  const { isNew, isLive, isDataFromDSO, status } = props

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <FieldContainer>
          <ListingBaseFields
            isNew={isNew}
            isLive={isLive}
            isDataFromDSO={isDataFromDSO}
          />
        </FieldContainer>
      </Grid>
      <Grid item>
        <FieldContainer>
          <ListingMarketInfo status={status} />
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
