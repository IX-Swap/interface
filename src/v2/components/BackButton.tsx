import React from 'react'
import { IconButton, IconButtonProps } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

export interface BackButtonProps extends IconButtonProps {}

export const BackButton = (props: BackButtonProps) => {
  const history = useHistory()

  return (
    <IconButton {...props} size='small' onClick={history.goBack}>
      <ChevronLeft style={{ width: 32, height: 32 }} />
    </IconButton>
  )
}
