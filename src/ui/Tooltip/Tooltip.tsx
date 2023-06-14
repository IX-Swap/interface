import React from 'react'
import { IconButton, Tooltip as MuiTooltip, TooltipProps } from '@mui/material'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { useStyles } from 'ui/Tooltip/Tooltip.styles'

export const Tooltip = ({
  title = '',
  placement = 'right-start',
  ...rest
}: Partial<TooltipProps>) => {
  const { iconButton } = useStyles()
  return (
    <MuiTooltip
      {...rest}
      title={title}
      arrow
      placement={placement}
      enterTouchDelay={0}
    >
      <IconButton color='primary' className={iconButton} size='large'>
        <InfoIcon color='disabled' />
      </IconButton>
    </MuiTooltip>
  )
}
