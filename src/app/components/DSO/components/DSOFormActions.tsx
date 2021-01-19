import React, { Fragment } from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useDSOAutosave } from 'app/pages/issuance/hooks/useDSOAutosave'
import { Check } from '@material-ui/icons'
import { DSOFinishLaterButton } from 'app/components/DSO/components/DSOFinishLaterButton'
import { DSOSubmitButton } from 'app/components/DSO/components/DSOSubmitButton'
import { Divider } from 'ui/Divider'

export interface DSOFormActionsProps {
  isPreviewMode: boolean
  togglePreviewMode: () => void
  dso: DigitalSecurityOffering | undefined
}

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { dso, isPreviewMode, togglePreviewMode } = props
  const {
    reset,
    formState: { isDirty }
  } = useFormContext<DSOFormValues>()

  const { isSaved, isSaving, isError } = useDSOAutosave(dso)
  const showSaveStatus = !isPreviewMode && dso !== undefined

  const handleClear = () => {
    reset(transformDSOToFormValues(undefined), {
      isDirty: true
    })
  }

  return (
    <>
      <Button
        variant={isPreviewMode ? 'outlined' : 'contained'}
        color='primary'
        disableElevation
        onClick={togglePreviewMode}
        disabled={isPreviewMode ? false : dso === undefined}
      >
        {isPreviewMode ? 'Edit' : 'Preview'}
      </Button>

      <Box mx={1} component='span' />

      {isPreviewMode ? (
        <DSOSubmitButton dso={dso} />
      ) : (
        <DSOFinishLaterButton dso={dso} />
      )}

      <Box my={1} />

      <Button color='primary' disabled={!isDirty} onClick={handleClear}>
        Clear
      </Button>

      {showSaveStatus && (
        <Fragment>
          <Divider mt={4} mb={2} />
          {isSaving ? (
            <Box display='flex' alignItems='center'>
              <Typography component='span'>Saving...</Typography>
              <CircularProgress
                style={{ marginLeft: 8 }}
                size={14}
                thickness={5}
              />
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
        </Fragment>
      )}
    </>
  )
}
