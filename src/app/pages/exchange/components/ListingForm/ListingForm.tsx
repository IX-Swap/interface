import React, { useState } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { ListingRadioButtons } from 'app/pages/exchange/components/ListingForm/ListingRadioButtons'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { ListingFormContent } from 'app/pages/exchange/components/ListingForm/ListingFormContent'
import { VSpacer } from 'components/VSpacer'
import {
  getIdFromDSOSelectValue,
  getIssuerIdFromDSOSelectValue
} from 'app/pages/issuance/utils'

export interface ListingFormProps {
  data?: DigitalSecurityOffering
  isNew?: boolean
}

export const ListingForm = (props: ListingFormProps) => {
  const { data: initialData, isNew = false } = props
  const [dsoId, setDsoId] = useState('')
  const [issuerId, setIssuerId] = useState('')
  const { data: dsoData, isLoading } = useDSOById(dsoId, issuerId)
  const data = dsoData ?? initialData

  return (
    <>
      {!isNew ? null : (
        <Grid item lg={9} container direction='column'>
          <VSpacer size='medium' />
          <ListingRadioButtons
            onImportClick={value => {
              setDsoId(getIdFromDSOSelectValue(value))
              setIssuerId(getIssuerIdFromDSOSelectValue(value))
            }}
          />
          <VSpacer size='large' />
        </Grid>
      )}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ListingFormContent data={data} isNew={isNew} />
      )}
    </>
  )
}
