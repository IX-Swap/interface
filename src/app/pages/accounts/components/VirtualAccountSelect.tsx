import {
  FormControlLabel,
  Grid,
  RadioGroup,
  RadioGroupProps,
  Typography
} from '@mui/material'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface VirtualAccountSelectProps extends RadioGroupProps {
  customLabel?: string
}

export const VirtualAccountSelect = (props: VirtualAccountSelectProps) => {
  const { list } = useVirtualAccount()

  if (list === undefined || list.length < 1) {
    return null
  }

  return (
    <RadioGroup
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      value={props.value}
    >
      <Grid container spacing={2} alignContent='center'>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>{props.customLabel}</Typography>
        </Grid>
        {list.map((item: VirtualAccount) => (
          <Grid item key={item._id}>
            <FormControlLabel
              label={`${item.accountNumber} (${item.currency})`}
              value={item.accountNumber}
              control={<UIRadio />}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  )
}
