/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import {
  Button,
  DialogTitle,
  Box,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useHistory, useParams } from 'react-router-dom'
import { CustodyManagementRoute } from 'app/pages/admin/router/config'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/pages/admin/components/CustodyDetailsDialog/CustodyDetailsDialog.styles'
import { useGetCustodianDetails } from 'app/pages/admin/hooks/useGetCustodianDetails'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { Wallet } from 'types/custodyAccount'
import { UIDialog } from 'ui/UIDialog/UIDialog'

export const getWalletsWithOrderedDetails = (wallets: Wallet[]) =>
  wallets.map(({ asset_tickers, wallet_name }) => ({
    wallet_name,
    asset_tickers
  }))

export const CustodyDetailsDialog = () => {
  const { replace } = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const params = useParams<{ accountId: string }>()

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data, isLoading } = useGetCustodianDetails(params.accountId)

  if (data === undefined) {
    return null
  }

  const { user, wallets, account_id, account_name } = data

  const details = {
    account_id,
    account_name,
    wallets: getWalletsWithOrderedDetails(wallets)
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <UIDialog
      open
      fullWidth
      maxWidth={'md'}
      fullScreen={fullScreen}
      className={classes.root}
      onClose={() => replace(CustodyManagementRoute.main)}
    >
      <DialogTitle>
        <Box p={4} justifyContent='center' textAlign='center'>
          Tokens Supported for the {user.name}
        </Box>
      </DialogTitle>
      <DialogContent className={classes.contentWrapper}>
        <VSpacer size={'small'} />
        <Box
          alignItems='center'
          justifyContent='center'
          className={classes.content}
        >
          <pre data-testid={'content'}>{JSON.stringify(details, null, 1)}</pre>
        </Box>
      </DialogContent>
      <VSpacer size={'small'} />
      <DialogActions className={classes.actions}>
        <Button
          fullWidth
          size='large'
          color='primary'
          variant='contained'
          onClick={() => replace(CustodyManagementRoute.main)}
        >
          Okay
        </Button>
      </DialogActions>
    </UIDialog>
  )
}
