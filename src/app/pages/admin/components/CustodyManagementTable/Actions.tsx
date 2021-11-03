import React from 'react'
import {
  Launch as LaunchIcon,
  LinkOff as LinkOffIcon
} from '@material-ui/icons'
import { Box, IconButton } from '@material-ui/core'
import { CustodyAccountsListItem } from 'types/custodyAccount'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { CustodyManagementRoute as paths } from 'app/pages/admin/router/config'
import { ActionsProps } from 'app/pages/authorizer/components/Actions'

export interface CustodyActionsProps {
  item: ActionsProps<CustodyAccountsListItem>
  onLinkOffButtonClick: (item: CustodyAccountsListItem) => void
}

export const Actions = ({
  item,
  onLinkOffButtonClick
}: CustodyActionsProps) => {
  const handleLinkOffButtonClick = () => {
    onLinkOffButtonClick(item.item)
  }
  const isInvestaXAccount = item.item.type === 'INVESTAX'

  return (
    <Box display={'flex'} justifyContent={'space-around'}>
      <IconButton
        disabled={isInvestaXAccount}
        component={AppRouterLinkComponent}
        to={paths.custodyDetails}
        params={{ accountId: item.item.accountId }}
        size='small'
      >
        <LaunchIcon
          color='disabled'
          style={{ opacity: isInvestaXAccount ? 0.4 : 1 }}
        />
      </IconButton>
      <IconButton
        data-testid={'link-off'}
        size='small'
        onClick={handleLinkOffButtonClick}
      >
        <LinkOffIcon color='disabled' />
      </IconButton>
    </Box>
  )
}
