import React from 'react'
import { Box } from '@mui/material'

import { Tooltip } from 'ui/Tooltip/Tooltip'

interface LabelWithTooltipProps {
  label: any
  tooltipTitle: any
}

export const LabelWithTooltip = ({
  label,
  tooltipTitle,
  ...rest
}: Partial<LabelWithTooltipProps>) => (
  <Box display={'flex'} alignItems={'center'} gap={0.5}>
    <span>{label}</span>
    <Tooltip title={tooltipTitle} {...rest} />
  </Box>
)
