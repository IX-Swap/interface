import React, { ReactNode } from 'react'
import { ReactComponent as DoneIcon } from 'assets/icons/completed-icon.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { Box, Grid, Typography } from '@mui/material'

export interface DeclarationsListItemProps {
  label: ReactNode
  value: boolean
}

export const DeclarationsListItem = ({
  label,
  value
}: DeclarationsListItemProps) => {
  return (
    <Grid item xs={12}>
      <Box display={'flex'} alignItems={'flex-start'}>
        <Box style={{ opacity: 0.5 }} mt={0.4}>
          {value ? (
            <span data-testid='declarations-list-item-checked'>
              <DoneIcon />
            </span>
          ) : (
            <span data-testid='declarations-list-item-unchecked'>
              <CloseIcon />
            </span>
          )}
        </Box>
        <Box marginLeft={2}>
          {React.isValidElement(label) ? (
            label
          ) : (
            <Typography
              fontWeight={400}
              data-testid='declarations-list-item-label'
              lineHeight='160%'
            >
              {label}
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  )
}
