import React from 'react'
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup
} from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'

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
        <FormControlLabel label='Hex' value='hex' control={<Radio />} />
        <FormControlLabel
          label='InvestaX'
          value='investax'
          control={<Radio />}
        />
      </RadioGroup>
      <VSpacer size={'small'} />

      <Button
        variant={'contained'}
        color={'primary'}
        style={{ width: 172 }}
        onClick={() => onButtonClick()}
      >
        View Listed Tokens
      </Button>
    </Grid>
  )
}
