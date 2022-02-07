import React from 'react'
import { Button } from '@mui/material'
import { getIdFromObj } from 'helpers/strings'
import { ListingView } from 'types/listing'
import { useSubmitListing } from 'app/pages/exchange/hooks/useSubmitListing'

export interface SubmitListingButtonProps {
  data: ListingView | undefined
}

export const SubmitListingButton = ({ data }: SubmitListingButtonProps) => {
  const listingId = getIdFromObj(data)
  const [submitListing, { isLoading }] = useSubmitListing(listingId)

  const handleClick = async () => await submitListing()

  if (data?.status === 'Submitted' || data?.status === 'Approved') {
    return null
  }

  return (
    <Button
      color='primary'
      variant='contained'
      disableElevation
      disabled={isLoading}
      onClick={handleClick}
    >
      Submit
    </Button>
  )
}
