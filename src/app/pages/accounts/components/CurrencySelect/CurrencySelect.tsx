import React from 'react'
import {
  FormControlLabel,
  Grid,
  RadioGroup,
  RadioGroupProps
} from '@mui/material'
import { VirtualAccount } from 'types/virtualAccount'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import classnames from 'classnames'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export interface CurrencySelectProps extends RadioGroupProps {
  accounts: VirtualAccount[]
  onButtonClick?: (value: string) => void
}

export const CurrencySelect = ({
  onButtonClick = () => {},
  accounts,
  ...props
}: CurrencySelectProps) => {
  const classes = useStyles()
  const { getFilterValue, updateFilter } = useQueryFilter()
  if (accounts === undefined || accounts.length < 1) {
    return null
  }
  const accountFromFilter = getFilterValue('account')
  const initialValue = props.defaultValue ?? accountFromFilter
  const onChangeValue = (value: string) => {
    onButtonClick?.(value)
    updateFilter('account', value)
  }

  return (
    <RadioGroup defaultValue={initialValue} value={props.value}>
      <Grid container className={classes.wrapper}>
        {accounts.map((item: VirtualAccount) => {
          const isActive =
            item.accountNumber === props.value ||
            item.accountNumber === initialValue

          return (
            <Grid
              item
              key={item._id}
              className={classnames(classes.button, {
                [classes.active]: isActive
              })}
              onClick={() => onChangeValue(item.accountNumber)}
            >
              <FormControlLabel
                label={item.currency}
                value={item.accountNumber}
                checked={
                  item.accountNumber === props.value ||
                  item.accountNumber === initialValue
                }
                control={<UIRadio />}
              />
            </Grid>
          )
        })}
      </Grid>
    </RadioGroup>
  )
}
