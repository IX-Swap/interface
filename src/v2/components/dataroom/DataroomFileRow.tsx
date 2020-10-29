import React from 'react'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'
import { DataroomEditRow } from 'v2/components/dataroom/DataroomEditRow'
import { isDocument } from 'v2/helpers/dataroom'
import { DataroomEditRowActions } from 'v2/components/dataroom/DataroomEditRowActions'
import { UploadButton } from 'v2/components/dataroom/UploadButton'

export interface DataroomFileRowProps extends DataroomUploaderRenderProps {}

export const DataroomFileRow = (props: DataroomFileRowProps) => {
  const {
    handleUpload,
    handleDelete,
    documentInfo,
    value: document,
    uploadState: { isLoading: isUploading },
    deleteState: { isLoading: isDeleting }
  } = props

  if (!isDocument(document)) {
    return (
      <DataroomEditRow
        title={documentInfo?.title ?? ''}
        document={document}
        actions={
          <UploadButton onClick={handleUpload} isLoading={isUploading} />
        }
      />
    )
  }

  return (
    <DownloadDocument documentId={document._id} ownerId={document.user}>
      {({ download, isLoading: isDownloading }) => (
        <DataroomEditRow
          title={document.title}
          document={document}
          actions={
            <DataroomEditRowActions
              onDownload={download}
              onDelete={handleDelete}
              isDownloading={isDownloading}
              isDeleting={isDeleting}
            />
          }
        />
      )}
    </DownloadDocument>
  )
}
