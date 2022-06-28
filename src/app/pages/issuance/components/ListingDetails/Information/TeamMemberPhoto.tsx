import React from 'react'
import { useRawDataroomFile } from 'hooks/useRawFile'
import { Avatar, AvatarProps } from '@mui/material'

export interface TeamMemberPhotoProps extends AvatarProps {
  size: number
  photoId?: string
}

export const TeamMemberPhoto = (props: TeamMemberPhotoProps) => {
  const { photoId, size, ...rest } = props
  const uri = `dataroom/raw/${photoId ?? ''}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: photoId !== undefined
  })

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
