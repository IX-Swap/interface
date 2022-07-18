import React, { useState } from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { Select } from 'ui/Select/Select'
import { Icon } from 'ui/Icons/Icon'
import { renderNewAmount } from 'helpers/numbers'
import { useStyles } from './CashBalance.styles'
import { AccountsRoute } from 'app/pages/accounts/router/config'

export const CashBalance = () => {
  const classes = useStyles()
  const [virtualAccountId, setVirtualAccountId] = useState<string | undefined>(
    undefined
  )
  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Paper className={classes.wrapper}>
      <Grid
        container
        spacing={3}
        wrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid item xs={12} sm={'auto'}>
          <InputLabel style={{ marginBottom: 0 }}>
            <Typography color={'text.secondary'}>Available Balance</Typography>
          </InputLabel>
          <Select
            variant='filled'
            defaultValue={data.currency}
            classes={{
              icon: classes.icon,
              iconOpen: classes.iconOpen,
              filled: classes.filled
            }}
            MenuProps={{
              classes: { paper: classes.menuPaper, list: classes.menuList }
            }}
            renderValue={() => (
              <Typography fontSize={24} fontWeight={600} display={'inline'}>
                {renderNewAmount(data.balance.outstanding)}{' '}
                <Typography
                  fontSize={'inherit'}
                  fontWeight={'inherit'}
                  display={'inline'}
                  color={'text.secondary'}
                >
                  {data.currency}
                </Typography>
              </Typography>
            )}
            IconComponent={props => <Icon name='chevron-down' {...props} />}
          >
            {list.map(item => (
              <SelectItem
                key={item._id}
                value={item.currency}
                onClick={() => setVirtualAccountId(item.accountNumber)}
              >
                {item.currency}
              </SelectItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={'auto'}
          spacing={2}
          justifyContent={'center'}
          wrap={'nowrap'}
        >
          <Grid item xs={6} sm={'auto'}>
            <Button
              fullWidth
              variant='outlined'
              disableElevation
              component={AppRouterLinkComponent}
              to={AccountsRoute.withdraw}
              className={classes.button}
            >
              Withdraw
            </Button>
          </Grid>

          <Grid item xs={6} sm={'auto'}>
            <Button
              fullWidth
              variant='contained'
              disableElevation
              component={AppRouterLinkComponent}
              to={AccountsRoute.deposit}
              className={classes.button}
            >
              Deposit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
