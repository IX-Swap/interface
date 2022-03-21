import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import {
  toast,
  TypeOptions,
  ToastContentProps,
  CloseButtonProps,
  ToastOptions
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactComponent as SuccessIcon } from 'assets/icons/alerts/success.svg'
import { ReactComponent as ErrorIcon } from 'assets/icons/alerts/error.svg'
import { ReactComponent as InfoIcon } from 'assets/icons/alerts/info.svg'
import { ReactComponent as WarningIcon } from 'assets/icons/alerts/warning.svg'
import { AlertsContainer } from 'ui/UIKit/AlertsKit/AlertsContainer'
import { Icon } from 'ui/Icons/Icon'
import { VSpacer } from 'components/VSpacer'

export const AlertsKit = () => {
  const getToastIcon = (type: TypeOptions) => {
    switch (type) {
      case 'success':
        return SuccessIcon
      case 'error':
        return ErrorIcon
      case 'info':
        return InfoIcon
      case 'warning':
        return WarningIcon
      default:
        return SuccessIcon
    }
  }

  const CloseIcon = ({ closeToast }: CloseButtonProps) => (
    <Icon name={'close'} onClick={closeToast} size={17} />
  )

  const Content = () => (
    <Box width={145}>The bank account was successfully created</Box>
  )

  const ActionContent = ({ closeToast }: ToastContentProps) => {
    const closeAlert = () => {
      if (closeToast !== undefined) {
        closeToast()
      }
    }

    return (
      <Box display={'flex'}>
        <Box width={145}>The bank account was successfully created</Box>

        <Button
          variant={'text'}
          style={{ marginRight: 8, marginLeft: 16 }}
          onClick={() => {
            closeAlert()
          }}
        >
          Accept
        </Button>
        <Button
          variant={'text'}
          style={{ marginRight: 16 }}
          onClick={() => {
            closeAlert()
          }}
        >
          Deny
        </Button>
      </Box>
    )
  }

  const getToastOptions = (
    type: TypeOptions,
    variant: 'default' | 'loading' | 'action'
  ) => {
    return {
      position: 'bottom-right',
      type: type,
      hideProgressBar: variant !== 'loading',
      icon: getToastIcon(type),
      closeButton: CloseIcon,
      style: { width: variant !== 'action' ? 320 : 'initial' }
    } as ToastOptions
  }

  return (
    <UIKitThemeWrapper>
      <Grid container spacing={1} flexDirection={'column'}>
        <Grid item>
          <Typography>Basic</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('success', 'default'))
              }
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('error', 'default'))
              }
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toast(Content, getToastOptions('info', 'default'))}
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('warning', 'default'))
              }
            >
              Warning
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} flexDirection={'column'}>
        <VSpacer size={'medium'} />
        <Grid item>
          <Typography>With Loading</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('success', 'loading'))
              }
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('error', 'loading'))
              }
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toast(Content, getToastOptions('info', 'loading'))}
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(Content, getToastOptions('warning', 'loading'))
              }
            >
              Warning
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} flexDirection={'column'}>
        <VSpacer size={'medium'} />
        <Grid item>
          <Typography>With Action</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(ActionContent, getToastOptions('success', 'action'))
              }
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(ActionContent, getToastOptions('error', 'action'))
              }
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(ActionContent, getToastOptions('info', 'action'))
              }
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toast(ActionContent, getToastOptions('warning', 'action'))
              }
            >
              Warning
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <AlertsContainer />
    </UIKitThemeWrapper>
  )
}
