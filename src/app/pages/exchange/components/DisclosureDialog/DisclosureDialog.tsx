import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  ListItemText,
  Typography
} from '@material-ui/core'
import { useStyles } from './DisclosureDialog.style'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { VSpacer } from 'components/VSpacer'
import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'
import { Divider } from 'ui/Divider'

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
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} maxWidth={'md'} classes={{ paper: classes.root }}>
      <DialogTitle disableTypography classes={{ root: classes.title }}>
        Disclosure
      </DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        <Box className={classes.scrollable}>{renderStringToHTML(content)}</Box>
        <VSpacer size={'medium'} />
        <Divider />
      </DialogContentText>
      <DialogActions classes={{ root: classes.actions }}>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Box className={classes.box}>
              <Checkbox
                checked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
              />
              <ListItemText
                primary={'I agree, accept and understand all the disclosures'}
              />
            </Box>
          </Grid>
          <Grid item>
            <Typography>
              Learn about our <ExchangeRulesLink />
            </Typography>
          </Grid>
        </Grid>

        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
        <Grid container justify={'center'} style={{ marginLeft: 0 }}>
          <Grid item>
            <Button
              type={'button'}
              className={classes.button}
              variant={'outlined'}
              color={'primary'}
              onClick={() => onClose()}
            >
              Close
            </Button>
          </Grid>
          <Grid item style={{ marginLeft: 20 }}>
            <Button
              type={'button'}
              className={classes.button}
              variant={'contained'}
              color={'primary'}
              disabled={!isChecked}
              onClick={() => onClose()}
            >
              I Agree
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
