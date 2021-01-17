import React from 'react'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { transformDSOToFormValues } from 'app/components/DSO/utils'
import { useDSOAutosave } from 'app/pages/issuance/hooks/useDSOAutosave'
import { Check } from '@material-ui/icons'
import { DSOFinishLaterButton } from 'app/components/DSO/components/DSOFinishLaterButton'
import { DSOSubmitButton } from 'app/components/DSO/components/DSOSubmitButton'

export interface DSOFormActionsProps {
  isNew: boolean
  isPreviewMode: boolean
  togglePreviewMode: () => void
  dso: DigitalSecurityOffering | undefined
}

export const DSOFormActions = (props: DSOFormActionsProps) => {
  const { isNew, dso, isPreviewMode, togglePreviewMode } = props
  const {
    reset,
    formState: { isDirty }
  } = useFormContext<DSOFormValues>()

  const { isSaved, isSaving } = useDSOAutosave(dso)

  const handleClear = () => {
    reset(transformDSOToFormValues(undefined))
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

      <br />

      {isNew && (
        <Button color='primary' disabled={!isDirty} onClick={handleClear}>
          Clear
        </Button>
      )}

      <br />

      {!isPreviewMode && (
        <Typography>
          {isSaving ? (
            <Box display='flex' alignItems='center'>
              <span>Saving...</span>
              <CircularProgress
                style={{ marginLeft: 8 }}
                size={14}
                thickness={5}
              />
            </Box>
          ) : isSaved ? (
            <Box display='flex' alignItems='center'>
              <span>Saved</span>
              <Check style={{ width: 20, height: 20, marginLeft: 8 }} />
            </Box>
          ) : (
            'Unsaved changes'
          )}
        </Typography>
      )}
    </>
  )
}
