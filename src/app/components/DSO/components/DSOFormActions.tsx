import React from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { useDSOAutosave } from 'app/pages/issuance/hooks/useDSOAutosave'
import { Check } from '@material-ui/icons'
import { DSOFinishLaterButton } from 'app/components/DSO/components/DSOFinishLaterButton'
import { Divider } from 'ui/Divider'
import { useHistory } from 'react-router'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { generatePath } from 'react-router-dom'

export interface DSOFormActionsProps {
  dso: DigitalSecurityOffering | undefined
}

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { dso } = props
  const { push } = useHistory()

  const { isSaved, isSaving, isError } = useDSOAutosave(dso)

  return (
    <>
      <Button
        variant={'contained'}
        color='primary'
        disableElevation
        onClick={() =>
          push(
            generatePath(IssuanceRoute.preview, {
              dsoId: dso?._id,
              issuerId: dso?.user
            })
          )
        }
        disabled={dso === undefined}
      >
        Preview
      </Button>

      <Box mx={1} component='span' />

      <DSOFinishLaterButton dso={dso} />

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
