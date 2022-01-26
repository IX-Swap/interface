import React from 'react'
import { useRawDataroomFile } from 'hooks/useRawFile'
import { Avatar, AvatarProps } from '@mui/material'

export interface DSOTeamMemberPhotoProps extends AvatarProps {
  dsoId: string
  size: number
  photoId?: string
}

export const DSOTeamMemberPhoto = (props: DSOTeamMemberPhotoProps) => {
  const { dsoId, photoId, size, ...rest } = props
  const uri = `/issuance/dso/dataroom/photos/raw/${dsoId}/${photoId ?? ''}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: photoId !== undefined
  })

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
