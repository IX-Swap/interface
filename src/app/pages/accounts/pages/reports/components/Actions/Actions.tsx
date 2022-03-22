import React from 'react'
import { Box, Typography } from '@mui/material'
import { useStyles } from './Actions.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface ActionsProps {
  sectionSummaries: string[]
}

export const Actions = ({ sectionSummaries }: ActionsProps) => {
  const classes = useStyles()

  const { removeFilter, updateFilter } = useQueryFilter()

  return (
    <Box display={'flex'}>
      <Typography
        className={classes.link}
        onClick={() =>
          updateFilter('expandedSections', sectionSummaries.join(','))
        }
      >
        Expand All
      </Typography>
      <Box className={classes.line}>|</Box>
      <Typography
        className={classes.link}
        onClick={() => removeFilter('expandedSections')}
      >
        Contract All
      </Typography>
    </Box>
  )
}
