import React from 'react'
import { ListItem, Typography } from '@mui/material'
import { formatDateAndTime } from 'helpers/dates'
import { ListChildComponentProps } from 'react-window'
import { DeployTokenMessage } from 'app/pages/issuance/hooks/useDeployToken'

export interface DeployTokenMessageProps extends ListChildComponentProps {}

export const DeployTokenMessageItem = (props: DeployTokenMessageProps) => {
  const { data, index, style } = props
  const { at, message } = data[index] as DeployTokenMessage

  return (
    <ListItem component='div' style={style} alignItems='flex-start'>
      <Typography
        variant='body1'
        color='textSecondary'
        style={{ minWidth: 170 }}
      >
        {formatDateAndTime(at, true)}:
      </Typography>
      <Typography variant='body1' color='textPrimary'>
        {message}
      </Typography>
    </ListItem>
  )
}
