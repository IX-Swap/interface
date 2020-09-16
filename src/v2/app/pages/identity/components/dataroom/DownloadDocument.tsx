import React from 'react'
import { Button } from '@material-ui/core'
import { useDownloadDocument } from 'v2/hooks/useDownloadDocument'
import { Document } from 'v2/types/document'

export interface DownloadDocumentProps {
  document: Document
}

export const DownloadDocument: React.FC<DownloadDocumentProps> = props => {
  const { document } = props
  const [downloadDocument] = useDownloadDocument(document)
  const handleClick = async () => await downloadDocument()

  return <Button onClick={handleClick}>Download</Button>
}
