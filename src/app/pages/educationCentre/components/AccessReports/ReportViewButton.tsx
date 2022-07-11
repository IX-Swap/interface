import { Button } from '@mui/material'
import { Report } from 'app/pages/educationCentre/components/AccessReports/ReportRow'
import { getDocumentType, isImage } from 'components/dataroom/DataroomColumns'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, downloadByFile } from 'hooks/utils'
import React from 'react'

export interface ReportViewButtonProps {
  isAtlasOne: boolean
  item: Report
}

export const ReportViewButton = ({
  isAtlasOne,
  item
}: ReportViewButtonProps) => {
  const file = isAtlasOne ? item.publicFile?.publicUrl : item.originalFileName

  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId: item._id, ownerId: item.user },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '')
        downloadByFile(file, item.originalFileName)
      }
    }
  )
  const handleClick = async () => {
    await downloadDocument()
  }

  return isAtlasOne ? (
    <Button
      color='primary'
      variant='outlined'
      href={item.publicFile?.publicUrl ?? item.url}
      target='_blank'
      style={{
        minWidth: 110
      }}
    >
      {`View ${file !== undefined ? 'PDF' : 'Report'}`}
    </Button>
  ) : (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleClick}
      disabled={isLoading}
      style={{
        minWidth: 110
      }}
    >
      {`View ${
        file !== undefined && isImage(file)
          ? 'Image'
          : getDocumentType(file ?? '.pdf')
      }`}
    </Button>
  )
}
