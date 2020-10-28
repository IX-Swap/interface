import React from 'react'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'
import { Button, Typography } from '@material-ui/core'
import { Maybe } from 'v2/types/util'
import { DataroomFile } from 'v2/types/dataroomFile'
import { themeColors } from 'v2/themes/default'
import { useFormError } from 'v2/hooks/useFormError'

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
          {error.message}
        </Typography>
      )}
    </>
  )
}
