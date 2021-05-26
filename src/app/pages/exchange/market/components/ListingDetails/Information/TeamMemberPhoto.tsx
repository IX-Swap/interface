import React from 'react'
import { useRawDataroomFile } from 'hooks/useRawFile'
import { Avatar, AvatarProps } from '@material-ui/core'

export interface TeamMemberPhotoProps extends AvatarProps {
  resourceId: string
  size: number
  resourceUri: string
  photoId?: string
}

export const TeamMemberPhoto = (props: TeamMemberPhotoProps) => {
  const { resourceId, resourceUri, photoId, size, ...rest } = props
  const uri = `${resourceUri}/${resourceId}/${photoId ?? ''}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: photoId !== undefined
  })

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
