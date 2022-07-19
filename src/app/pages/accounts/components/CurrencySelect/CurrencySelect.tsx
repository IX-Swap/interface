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

  if (accounts === undefined || accounts.length < 1) {
    return null
  }

  return (
    <RadioGroup defaultValue={props.defaultValue} value={props.value}>
      <Grid container className={classes.wrapper}>
        {accounts.map((item: VirtualAccount) => {
          const isActive =
            item.accountNumber === props.value ||
            item.accountNumber === props.defaultValue

          return (
            <Grid
              item
              key={item._id}
              className={classnames(classes.button, {
                [classes.active]: isActive
              })}
              onClick={() => onButtonClick(item.accountNumber)}
            >
              <FormControlLabel
                label={item.currency}
                value={item.accountNumber}
                checked={
                  item.accountNumber === props.value ||
                  item.accountNumber === props.defaultValue
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
