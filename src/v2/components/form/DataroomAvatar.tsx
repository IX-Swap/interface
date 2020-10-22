import React from 'react'
import { NewDataroomUploaderRenderProps } from 'v2/components/form/NewDataroomUploader'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { Avatar } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getDocumentId } from 'v2/components/form/DataroomDocument'

export interface DataroomAvatarProps extends NewDataroomUploaderRenderProps {}

export const DataroomAvatar = (props: DataroomAvatarProps) => {
  const { handleUpload, value } = props
  const { user } = useAuth()
  const photoId = getDocumentId(value)

  if (photoId === undefined || photoId === '' || user === undefined) {
    return <Avatar src='' onClick={handleUpload} />
  }

  return (
    <ViewDocument documentId={photoId} ownerId={user._id}>
      {url => <Avatar src={url ?? ''} onClick={handleUpload} />}
    </ViewDocument>
  )
}
