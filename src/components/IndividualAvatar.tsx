import React from 'react'
import { Avatar } from '@mui/material'
import { useRawDataroomFile } from 'hooks/useRawFile'

// TODO: refactor
export interface Props {
  userId?: string
  size?: number
}

export const IndividualAvatar = (props: Props) => {
  const { userId, size = 46, ...rest } = props

  const uri = `/identity/individuals/dataroom/photo/${userId ?? ''}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: userId !== undefined
  })

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
