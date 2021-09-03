import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core'
import { useStyles } from './DisclosureDialog.style'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { VSpacer } from 'components/VSpacer'
import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'

export interface DisclosureDialogProps {
  content: any
  isOpen: boolean
  onClose: () => void
}

export const DisclosureDialog = ({
  content,
  isOpen,
  onClose
}: DisclosureDialogProps) => {
  const classes = useStyles()

  return (
    <Dialog open={isOpen} maxWidth={'md'} classes={{ paper: classes.root }}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        Disclosure
      </DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        {renderStringToHTML(content)}
        <VSpacer size='small' />
        <Typography>
          Learn about our <ExchangeRulesLink />
        </Typography>
      </DialogContentText>
      <DialogActions classes={{ root: classes.actions }}>
        <Button
          type={'button'}
          variant={'contained'}
          color={'primary'}
          onClick={() => onClose()}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
