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
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { isEmpty } from 'lodash'

export interface ConfirmDepositDialogProps {
  open: boolean
  close: () => void
  confirm: Function
  depositMethod: string
  walletAddress: string
  network: string
  token: Asset
  depositAmount: string
}

export const ConfirmDepositDialog = ({
  open,
  close,
  confirm,
  depositMethod,
  walletAddress,
  network,
  token,
  depositAmount
}: ConfirmDepositDialogProps) => {
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
      overflowWrap: 'break-word',
      minWidth: 0
    },
    network: {
      backgroundColor: theme.palette.paginationItem.borderHover,
      borderRadius: '4px',
      color: theme.palette.primary.main,
      padding: '4px 8px'
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
          STO Deposit
        </Typography>
        <Box display={'flex'} flexDirection={'column'} p={1} mb={3}>
          {!isEmpty(depositMethod) && (
            <Box className={classes.field}>
              <Typography>Deposit Method</Typography>
              <Box className={classes.container}>
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  <Typography fontSize={'20px'} fontWeight={600}>
                    {SUPPORTED_WALLETS[depositMethod].name}
                  </Typography>
                  <img
                    src={SUPPORTED_WALLETS[depositMethod].iconURL}
                    alt={SUPPORTED_WALLETS[depositMethod].name}
                    width={'20'}
                    height={'20'}
                  />
                </Box>
              </Box>
            </Box>
          )}
          <Box className={classes.field}>
            <Typography>Wallet Address</Typography>
            <Box className={classes.container}>
              <Typography className={classes.walletAddress}>
                {walletAddress}
              </Typography>
              <Typography className={classes.network}>
                {network ?? 'Unsupported Network'}
              </Typography>
            </Box>
          </Box>
          <Box pt={3}>
            <Typography>Deposit Amount</Typography>
            <Box className={classes.amountContainer}>
              <Typography className={classes.amount}>
                {formatAmountValue(depositAmount)}
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
