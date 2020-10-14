import React from 'react'
import { Button } from '@material-ui/core'
import { useTypedForm } from 'v2/components/form/useTypedForm'

export interface DocumentNamePreviewProps {
  name?: string
}

export const DocumentNamePreview = (props: DocumentNamePreviewProps) => {
  const { name = '' } = props
  const { FormValue } = useTypedForm()

  return (
    <FormValue name={name}>
      {value => {
        const hasValue = value !== undefined

        return (
          <Button
            variant='contained'
            component='span'
            fullWidth
            style={{ textTransform: 'none' }}
            disableElevation={hasValue}
          >
            {!hasValue
              ? 'Upload Signed Subscription Document'.toUpperCase()
              : value.originalFileName}
          </Button>
        )
      }}
    </FormValue>
  )
}
