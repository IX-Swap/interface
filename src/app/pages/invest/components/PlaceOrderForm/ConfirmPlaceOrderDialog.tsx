import { DialogActions, Typography, Grid, Button } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'
import { useMarket } from '../../hooks/useMarket'

export interface ConfirmPlaceOrderDialogProps {
  activeTabNameIdx: number
  pairId: string
  open: boolean
  values: any
  close: () => void
  submitForm: () => any
}

export const ConfirmPlaceOrderDialog = ({
  open,
  close,
  pairId,
  activeTabNameIdx,
  values,
  submitForm
}: ConfirmPlaceOrderDialogProps) => {
  const classes = useStyles()
  const { data: marketData } = useMarket(pairId)
  const onYes = () => {
    submitForm()
  }
  return (
    <UIDialog open={open} onClose={close}>
      <Typography
        variant='h3'
        marginTop={'20px'}
        marginBottom={'10px'}
        align='center'
      >
        Please Confirm Order Placement
      </Typography>
      <VSpacer size='small' />
      <Grid gap={25} display={'flex'}>
        <Grid>
          <Typography variant='body1' align='left'>
            Order Type
          </Typography>
        </Grid>
        <Grid>
          <Typography variant='body1' align='right'>
            Trading Pair
          </Typography>
        </Grid>
      </Grid>

      <VSpacer size='small' />

      <Grid gap={31} display={'flex'}>
        <Grid>
          <Typography
            color={activeTabNameIdx === 0 ? '#1FBC2F' : '#F44949'}
            variant='body1'
            align='left'
          >
            {activeTabNameIdx === 0 ? 'BUY' : 'SELL'}
          </Typography>
        </Grid>
        <Grid>
          <Typography color={'#778194'} variant='body1' align='right'>
            {marketData?.name}
          </Typography>
        </Grid>
      </Grid>

      <VSpacer size='medium' />

      <Grid gap={30.6} display={'flex'}>
        <Grid>
          <Typography variant='body1' align='left'>
            Price
          </Typography>
        </Grid>
        <Grid>
          <Typography variant='body1' align='right'>
            Quantity
          </Typography>
        </Grid>
      </Grid>
      <VSpacer size='small' />

      <Grid gap={33.8} display={'flex'}>
        <Grid>
          <Typography color={'#778194'} variant='body1' align='left'>
            {values?.price}
          </Typography>
        </Grid>
        <Grid>
          <Typography color={'#778194'} variant='body1' align='right'>
            {values?.amount}
          </Typography>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid className={classes.verticalLine} item></Grid>

      <VSpacer size='small' />
      <Grid>
        <Grid item>
          <Typography variant='body1' align='left'>
            Total Price
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            marginTop={'14px'}
            color={'#778194'}
            variant='body1'
            align='left'
          >
            {values?.total}
          </Typography>
        </Grid>
      </Grid>
      <VSpacer size='small' />
      <Grid className={classes.verticalLine} item></Grid>
      <DialogActions>
        <Grid gap={5} display={'flex'}>
          <Grid item>
            <Button
              style={{ padding: '16px 100px' }}
              variant='outlined'
              color='primary'
              onClick={close}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ padding: '16px 110px' }}
              variant='contained'
              color='primary'
              onClick={onYes}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}
