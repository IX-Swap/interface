import React from 'react'
import MuiTooltip, { TooltipProps } from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import { useStyles } from 'app/pages/_identity/components/UploadDocumentsForm/Tooltip/Tooltip.styles'

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
