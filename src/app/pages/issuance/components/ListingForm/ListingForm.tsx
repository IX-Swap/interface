import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { ListingRadioButtons } from 'app/pages/issuance/components/ListingForm/ListingRadioButtons'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { ListingFormContent } from 'app/pages/issuance/components/ListingForm/ListingFormContent'
import {
  getIdFromDSOSelectValue,
  getIssuerIdFromDSOSelectValue
} from 'app/pages/issuance/utils/utils'
import { Listing } from 'app/pages/issuance/types/listings'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface ListingFormProps {
  data?: Listing
  isNew?: boolean
}

export const ListingForm = (props: ListingFormProps) => {
  const { data: initialData, isNew = false } = props
  const [dsoId, setDsoId] = useState<string | undefined>(undefined)
  const [issuerId, setIssuerId] = useState<string | undefined>(undefined)
  const { data: dsoData, isLoading } = useDSOById(dsoId, issuerId)
  const data = initialData ?? dsoData
  const [listPlace, setListPlace] = useState<string | null>(null)

  const renderForm = () => {
    if (dsoId === undefined && issuerId === undefined) {
      return null
    }
    if (isLoading) {
      return <LoadingIndicator />
    }

    return (
      <Grid item>
        <ListingFormContent data={data} isNew={isNew} />
      </Grid>
    )
  }

  return (
    <Grid item container direction={'column'} spacing={2}>
      {!isNew ? null : (
        <Grid item>
          <FieldContainer>
            <ListingRadioButtons
              listPlace={listPlace}
              setListPlace={setListPlace}
              onImportClick={value => {
                setDsoId(getIdFromDSOSelectValue(value))
                setIssuerId(getIssuerIdFromDSOSelectValue(value))
              }}
            />
          </FieldContainer>
        </Grid>
      )}

      {renderForm()}
    </Grid>
  )
}
