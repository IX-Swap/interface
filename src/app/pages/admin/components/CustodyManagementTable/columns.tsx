import React from 'react'
import { TableColumn } from 'types/util'
import { VAAuditOutboundItem } from 'types/virtualAccount'
import { Grid, IconButton } from '@material-ui/core'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { useServices } from 'hooks/useServices'

const renderWalletAddress = (address: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { snackbarService } = useServices()
  const firstPart = address.slice(0, 4)
  const secondPart = '...'
  const thirdPart = address.slice(address.length - 4, address.length)
  const result = firstPart.concat(secondPart, thirdPart)

  if (address === '' || address === null) {
    return '-'
  }
  return (
    <Grid container alignItems={'center'}>
      <Grid item>{result}</Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            void navigator.clipboard.writeText(address)
            void snackbarService.showSnackbar('Copied!', 'success')
          }}
        >
          <FileCopyOutlinedIcon style={{ color: '#AAAAAA' }} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export const columns: Array<TableColumn<VAAuditOutboundItem>> = [
  {
    key: 'assigned',
    label: 'Assigned'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'investor',
    label: 'Investor'
  },
  {
    key: 'custodian',
    label: 'Custodian'
  },
  {
    key: 'walletAddress',
    label: 'Wallet Address',
    render: renderWalletAddress
  },
  {
    key: 'accountID',
    label: 'Account ID'
  }
]
