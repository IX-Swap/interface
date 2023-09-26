import { DialogActions, Typography, Grid, Button, Link } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React, { useEffect } from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { useStyles } from 'ui/UIDialog/UIDialog.styles'
import { useMarket } from '../../hooks/useMarket'
import { Tooltip } from 'ui/Tooltip/Tooltip'
import { WEBSITE_URL } from 'config'
import { formatAmount } from 'helpers/numbers'
import { useGetEstimateFee } from 'app/pages/issuance/hooks/useGetEstimateFee'

export interface ConfirmPlaceOrderDialogProps {
  activeTabNameIdx: number
  pairId: string
  open: boolean
  values: any
  close: () => void
  isExchangeEnabled: any
  onSubmit: (bank: any) => Promise<any>
}

export const ConfirmPlaceOrderDialog = ({
  open,
  close,
  pairId,
  activeTabNameIdx,
  values,
  onSubmit
}: ConfirmPlaceOrderDialogProps) => {
  const classes = useStyles()
  const { data: marketData } = useMarket(pairId)
  const pairName = marketData?.name?.split('/') ?? ['', '']
  const isBuying = activeTabNameIdx === 0
  const side = isBuying ? 'BID' : 'ASK'
  const price = (values?.price ?? 0).toString()
  const amount = (values?.amount ?? 0).toString()

  const { data: estimateFee, refetch } = useGetEstimateFee(
    pairId,
    side,
    'LIMIT',
    price,
    amount
  )

  useEffect(() => {
    void refetch()
  }, [values, refetch])

  const fee = estimateFee?.data ?? 0
  const totalPrice =
    parseFloat(values?.total ?? 0) + parseFloat(isBuying ? fee : 0)

  return (
    <UIDialog open={open} onClose={close}>
      <Typography
        variant='h3'
        marginTop={'40px'}
        marginBottom={'10px'}
        align='center'
      >
        Please Confirm
        <br /> Order Placement
      </Typography>

      <Grid display={'flex'} mt={3}>
        <Grid xs={6} className={classes.orderItem}>
          <Typography>Order Type</Typography>
          <Typography color={isBuying ? '#1FBC2F' : '#F44949'}>
            {isBuying ? 'Buy' : 'Sell'}
          </Typography>
        </Grid>
        <Grid xs={6} className={classes.orderItem} textAlign={'right'}>
          <Typography>Trading Pair</Typography>
          <Typography color={'#778194'}>{marketData?.name}</Typography>
        </Grid>
      </Grid>

      <Grid display={'flex'} mt={3}>
        <Grid xs={6} className={classes.orderItem}>
          <Typography>Price ({pairName[1]})</Typography>
          <Typography color={'#778194'}>
            {formatAmount(values?.price)}
          </Typography>
        </Grid>
        <Grid xs={6} className={classes.orderItem} textAlign={'right'}>
          <Typography>Quantity ({pairName[0]})</Typography>
          <Typography color={'#778194'}>{values?.amount}</Typography>
        </Grid>
      </Grid>

      <Grid className={classes.orderItem} mt={3}>
        <Grid display={'flex'} alignItems={'center'} gap={0.5}>
          <Typography>Est. Fee ({pairName[1]})</Typography>
          <Tooltip
            title={
              <div>
                <p style={{ marginTop: 0 }}>
                  <strong>Estimated Fee</strong> is calculated based on the
                  <Link
                    href={`${WEBSITE_URL}/faq/`}
                    sx={{ marginLeft: 0.5, textDecoration: 'none' }}
                    target='_blank'
                  >
                    trading fee
                  </Link>
                  . It is for reference only and is subject to the final
                  execution result. Fee levels may differ for Maker or Taker
                  trades.
                </p>
              </div>
            }
          />
        </Grid>

        <Typography color={'#778194'}>{formatAmount(fee)}</Typography>
      </Grid>

      <Grid className={classes.verticalLine} item my={3}></Grid>

      <Grid className={classes.orderItem} mt={3} textAlign={'right'}>
        <Typography fontSize={'16px'} fontWeight={600}>
          Total Price ({pairName[1]}){' '}
          {!isBuying && (
            <Tooltip
              title={
                <div>
                  <p style={{ marginTop: 0 }}>
                    Trading fees will be deducted when your order is settled
                  </p>
                </div>
              }
            />
          )}
        </Typography>
        <Typography fontSize={'16px'} fontWeight={600} color={'#778194'}>
          {formatAmount(totalPrice)}
        </Typography>
      </Grid>
      <VSpacer size='small' />
      <Grid className={classes.verticalLine} item></Grid>
      <DialogActions>
        <Grid display={'flex'} gap={3} width={'100%'}>
          <Button
            variant='outlined'
            size='large'
            color='primary'
            onClick={close}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={onSubmit}
            fullWidth
          >
            Confirm
          </Button>
        </Grid>
      </DialogActions>
    </UIDialog>
  )
}
