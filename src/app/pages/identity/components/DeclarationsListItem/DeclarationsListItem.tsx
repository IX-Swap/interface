import React, { ReactNode } from 'react'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import { Box, Grid, Typography } from '@material-ui/core'

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
        <Box style={{ opacity: 0.5 }}>
          {value ? (
            <DoneIcon data-testid='declarations-list-item-checked' />
          ) : (
            <CloseIcon data-testid='declarations-list-item-unchecked' />
          )}
        </Box>
        <Box marginLeft={2}>
          {React.isValidElement(label) ? (
            label
          ) : (
            <Typography data-testid='declarations-list-item-label'>
              {label}
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  )
}
