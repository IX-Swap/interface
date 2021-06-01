import { Button } from '@material-ui/core'
import { useCreateDSO } from 'app/pages/issuance/hooks/useCreateDSO'
import { useUpdateDSO } from 'app/pages/issuance/hooks/useUpdateDSO'
import { getUpdateDSOPayload } from 'app/pages/issuance/utils'
import { getIdFromObj } from 'helpers/strings'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'

export interface ListingFinishLaterButtonProps {
  listing: DigitalSecurityOffering | undefined
}

export const ListingFinishLaterButton = (
  props: ListingFinishLaterButtonProps
) => {
  const { listing } = props
  const listingId = getIdFromObj(listing)
  // TODO Change to listing API requests
  const { getValues } = useFormContext<DSOFormValues>()
  const [createDSO, { isLoading: isCreating }] = useCreateDSO()
  const [updateDSO, { isLoading: isUpdating }] = useUpdateDSO(
    listingId,
    listing?.user ?? ''
  )
  const formValues = getUpdateDSOPayload({
    ...getValues(),
    status: 'Draft'
  })

  const handleClick =
    listing === undefined
      ? // TODO Change to listing API requests
        async () => await createDSO(formValues)
      : async () => await updateDSO(formValues)

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleClick}
      disabled={isCreating || isUpdating}
    >
      Finish Later
    </Button>
  )
}
