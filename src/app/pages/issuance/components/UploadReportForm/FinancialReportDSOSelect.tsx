import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import {
  MenuItem,
  Select,
  Typography,
  Grid,
  FormControl
} from '@material-ui/core'

export const FinancialReportDSOSelect = () => {
  const { data, isLoading } = useDSOsByUserId('Approved', true)

  if (data.list.length < 1 || isLoading) {
    return null
  }

  return (
    <SearchQueryFilter<'dso'> name='dso' defaultValue={data.list[0]._id}>
      {({ value, onChange }) => (
        <>
          {value !== undefined && (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  Select the DSO you want to add the report for
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl size='small' fullWidth>
                  <Select
                    fullWidth
                    variant='outlined'
                    onChange={(
                      event: React.ChangeEvent<{ value: unknown }>
                    ) => {
                      onChange(event.target.value as string)
                    }}
                    value={value}
                    defaultValue={value}
                  >
                    {data.list.map(({ _id, tokenName }) => {
                      return (
                        <MenuItem value={_id} key={_id}>
                          {tokenName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </SearchQueryFilter>
  )
}
