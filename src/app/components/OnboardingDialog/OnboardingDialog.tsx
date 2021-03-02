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

export interface OnboardingDialogProps {
  title: string
  initOpened: boolean
  children: React.ReactNode
  closeLabel?: string
  closeArrow?: boolean
  actionLabel?: string
  action?: string
  actionArrow?: boolean
  openDialog?: boolean
  closeAction?: () => void
}

export const EmptyBackDrop = () => <></>

export const OnboardingDialog = ({
  initOpened,
  children,
  title,
  closeLabel,
  closeArrow = false,
  actionLabel,
  action,
  actionArrow = true,
  openDialog,
  closeAction
}: OnboardingDialogProps) => {
  const [opened, setOpened] = useState(initOpened)
  const { open: panelOpened } = useOnboardingPanel()

  const { scrollPaper, paper, paperShift, root } = useStyles()

  const handleClose = () => {
    closeAction !== undefined ? closeAction() : setOpened(false)
  }

  return (
    <>
      <Dialog
        disableBackdropClick
        open={openDialog !== undefined ? openDialog : opened}
        onClose={handleClose}
        classes={{
          root: root,
          scrollPaper: scrollPaper,
          paper: classnames(paper, { [paperShift]: !panelOpened })
        }}
        BackdropComponent={EmptyBackDrop}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions onClick={handleClose}>
          {closeLabel !== undefined ? (
            <Button color='primary'>
              {closeLabel}{' '}
              {closeArrow && <ArrowRightAltIcon style={{ marginLeft: 7 }} />}
            </Button>
          ) : null}

          {action !== undefined ? (
            <Button
              component={AppRouterLinkComponent}
              to={action}
              color='primary'
            >
              {actionLabel}{' '}
              {actionArrow && <ArrowRightAltIcon style={{ marginLeft: 7 }} />}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
      <BackDrop opened={openDialog !== undefined ? openDialog : opened} />
    </>
  )
}
