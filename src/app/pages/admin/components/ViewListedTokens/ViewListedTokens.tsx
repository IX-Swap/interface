import React from 'react'
import { Button, FormControlLabel, Grid, RadioGroup } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface ViewListedTokensProps {
  radioValue: string
  onRadioChange: (value: string) => void
  onButtonClick: () => void
}

export const ViewListedTokens = ({
  radioValue,
  onRadioChange,
  onButtonClick
}: ViewListedTokensProps) => {
  return (
    <Grid item container direction={'column'}>
      <RadioGroup
        onChange={e => onRadioChange(e.target.value)}
        value={radioValue}
      >
        <FormControlLabel label='Hex' value='hex' control={<UIRadio />} />
        <FormControlLabel
          label='InvestaX'
          value='investax'
          control={<UIRadio />}
        />
      </RadioGroup>
      <VSpacer size={'small'} />

      <Button
        data-testid={'button'}
        variant={'contained'}
        color={'primary'}
        style={{ width: 172 }}
        onClick={onButtonClick}
      >
        View Listed Tokens
      </Button>
    </Grid>
  )
}
