import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { AlertsContainer } from 'ui/UIKit/AlertsKit/AlertsContainer'
import { VSpacer } from 'components/VSpacer'
import { useServices } from 'hooks/useServices'
import { Actions } from 'hooks/useToast'
import { notificationForAlert } from '__fixtures__/notification'

export const AlertsKit = () => {
  const { toastsService } = useServices()
  const content = 'The bank account was successfully created'
  const errorContent = 'There was an error creating the bank account'

  const actions: Actions = [
    {
      buttonText: 'Accept',
      callback: () => console.log('Accept')
    },
    {
      buttonText: 'Deny',
      callback: () => console.log('Deny')
    }
  ]

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
              onClick={() => toastsService.showToast(content, 'success')}
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toastsService.showToast(errorContent, 'error')}
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toastsService.showToast(content, 'info')}
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toastsService.showToast(content, 'warning')}
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
              onClick={() => toastsService.showToast(content, 'success', true)}
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toastsService.showToast(errorContent, 'error', true)
              }
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toastsService.showToast(content, 'info', true)}
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() => toastsService.showToast(content, 'warning', true)}
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
                toastsService.showToast(content, 'success', false, actions)
              }
            >
              Success
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toastsService.showToast(errorContent, 'error', false, actions)
              }
            >
              Error
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toastsService.showToast(content, 'info', false, actions)
              }
            >
              Info
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toastsService.showToast(content, 'warning', false, actions)
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
          <Typography>Notification</Typography>
        </Grid>
        <Grid item container spacing={1} xs={12} md={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              onClick={() =>
                toastsService.showNotification(notificationForAlert)
              }
            >
              Notification
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <AlertsContainer />
    </UIKitThemeWrapper>
  )
}
