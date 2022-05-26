import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material'
import { useStyles } from 'app/components/UncompletedIdentityDialog/UncompletedIdentityDialog.styles'
import { BackDrop } from 'app/components/BackDrop'
import React, { useState } from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import classnames from 'classnames'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useOnboardingPanel } from 'app/hooks/onboarding/useOnboardingPanel'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { useUncompletedIdentityDialogData } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialogData'

// export interface OnboardingDialogProps {
//   message: string[]
//   title: string
//   action?: string
//   actionLabel?: string
//   closeLabel?: string
//   closeArrow?: boolean
// }
export const EmptyBackDrop = () => <></>

export const UncompletedIdentityDialog = () => {
  const { getData } = useUncompletedIdentityDialogData()

  const onboardingDialog = getData()

  const { open: panelOpened } = useOnboardingPanel()
  const [opened, setOpened] = useState(true)
  const {
    scrollPaper,
    paper,
    content,
    title,
    actions,
    paperShift,
    root,
    button
  } = useStyles()

  const handleClose = () => {
    setOpened(false)
  }

  const renderContent = () => {
    if (onboardingDialog === undefined) {
      return <LoadingIndicator />
    }

    return (
      <>
        <DialogTitle className={title}>{onboardingDialog.title}</DialogTitle>
        <DialogContent className={content}>
          {onboardingDialog.message.map(message => (
            <Typography>{message}</Typography>
          ))}
        </DialogContent>
        <DialogActions className={actions} onClick={handleClose}>
          {/* {onboardingDialog.closeLabel !== undefined ? ( */}
          {/*  <Button className={button} variant={'contained'}> */}
          {/*    {onboardingDialog.closeLabel}{' '} */}
          {/*    {onboardingDialog.closeArrow !== undefined && */}
          {/*      onboardingDialog.closeArrow && ( */}
          {/*        <ArrowRightAltIcon style={{ marginLeft: 7 }} /> */}
          {/*      )} */}
          {/*  </Button> */}
          {/* ) : null} */}

          {onboardingDialog.action !== undefined ? (
            <Button
              component={AppRouterLinkComponent}
              to={onboardingDialog.action}
              className={button}
              variant={'contained'}
            >
              {onboardingDialog.actionLabel}
            </Button>
          ) : null}
        </DialogActions>
      </>
    )
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
        {renderContent()}
      </UIDialog>
      <BackDrop onClick={handleClose} opened={opened} />
    </>
  )
}
