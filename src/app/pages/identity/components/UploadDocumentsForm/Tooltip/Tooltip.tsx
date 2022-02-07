import React from 'react'
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/Tooltip/Tooltip.styles'

export const Tooltip = ({
  title = '',
  placement = 'right-start',
  ...rest
}: Partial<TooltipProps>) => {
  const classes = useStyles()
  return (
    <MuiTooltip
      {...rest}
      title={title}
      arrow
      placement={placement}
      classes={classes}
    >
      <InfoIcon color='disabled' />
    </MuiTooltip>
  )
}
