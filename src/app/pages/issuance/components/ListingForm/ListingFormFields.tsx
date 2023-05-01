import React from 'react'
import { ListingMarketInfo } from 'app/pages/issuance/components/ListingForm/ListingMarketInfo'
import { ListingBaseFields } from 'app/pages/issuance/components/ListingForm/ListingBaseFields'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { Grid } from '@mui/material'

export interface ListingFormFieldsProps {
  isNew: boolean
  isLive: boolean
  isDataFromDSO: boolean
  status?: string
  data?: any
}

export const ListingFormFields = (props: ListingFormFieldsProps) => {
  const { isNew, isLive, isDataFromDSO, status, data } = props

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
          <ListingMarketInfo status={status} isNew={isNew} data={data} />
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
