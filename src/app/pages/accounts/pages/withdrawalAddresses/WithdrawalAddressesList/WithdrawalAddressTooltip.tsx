import { IconButton, Tooltip, TooltipProps } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'
import { useStyles } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressTooltip.styles'
import React from 'react'

export interface WithdrawalAddressTooltipProps extends Partial<TooltipProps> {}

export const WithdrawalAddressTooltip = ({
  title = 'Adding your withdrawal/wallet address helps you to interact with our system. This will be needed to receive security tokens that you have invested on.',
  placement = 'top-end'
}: WithdrawalAddressTooltipProps) => {
  const { iconButton } = useStyles()

  return (
    <Tooltip arrow placement={placement} title={title}>
      <IconButton color='primary' className={iconButton} size="large">
        <InfoOutlined />
      </IconButton>
    </Tooltip>
  );
}
