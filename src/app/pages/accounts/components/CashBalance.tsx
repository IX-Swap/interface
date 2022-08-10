import { Grid, Paper, Typography } from '@mui/material'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { renderMoney } from 'helpers/numbers'
import React, { useState } from 'react'
import { Icon } from 'ui/Icons/Icon'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { useStyles } from './CashBalance.styles'
import classnames from 'classnames'

export interface CashBalanceProps {
  title?: string
  withoutBackground?: boolean
  defaultCurrency?: 'SGD' | 'USD'
  noSelect?: boolean
}

export const CashBalance = ({
  title = 'Available Balance',
  withoutBackground = false,
  defaultCurrency = 'USD',
  noSelect = false
}: CashBalanceProps) => {
  const classes = useStyles()
  const [virtualAccountId, setVirtualAccountId] = useState<string | undefined>(
    undefined
  )
  const { data, list, isLoading } = useVirtualAccount(virtualAccountId)

  if (!noSelect) {
    if (isLoading || data === undefined || list === undefined) {
      return null
    }
  }

  const sumOfSGDValues =
    list?.reduce((acc, item) => acc + (item.balance.sgdValue ?? 0), 0) ?? 0
  const sumOfUSDValues =
    list?.reduce((acc, item) => acc + (item.balance.usdValue ?? 0), 0) ?? 0

  const getSumBalanceOfAllAccounts = () => {
    return data.currency === 'SGD' ? sumOfSGDValues : sumOfUSDValues
  }

  const renderValue = (value: number, currency: string) => (
    <Typography
      className={classnames(classes.valueBlock, {
        [classes.valueNoSelect]: noSelect
      })}
    >
      {renderMoney(value, '')}{' '}
      <Typography className={classes.currency}>{currency}</Typography>
    </Typography>
  )

  return (
    <Paper
      className={classnames(classes.wrapper, {
        [classes.withoutBackground]: withoutBackground
      })}
    >
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item flexBasis={'auto'}>
          <InputLabel style={{ marginBottom: 0 }}>
            <Typography color={'text.secondary'} textAlign={'center'}>
              {title}
            </Typography>
          </InputLabel>
          {!noSelect ? (
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
              renderValue={() =>
                renderValue(getSumBalanceOfAllAccounts(), data.currency)
              }
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
          ) : (
            renderValue(
              defaultCurrency === 'SGD' ? sumOfSGDValues : sumOfUSDValues,
              defaultCurrency
            )
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}
