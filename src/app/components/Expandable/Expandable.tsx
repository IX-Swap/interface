import { Box, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import {
  ArrowDropDown as DownArrow,
  ArrowDropUp as UpArrow
} from '@mui/icons-material'

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

  const Icon = expanded ? UpArrow : DownArrow

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
              width={30}
              height={30}
              mt='-12px'
              mr='12px'
            >
              <Icon
                sx={{
                  color: expanded ? '#4C88FF' : undefined
                }}
                height={30}
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
