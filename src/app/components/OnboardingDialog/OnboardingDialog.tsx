import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { useStyles } from 'app/components/OnboardingDialog/OnboardingDialog.styles'
import { BackDrop } from 'app/components/OnboardingDialog/BackDrop'
import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import classnames from 'classnames'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'
import {
  useOnboardingDialogState,
  useOnboardingDialogActions
} from 'app/components/OnboardingDialog/useOnboardingDialogState'

export const EmptyBackDrop = () => <></>

export const OnboardingDialog = () => {
  const { open: panelOpened } = useOnboardingPanel()
  const { scrollPaper, paper, paperShift, root } = useStyles()

  const { setOnboardingNotification } = useOnboardingDialogActions()
  const { onboardingNotification } = useOnboardingDialogState()
  const unsetOnboardingNotification = () => {
    setOnboardingNotification()
  }

  return (
    <>
      <Dialog
        open={onboardingNotification !== undefined}
        onClose={unsetOnboardingNotification}
        classes={{
          root: root,
          scrollPaper: scrollPaper,
          paper: classnames(paper, { [paperShift]: !panelOpened })
        }}
        BackdropComponent={EmptyBackDrop}
      >
        {onboardingNotification !== undefined ? (
          <>
            <DialogTitle>{onboardingNotification.title}</DialogTitle>
            <DialogContent>
              {onboardingNotification.message.map(message => (
                <Typography>{message}</Typography>
              ))}
            </DialogContent>
            <DialogActions onClick={unsetOnboardingNotification}>
              {onboardingNotification.closeLabel !== undefined ? (
                <Button color='primary'>
                  {onboardingNotification.closeLabel}{' '}
                  {onboardingNotification.closeArrow !== undefined &&
                    onboardingNotification.closeArrow && (
                      <ArrowRightAltIcon style={{ marginLeft: 7 }} />
                    )}
                </Button>
              ) : null}

              {onboardingNotification.action !== undefined ? (
                <Button
                  component={AppRouterLinkComponent}
                  to={onboardingNotification.action}
                  color='primary'
                >
                  {onboardingNotification.actionLabel}{' '}
                  <ArrowRightAltIcon style={{ marginLeft: 7 }} />
                </Button>
              ) : null}
            </DialogActions>
          </>
        ) : null}
      </Dialog>
      <BackDrop
        onClick={unsetOnboardingNotification}
        opened={onboardingNotification !== undefined}
      />
    </>
  )
}
