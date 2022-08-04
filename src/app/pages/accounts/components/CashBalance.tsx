import { Grid, Paper, Typography } from '@mui/material'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { renderMoney } from 'helpers/numbers'
import React, { useState } from 'react'
import { Icon } from 'ui/Icons/Icon'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { useStyles } from './CashBalance.styles'

export const CashBalance = () => {
  const classes = useStyles()
  const [virtualAccountId, setVirtualAccountId] = useState<string | undefined>(
    undefined
  )
  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  if (isLoading || data === undefined) {
    return null
  }

  const getSumBalanceOfAllAccounts = () => {
    const sumOfSGDValues = list.reduce(
      (acc, item) => acc + (item.balance.sgdValue ?? 0),
      0
    )
    const sumOfUSDValues = list.reduce(
      (acc, item) => acc + (item.balance.usdValue ?? 0),
      0
    )

    return data.currency === 'SGD' ? sumOfSGDValues : sumOfUSDValues
  }

  return (
    <Paper className={classes.wrapper}>
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item flexBasis={'auto'}>
          <InputLabel style={{ marginBottom: 0 }}>
            <Typography color={'text.secondary'} textAlign={'center'}>
              Available Balance
            </Typography>
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
                {renderMoney(getSumBalanceOfAllAccounts(), '')}{' '}
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
      </Grid>
    </Paper>
  )
}
