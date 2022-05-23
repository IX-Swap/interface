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
import { Divider } from 'ui/Divider'
export interface StepperProps extends MuiStepperProps {
  stepInfo?: StepInfoProps
  actions?: ReactElement
  withMobileDropdown?: boolean
}

export const Stepper = ({
  children,
  alternativeLabel,
  title,
  stepInfo,
  withMobileDropdown = true,
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
          <Box
            display='flex'
            justifyContent='space-between'
            minHeight={40}
            alignItems='center'
            mb={matches ? 1 : 0}
          >
            <Typography
              variant='body1'
              sx={{
                mb: { xs: 0, md: 2 },
                pl: { xs: 0, md: 5 },
                lineHeight: { xs: '20px', md: undefined },
                fontSize: {
                  xs: 16,
                  md: 18
                },
                fontWeight: {
                  xs: 600
                }
              }}
            >
              {title}
            </Typography>
            {matches && withMobileDropdown ? (
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
        <>
          {matches || actions === undefined ? null : (
            <Box width='100%' p='24px 40px'>
              <Divider />
            </Box>
          )}
        </>
        {actions !== undefined ? (
          <Box
            display='flex'
            justifyContent='center'
            width='100%'
            p={matches ? '20px 0 0 0' : '0 40px'}
          >
            {actions}
          </Box>
        ) : null}
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
