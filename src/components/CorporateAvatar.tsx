import React from 'react'
import { Avatar } from '@material-ui/core'
import { useRawDataroomFile } from 'hooks/useRawFile'

export interface Props {
  _id?: string
  size?: number
}

export const CorporateAvatar = (props: Props) => {
  const { _id, size = 46, ...rest } = props

  const uri = `/identity/corporates/dataroom/logo/${_id ?? ''}`
  const { data = '' } = useRawDataroomFile(uri, {
    enabled: _id !== undefined
  })

  return <Avatar {...rest} src={data} style={{ width: size, height: size }} />
}
