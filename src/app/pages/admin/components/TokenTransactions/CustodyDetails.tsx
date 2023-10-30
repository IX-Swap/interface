import React, { useState } from 'react'
import { Tooltip } from 'ui/Tooltip/Tooltip'
import {
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography
} from '@mui/material'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Divider } from 'ui/Divider'

export const CustodyDetails = (details: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Tooltip title={'View Details'} onClick={() => setIsOpen(true)} />
      <UIDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Box p={4}>
          <DialogTitle>
            <Typography variant='h3'>Custody Details</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant='body1'>
              <pre>{JSON.stringify(details, null, 2)}</pre>
            </Typography>
          </DialogContent>
          <Divider />
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={() => setIsOpen(false)}
          >
            Back
          </Button>
        </Box>
      </UIDialog>
    </>
  )
}
