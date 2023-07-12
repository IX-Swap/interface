import React, { ChangeEvent } from 'react'
import { FormControl, FormControlLabel, RadioGroup, Grid } from '@mui/material'
import { LabelWithTooltip } from 'ui/LabelWithTooltip/LabelWithTooltip'
import { UIRadio } from 'components/UIRadio/UIRadio'

interface RadioToggleProps {
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  isIndividual?: boolean
}

export const RadioToggle = ({
  onChange,
  isIndividual = true
}: RadioToggleProps) => (
  <Grid width={'100%'} item display={'flex'}>
    <FormControl sx={{ width: '100%' }}>
      <RadioGroup row name='identity-type' onChange={onChange}>
        <Grid display={'flex'} justifyContent={'space-evenly'} container mt={3}>
          <Grid>
            <FormControlLabel
              value='individual'
              control={<UIRadio />}
              label={
                <LabelWithTooltip
                  label='Individual Account'
                  tooltipTitle={
                    'For users signing up to be an investor on a personal capacity'
                  }
                />
              }
              checked={isIndividual}
            />
          </Grid>
          <FormControlLabel
            value='corporate'
            control={<UIRadio />}
            label={
              <LabelWithTooltip
                label='Corporate Account'
                tooltipTitle={
                  'For users signing up their corporate entity as an investor'
                }
              />
            }
            checked={!isIndividual}
          />
        </Grid>
      </RadioGroup>
    </FormControl>
  </Grid>
)
