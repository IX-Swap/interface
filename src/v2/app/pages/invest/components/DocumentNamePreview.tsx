import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { DocumentNamePreviewButton } from './DocumentNamePreviewButton'

export interface DocumentNamePreviewProps {
  name?: string
}

export const DocumentNamePreview = (props: DocumentNamePreviewProps) => {
  const { name = '' } = props
  const { FormValue } = useTypedForm()

  return (
    <FormValue name={name}>
      {value => <DocumentNamePreviewButton value={value} />}
    </FormValue>
  )
}
