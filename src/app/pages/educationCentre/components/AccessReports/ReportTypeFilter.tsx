import React from 'react'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { FormControl, FormControlLabel, Grid, RadioGroup } from '@mui/material'
import { UIRadio } from 'components/UIRadio/UIRadio'

export const ReportTypeFilter = () => {
  return (
    <SearchQueryFilter<'reportType'> name='reportType' defaultValue='INVESTAX'>
      {({ value, onChange }) => (
        <>
          <FormControl component='fieldset'>
            <RadioGroup
              name='reportType'
              value={value}
              onChange={(_: any, value?: string) => onChange(value)}
            >
              <Grid container spacing={2} justifyContent='flex-start'>
                <Grid item>
                  <FormControlLabel
                    value='INVESTAX'
                    control={<UIRadio checked={value === 'INVESTAX'} />}
                    label='InvestaX'
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value='ATLAS_ONE'
                    control={<UIRadio checked={value === 'ATLAS_ONE'} />}
                    label='Atlas One'
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </>
      )}
    </SearchQueryFilter>
  )
}
