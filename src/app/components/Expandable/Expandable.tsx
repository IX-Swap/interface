import { Box, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface ExpandableProps {
  mainComponent: React.ReactNode
  expandedComponent: React.ReactNode
  spacing?: number
  px?: number
  py?: number
  showArrow?: boolean
  noBorders?: boolean
}

export const Expandable = ({
  mainComponent,
  expandedComponent,
  spacing = 1,
  px = 1,
  py = 1,
  showArrow = false,
  noBorders = false
}: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: !noBorders ? 'divider' : 'transparent',
        borderRadius: 2,
        px,
        py
      }}
      onClick={toggleExpanded}
    >
      <Grid container spacing={spacing}>
        <Grid item xs={12} sx={{ position: 'relative' }}>
          {mainComponent}
          {showArrow && (
            <Box
              position='absolute'
              top={`calc(50% + ${spacing * 4}px )`}
              right={0}
              width={24}
              height={24}
              mt='-12px'
            >
              <Icon
                name={expanded ? 'chevron-down' : 'chevron-right'}
                color={expanded ? '#4C88FF' : undefined}
              />
            </Box>
          )}
        </Grid>
        {expanded && (
          <Grid item xs={12}>
            {expandedComponent}
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}
