import React from 'react'
import { Grid, Button, Box } from '@mui/material'

export interface DatePickerActionsProps {
  cancelAction: (event: any) => void
  setDateAction: (event: any) => void
  cancelLabel?: string
  setDateLabel?: string
}

export const DatePickerActions = ({
  cancelAction,
  setDateAction,
  cancelLabel = 'Cancel',
  setDateLabel = 'Set Date'
}: DatePickerActionsProps) => {
  return (
    <Box px={4} minWidth={256}>
      <Grid container spacing={1} justifyContent='space-between'>
        <Grid item xs={6}>
          <Button
            variant='outlined'
            onClick={cancelAction}
            fullWidth
            sx={{
              height: 41
            }}
          >
            {cancelLabel}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            onClick={setDateAction}
            disableElevation
            fullWidth
          >
            {setDateLabel}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
