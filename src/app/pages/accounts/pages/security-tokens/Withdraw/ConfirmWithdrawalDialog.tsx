import {
  DialogActions,
  Typography,
  Grid,
  Button,
  Box,
  useTheme
} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { Asset } from 'types/asset'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { formatAmountValue } from 'helpers/numbers'
import { ReactComponent as SGDIcon } from 'assets/icons/flags/sgd.svg'
import { ReactComponent as USDIcon } from 'assets/icons/flags/usd.svg'

export interface ConfirmWithdrawalDialogProps {
  open: boolean
  close: () => void
  confirm: Function
  walletName: string
  walletAddress: string
  token: Asset
  withdrawalAmount: string
  currency: string
  withdrawalFee: number
  memo: string
}

export const ConfirmWithdrawalDialog = ({
  open,
  close,
  confirm,
  walletName,
  walletAddress,
  token,
  withdrawalAmount,
  currency,
  withdrawalFee,
  memo
}: ConfirmWithdrawalDialogProps) => {
  const theme = useTheme()

  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      padding: '15px',
      marginTop: '10px',
      width: '495px',
      maxWidth: '100%',
      height: '60px',
      gap: 10
    },
    field: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: '25px 0'
    },
    walletAddress: {
      color: theme.palette.tooltip.color,
      flex: 1,
      minWidth: 0,
      overflowWrap: 'break-word',
      textAlign: 'right'
    },
    amountContainer: {
      display: 'flex',
      paddingTop: 3,
      justifyContent: 'space-between',
      marginTop: theme.spacing(1.5)
    },
    amount: {
      fontSize: '40px !important',
      fontWeight: 600
    },
    fee: {
      fontSize: '24px !important',
      fontWeight: 600
    },
    token: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }))

  const classes = useStyles()

  return (
    <UIDialog onClose={close} open={open}>
      <Box py={4} px={3}>
        <Typography variant='h3' align='center'>
          Please Confirm <br />
          STO Withdrawal
        </Typography>

        <Typography color='tooltip.color' textAlign={'center'} mt={5}>
          Please ensure that the wallet address and the blockchain network
          supports the tokens. You will lose your tokens if the chosen wallet
          address does not support it.
        </Typography>

        <Box display={'flex'} flexDirection={'column'} p={1} mb={3}>
          <Box className={classes.field}>
            <Typography>Withdraw to</Typography>
            <Box className={classes.container}>
              <Typography>{walletName}</Typography>
              <Typography className={classes.walletAddress}>
                {walletAddress}
              </Typography>
            </Box>
          </Box>
          <Box pt={3} className={classes.field}>
            <Typography>Withdrawal Amount</Typography>
            <Box className={classes.amountContainer}>
              <Typography className={classes.amount}>
                {formatAmountValue(Number(withdrawalAmount))}
              </Typography>
              <Box className={classes.token}>
                <DSOLogo
                  size={24}
                  uri={'/dataroom/raw/'}
                  dsoId={token?.logo}
                  variant='circular'
                />
                <Typography>{token?.symbol}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={3} className={classes.field}>
            <Typography>Withdrawal Fee</Typography>
            <Box className={classes.amountContainer}>
              <Typography className={classes.fee}>
                {formatAmountValue(withdrawalFee)}
              </Typography>
              <Box className={classes.token}>
                {currency === 'USD' ? (
                  <USDIcon width={24} height={24} />
                ) : (
                  <SGDIcon width={24} height={24} />
                )}
                <Typography>{currency}</Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={3}>
            <Typography>Memo</Typography>
            <Typography color='tooltip.color' mt={1.5}>
              {memo}
            </Typography>
          </Box>
        </Box>
        <DialogActions>
          <Grid display={'flex'} gap={3} container alignItems={'center'}>
            <Grid item xs>
              <Button
                size='large'
                variant='outlined'
                color='primary'
                onClick={close}
                fullWidth
                disableElevation
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                size='large'
                variant='contained'
                onClick={() => {
                  confirm()
                  close()
                }}
                fullWidth
                disableElevation
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </UIDialog>
  )
}