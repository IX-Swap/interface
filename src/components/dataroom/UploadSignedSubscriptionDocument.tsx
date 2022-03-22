import React from 'react'
import { DataroomUploaderRenderProps } from 'components/dataroom/DataroomUploader'
import { Button, Typography } from '@mui/material'
import { Maybe } from 'types/util'
import { DataroomFile } from 'types/dataroomFile'
import { themeColors } from 'themes/old/colors'
import { useFormError } from 'hooks/useFormError'

export interface UploadSignedSubscriptionDocumentProps
  extends DataroomUploaderRenderProps<Maybe<DataroomFile> | undefined> {}

export const UploadSignedSubscriptionDocument = (
  props: UploadSignedSubscriptionDocumentProps
) => {
  const { handleUpload, value: document, name } = props
  const hasValue = document !== null && document !== undefined
  const { error, hasError } = useFormError(name)

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        disableElevation={hasValue}
        onClick={handleUpload}
        style={{
          border: hasError ? `2px solid ${themeColors.error}` : ''
        }}
      >
        {hasValue
          ? document?.originalFileName
          : 'Upload Signed Subscription Document'}
      </Button>
      {hasError && (
        <Typography variant='caption' color='error'>
          {error?.message}
        </Typography>
      )}
    </>
  )
}
