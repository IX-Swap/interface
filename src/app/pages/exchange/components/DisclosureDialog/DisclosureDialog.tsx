import React, { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material'
import { useStyles } from './DisclosureDialog.style'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { VSpacer } from 'components/VSpacer'
import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'
import { Divider } from 'ui/Divider'
import { useAcceptMASDisclosure } from 'app/pages/exchange/hooks/useAcceptMASDisclosure'
import { generatePath, useHistory } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

export interface DisclosureDialogProps {
  content: any
  isOpen: boolean
}

export const DisclosureDialog = ({
  content,
  isOpen
}: DisclosureDialogProps) => {
  const classes = useStyles()
  const { push } = useHistory()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [acceptMasDisclosure] = useAcceptMASDisclosure()
  const acceptDisclosure = async () => {
    await acceptMasDisclosure()
  }
  const handleClose = () => {
    push(generatePath(InvestRoute.overview))
  }

  return (
    <Dialog open={isOpen} maxWidth={'md'} classes={{ paper: classes.root }}>
      <DialogTitle classes={{ root: classes.title }}>
        Disclosures
      </DialogTitle>
      <DialogContentText classes={{ root: classes.content }}>
        <Box className={classes.scrollable}>{renderStringToHTML(content)}</Box>
        <VSpacer size={'medium'} />
        <Divider />
      </DialogContentText>
      <DialogActions classes={{ root: classes.actions }}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <Box className={classes.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onClick={() => setIsChecked(!isChecked)}
                  />
                }
                label={'I agree, accept and understand all the disclosures'}
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
        <Grid container justifyContent={'flex-end'} style={{ marginLeft: 0 }}>
          <Grid item>
            <Button
              type={'button'}
              className={classes.button}
              variant={'outlined'}
              color={'primary'}
              onClick={handleClose}
            >
              Decline
            </Button>
          </Grid>
          <Grid item style={{ marginLeft: 20 }}>
            <Button
              type={'button'}
              className={classes.button}
              variant={'contained'}
              color={'primary'}
              disabled={!isChecked}
              onClick={acceptDisclosure}
            >
              I Agree
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
