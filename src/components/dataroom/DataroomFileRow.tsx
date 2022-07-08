import React from 'react'
import { DataroomUploaderRenderProps } from 'components/dataroom/DataroomUploader'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import { DataroomEditRow } from 'components/dataroom/DataroomEditRow'
import { isDocument } from 'helpers/dataroom'
import { DataroomEditRowActions } from 'components/dataroom/DataroomEditRowActions'
import { UploadButton } from 'components/dataroom/UploadButton'

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
          <UploadButton
            onClick={handleUpload}
            isLoading={isUploading}
            size='large'
          />
        }
      />
    )
  }

  return (
    <DownloadDocument
      documentId={document._id}
      ownerId={document.user}
      name={document.originalFileName}
    >
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
