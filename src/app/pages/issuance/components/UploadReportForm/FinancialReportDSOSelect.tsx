import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import React from 'react'
import {
  Select,
  Typography,
  Grid,
  FormControl,
  SelectChangeEvent
} from '@mui/material'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const FinancialReportDSOSelect = () => {
  const { data, isLoading } = useDSOsByUserId('Approved', true)

  if (data.list.length < 1 || isLoading) {
    return null
  }

  return (
    <SearchQueryFilter<'dso'> name='dso' defaultValue={data.list[0]._id}>
      {({ value, onChange }) => (
        <>
          {value !== undefined && value !== '' && (
            <>
              {data.list.length > 1 ? (
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
                          event: SelectChangeEvent<{ value: string }>
                        ) => {
                          onChange(event.target.value as string)
                        }}
                        // @ts-expect-error
                        value={value}
                        // @ts-expect-error
                        defaultValue={value}
                      >
                        {data.list.map(({ _id, tokenName }) => {
                          return (
                            <SelectItem value={_id} key={_id}>
                              {tokenName}
                            </SelectItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant='h2' sx={{ fontSize: '1.285rem' }}>
                  {data.list[0].tokenName}
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </SearchQueryFilter>
  )
}
