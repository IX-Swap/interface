import React from 'react'
import { Box, Dialog, IconButton, Paper, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Icon } from 'ui/Icons/Icon'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export interface StepperDialogProps {
  open: boolean
  onClose: () => void
  el: React.ReactNode
}

export const StepperDialog = ({ el, open, onClose }: StepperDialogProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          padding: 0
        }
      }}
    >
      <Box display='flex' alignItems='flex-end' height='100%' width='100%'>
        <Box position='relative' width='100%'>
          <Paper
            sx={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            }}
          >
            <Box
              width='100%'
              p={1}
              display='flex'
              justifyContent='flex-end'
              boxSizing='border-box'
            >
              <IconButton onClick={onClose}>
                <Icon name='close' />
              </IconButton>
            </Box>
            <Box p={2} pt={0}>
              {el}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Dialog>
  )
}
