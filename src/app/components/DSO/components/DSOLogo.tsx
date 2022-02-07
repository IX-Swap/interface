import React from 'react'
import { Avatar, AvatarProps } from '@mui/material'
import { useRawDataroomFile } from 'hooks/useRawFile'

export interface DSOLogoProps extends AvatarProps {
  dsoId: string
  size: number
  uri?: string | undefined
}

export const DSOLogo = (props: DSOLogoProps) => {
  const {
    dsoId,
    size,
    uri = '/issuance/dso/dataroom/logo/raw/',
    ...rest
  } = props
  const { data = '' } = useRawDataroomFile(`${uri}${dsoId}`)

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
