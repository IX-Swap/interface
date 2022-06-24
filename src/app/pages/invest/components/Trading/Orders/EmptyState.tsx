import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/EmptyState.styles'
import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'
import React from 'react'

interface EmptyStateProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  isRow?: boolean
}
export const EmptyState = ({
  title,
  subtitle,
  isRow = true
}: EmptyStateProps) => {
  const classes = useStyles()
  const content = (
    <Box className={classes.container}>
      <MoonIcon />
      {title !== undefined && (
        <Typography
          variant={'h5'}
          className={classes.title}
          data-testid='empty-state-title'
        >
          {title}
        </Typography>
      )}
      {subtitle !== undefined && (
        <Typography
          className={classes.subtitle}
          data-testid='empty-state-subtitle'
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
  return (
    <>
      {isRow && (
        <TableRow>
          <TableCell colSpan={8}>{content}</TableCell>
        </TableRow>
      )}
      {!isRow && <>{content}</>}
    </>
  )
}
