import React, { ReactElement, useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Stepper as MuiStepper,
  StepperProps as MuiStepperProps,
  Typography,
  useMediaQuery
} from '@mui/material'
import { StepInfo, StepInfoProps } from 'ui/Stepper/StepInfo'
import { Icon } from 'ui/Icons/Icon'
import { StepperDialog } from 'ui/Stepper/StepperDialog'
import { useTheme } from '@mui/styles'

export interface StepperProps extends MuiStepperProps {
  stepInfo?: StepInfoProps
  actions?: ReactElement
}

export const Stepper = ({
  children,
  alternativeLabel,
  title,
  stepInfo,
  actions,
  ...props
}: StepperProps) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setOpen(false)
  }, [props.activeStep])

  return (
    <>
      <Box>
        {stepInfo !== undefined && matches ? <StepInfo {...stepInfo} /> : null}
        {title !== undefined ? (
          <Box display='flex' justifyContent='space-between'>
            <Typography
              variant='body1'
              sx={{
                mb: { xs: 0, md: 2 },
                pl: { xs: 0, md: 3 },
                lineHeight: { xs: '40px', md: undefined },
                fontSize: {
                  xs: 16,
                  md: undefined
                }
              }}
            >
              {title}
            </Typography>
            {matches ? (
              <IconButton
                sx={{
                  width: 40,
                  height: 40
                }}
                onClick={() => {
                  setOpen(true)
                }}
              >
                <Icon name='switch-down' />
              </IconButton>
            ) : null}
          </Box>
        ) : null}

        <MuiStepper
          {...props}
          alternativeLabel={props.orientation === 'horizontal'}
          connector={null}
        >
          {children}
        </MuiStepper>

        {actions !== undefined ? <>{actions}</> : null}
      </Box>
      <StepperDialog
        el={
          <MuiStepper
            {...props}
            orientation='vertical'
            alternativeLabel={true}
            connector={null}
            sx={{
              '& .MuiStepButton-root': {
                p: 0
              },
              '& .MuiStepLabel-alternativeLabel': {
                flexDirection: 'row',
                mt: 0,
                textAlign: 'left'
              },
              '& .MuiStepLabel-label': {
                p: 2,
                '&.Mui-active': {
                  '&::before': {
                    display: 'none'
                  }
                }
              }
            }}
          >
            {children}
          </MuiStepper>
        }
        open={open && matches}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}
