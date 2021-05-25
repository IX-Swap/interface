import React from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { useDSOAutosave } from 'app/pages/issuance/hooks/useDSOAutosave'
import { Check } from '@material-ui/icons'
import { Divider } from 'ui/Divider'
import { useHistory } from 'react-router'
import { generatePath } from 'react-router-dom'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { ListingFinishLaterButton } from 'app/pages/exchange/components/ListingForm/ListinfFInishLaterButton'

export interface ListingFormActionsProps {
  listing: DigitalSecurityOffering | undefined
}

export const ListingFormActions = (props: ListingFormActionsProps) => {
  const { listing } = props
  const { push } = useHistory()

  // TODO Change to use ListingAutoSave
  const { isSaved, isSaving, isError } = useDSOAutosave(listing)

  return (
    <>
      <Button
        variant={'contained'}
        color='primary'
        disableElevation
        onClick={() =>
          push(
            generatePath(OTCMarketRoute.previewListing, {
              listingId: listing?._id,
              issuerId: listing?.user
            })
          )
        }
        disabled={listing === undefined}
      >
        Preview
      </Button>
      <Box mx={1} component='span' />
      {/* TODO Change to ListingFinishLaterButton */}
      <ListingFinishLaterButton listing={listing} />
      <Box my={1} />
      <Divider mt={4} mb={2} />
      {isSaving ? (
        <Box display='flex' alignItems='center'>
          <Typography component='span'>Saving...</Typography>
          <CircularProgress style={{ marginLeft: 8 }} size={14} thickness={5} />
        </Box>
      ) : isSaved ? (
        <Box display='flex' alignItems='center'>
          <Typography component='span'>Saved</Typography>
          <Check style={{ width: 20, height: 20, marginLeft: 8 }} />
        </Box>
      ) : isError ? (
        <Typography color='error'>Failed to save the DSO</Typography>
      ) : (
        <Typography component='span'>Unsaved changes</Typography>
      )}
    </>
  )
}
