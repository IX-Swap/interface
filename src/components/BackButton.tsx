import React from 'react'
import { IconButton, IconButtonProps } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
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
