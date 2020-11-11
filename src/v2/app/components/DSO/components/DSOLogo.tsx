import React from 'react'
import { Avatar, AvatarProps } from '@material-ui/core'
import { useRawDataroomFile } from 'v2/hooks/useRawFile'

export interface DSOLogoProps extends AvatarProps {
  dsoId: string
  size: number
}

export const DSOLogo = (props: DSOLogoProps) => {
  const { dsoId, size, ...rest } = props
  const { data = '' } = useRawDataroomFile(
    `/issuance/dso/dataroom/logo/raw/${dsoId}`
  )

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
