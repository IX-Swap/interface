import React from 'react'
import { useRawDataroomFile } from 'hooks/useRawFile'
import { Avatar, AvatarProps } from '@mui/material'

export interface DataroomImageProps extends AvatarProps {
  width?: number | string
  height?: number | string
  photoId: string
}

export const DataroomImage = (props: DataroomImageProps) => {
  const { photoId, width, height, children, ...rest } = props
  const uri = `dataroom/raw/${photoId}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: photoId !== undefined
  })

  return (
    <Avatar
      {...rest}
      src={data}
      style={{ width, height, background: 'none', border: 0 }}
    >
      {children}
    </Avatar>
  )
}
