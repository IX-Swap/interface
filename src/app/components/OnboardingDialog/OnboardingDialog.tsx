import React, { useState } from 'react'
import classnames from 'classnames'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useOnboardingPanel } from 'app/hooks/onboarding/useOnboardingPanel'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useStyles } from './OnboardingDialog.styles'
import { BackDrop } from 'app/components/BackDrop'

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
  const { scrollPaper, paper, paperShift, root, button } = useStyles()

  const handleClose = () => {
    setOpened(false)
  }

  return (
    <>
      <UIDialog
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
            <Button className={button}>
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
              className={button}
            >
              {onboardingDialog.actionLabel}{' '}
              <ArrowRightAltIcon style={{ marginLeft: 7 }} />
            </Button>
          ) : null}
        </DialogActions>
      </UIDialog>
      <BackDrop onClick={handleClose} opened={opened} />
    </>
  )
}
