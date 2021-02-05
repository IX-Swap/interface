import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { useStyles } from 'app/components/OnboardingDialog/OnboardingDialog.styles'
import { BackDrop } from 'app/components/OnboardingDialog/BackDrop'
import React, { useState } from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import classnames from 'classnames'
import { useOnboardingPanel } from 'app/components/OnboardingPanel/hooks/useOnboardingPanel'

export interface Onboarding2FADialog {
  title: string
  initOpened: boolean
  children: React.ReactNode
  closeLabel: string
  actionLabel: string
  action: string
  actionArrow?: boolean
}

export const EmptyBackDrop = () => <></>

export const OnboardingDialog = ({
  initOpened,
  children,
  title,
  closeLabel,
  actionLabel,
  action,
  actionArrow = true
}: Onboarding2FADialog) => {
  const [opened, setOpened] = useState(initOpened)
  const { open: panelOpened } = useOnboardingPanel()

  const { scrollPaper, paper, paperShift } = useStyles()

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <>
      <Dialog
        disableBackdropClick
        open={opened}
        onClose={handleClose}
        classes={{
          scrollPaper: scrollPaper,
          paper: classnames(paper, { [paperShift]: !panelOpened })
        }}
        BackdropComponent={EmptyBackDrop}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions onClick={handleClose}>
          <Button color='primary'>{closeLabel}</Button>
          <Button
            component={AppRouterLinkComponent}
            to={action}
            color='primary'
          >
            {actionLabel}{' '}
            {actionArrow && <ArrowRightAltIcon style={{ marginLeft: 7 }} />}
          </Button>
        </DialogActions>
      </Dialog>
      <BackDrop opened={opened} />
    </>
  )
}
