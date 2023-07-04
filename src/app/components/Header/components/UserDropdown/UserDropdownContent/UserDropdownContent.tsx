import React, { Fragment } from 'react'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { SecurityRoute } from 'app/pages/security/router/config'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useLogout } from 'auth/hooks/useLogout'
import { useIsAdmin, useIsClient, useIsAuthorizer } from 'helpers/acl'
import {
  AccountCircleOutlined,
  PowerSettingsNewOutlined,
  SettingsOutlined
  //   Payment,
  //   Token,
  //   ReceiptLong,
  //   AccountBalanceWallet,
  //   SummarizeOutlined,
  //   CurrencyExchangeRounded
} from '@mui/icons-material'
import { Box, List } from '@mui/material'
import { UserDropdownItem } from 'app/components/Header/components/UserDropdown/UserDropdownItem/UserDropdownItem'
import { UserDropdownInfo } from 'app/components/Header/components/UserDropdown/UserDropdownInfo/UserDropdownInfo'
import { DropdownContentProps } from 'app/components/Header/components/Dropdown/Dropdown'
import { useStyles } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent.styles'
import { AppRoute } from 'app/router/config'
import { AccountsRoute } from 'app/pages/accounts/router/config'

export const UserDropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const logout = useLogout()
  const isAdmin = useIsAdmin()
  const isClient = useIsClient()
  const isAuthorizer = useIsAuthorizer()
  const handleClose = props.injectedProps.close
  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <UserDropdownInfo />
        <List className={classes.list}>
          <Box className={classes.border} />
          <UserDropdownItem
            icon={AccountCircleOutlined}
            label='Profile'
            link={IdentityRoute.list}
            onClose={handleClose}
          />
          {isAdmin && (
            <>
              <Box className={classes.border} />
              <UserDropdownItem
                icon={AccountCircleOutlined}
                label='Admin'
                link={AdminRoute.landing}
                onClose={handleClose}
              />
            </>
          )}
          {isAdmin || isClient || isAuthorizer ? (
            <>
              <Box className={classes.border} />
              <UserDropdownItem
                icon={AccountCircleOutlined}
                label='Client Space'
                link={AppRoute.editClientSpace}
                onClose={handleClose}
              />
            </>
          ) : (
            ''
          )}
          <Box className={classes.border} />
          <UserDropdownItem
            icon={AccountCircleOutlined}
            label='Accounts'
            link={AccountsRoute.landing}
            onClose={handleClose}
          />
          {/* <UserDropdownItem
            icon={Payment}
            label='Cash'
            link={AccountsRoute.cash}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={AccountCircleOutlined}
            label='Commitments'
            link={AccountsRoute.commitments}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={Token}
            label='Security Tokens'
            link={AccountsRoute.digitalSecurities}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={ReceiptLong}
            label='Transactions'
            link={AccountsRoute.transactions}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={AccountBalanceWallet}
            label='Wallet Addresses'
            link={AccountsRoute.withdrawalAddresses}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={SummarizeOutlined}
            label='My Reports'
            link={AccountsRoute.reports}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={CurrencyExchangeRounded}
            label='My Exchanges Holdings'
            link={AccountsRoute.myHoldings}
            onClose={handleClose}
          /> */}
          <Box className={classes.border} />
          <UserDropdownItem
            icon={SettingsOutlined}
            label='Settings'
            link={SecurityRoute.landing}
            onClose={handleClose}
          />
          <Box className={classes.border} />
          <UserDropdownItem
            icon={PowerSettingsNewOutlined}
            label='Sign Out'
            onClick={logout}
            onClose={handleClose}
          />
        </List>
      </Box>
    </Fragment>
  )
}
