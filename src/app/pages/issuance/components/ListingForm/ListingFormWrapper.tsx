import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import {
  ListingDetails
  // ListingType
} from 'app/pages/issuance/components/ListingForm/ListingDetails'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { ListingForm } from 'app/pages/issuance/components/ListingForm/ListingForm'
import {
  getIdFromDSOSelectValue,
  getIssuerIdFromDSOSelectValue
} from 'app/pages/issuance/utils/utils'
import { Listing } from 'app/pages/issuance/types/listings'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'

export interface ListingFormWrapperProps {
  data?: Listing
  isNew?: boolean
}

export const ListingFormWrapper = (props: ListingFormWrapperProps) => {
  const { data: initialListingData, isNew = false } = props
  // const [listingType, setListingType] = useState<ListingType>('Secondary')
  const [listingType, setListingType] = useState<any>('')
  const [dsoId, setDsoId] = useState<string | undefined>(undefined)
  const [issuerId, setIssuerId] = useState<string | undefined>(undefined)

  const { data: dsoData, isLoading } = useDSOById(dsoId, issuerId)
  const data = initialListingData ?? dsoData

  const renderListingForm = () => {
    if (
      dsoId === undefined &&
      issuerId === undefined &&
      initialListingData === undefined
    ) {
      return null
    }
    if (isLoading) {
      return <LoadingIndicator />
    }

    return (
      <Grid item>
        <ListingForm data={data} isNew={isNew} listingType={listingType} />
      </Grid>
    )
  }

  return (
    <Grid item container direction={'column'} spacing={2}>
      {!isNew ? null : (
        <Grid item>
          <FieldContainer>
            <ListingDetails
              listingType={listingType}
              setListingType={setListingType}
              onImportClick={value => {
                setDsoId(getIdFromDSOSelectValue(value))
                setIssuerId(getIssuerIdFromDSOSelectValue(value))
              }}
            />
          </FieldContainer>
        </Grid>
      )}

      {renderListingForm()}
    </Grid>
  )
}
