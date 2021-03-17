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
import React, { useState } from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import classnames from 'classnames'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'

export interface OnboardingDialogProps {
  message: string[]
  title: string
  action?: string
  actionLabel?: string
  closeLabel?: string
  closeArrow?: boolean
}
export const EmptyBackDrop = () => <></>

export const OnboardingDialog = (onboardingDialog: OnboardingDialogProps) => {
  const { open: panelOpened } = useOnboardingPanel()
  const [opened, setOpened] = useState(true)
  const { scrollPaper, paper, paperShift, root } = useStyles()

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <>
      <Dialog
        open={opened}
        onClose={handleClose}
        classes={{
          root: root,
          scrollPaper: scrollPaper,
          paper: classnames(paper, { [paperShift]: !panelOpened })
        }}
        BackdropComponent={EmptyBackDrop}
      >
        <DialogTitle>{onboardingDialog.title}</DialogTitle>
        <DialogContent>
          {onboardingDialog.message.map(message => (
            <Typography>{message}</Typography>
          ))}
        </DialogContent>
        <DialogActions onClick={handleClose}>
          {onboardingDialog.closeLabel !== undefined ? (
            <Button color='primary'>
              {onboardingDialog.closeLabel}{' '}
              {onboardingDialog.closeArrow !== undefined &&
                onboardingDialog.closeArrow && (
                  <ArrowRightAltIcon style={{ marginLeft: 7 }} />
                )}
            </Button>
          ) : null}

          {onboardingDialog.action !== undefined ? (
            <Button
              component={AppRouterLinkComponent}
              to={onboardingDialog.action}
              color='primary'
            >
              {onboardingDialog.actionLabel}{' '}
              <ArrowRightAltIcon style={{ marginLeft: 7 }} />
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
      <BackDrop onClick={handleClose} opened={opened} />
    </>
  )
}
