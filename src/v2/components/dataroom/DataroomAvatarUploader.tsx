import React from 'react'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { Avatar } from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { getDataroomFileId } from 'v2/helpers/dataroom'

export interface DataroomAvatarUploaderProps
  extends DataroomUploaderRenderProps {
  size?: number
  variant?: 'circle' | 'rounded' | 'square'
}

export const DataroomAvatarUploader = (props: DataroomAvatarUploaderProps) => {
  const { handleUpload, value, size = 60, variant = 'circle' } = props
  const { user } = useAuth()
  const photoId = getDataroomFileId(value)
  const style = { width: size, height: size }

  if (photoId === undefined || photoId === '' || user === undefined) {
    return (
      <Avatar src='' onClick={handleUpload} style={style} variant={variant} />
    )
  }

  return (
    <ViewDocument documentId={photoId} ownerId={user._id}>
      {url => (
        <Avatar
          src={url ?? ''}
          onClick={handleUpload}
          style={style}
          variant={variant}
        />
      )}
    </ViewDocument>
  )
}
