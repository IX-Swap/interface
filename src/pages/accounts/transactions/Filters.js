import React from 'react'
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Box
} from '@material-ui/core'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'

import type { Filters } from 'pages/accouns/transactions'

type FilterProps = {
  filters: Filters,
  assets: Array<Asset>,
  handleAssetChange: (ev: SyntheticInputEvent<HTMLElement>) => void,
  handleDateChange: (name: "to" | "from", date: Date) => void
};

const useStyles = makeStyles({
  form: {
    width: 270
  }
})

const FiltersComponent = ({
  filters,
  assets,
  handleAssetChange,
  handleDateChange
}: FilterProps) => {
  const classes = useStyles()
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box mx={4}>
        <Grid container justify='space-between'>
          <Grid item container direction='row' xs={12} sm={9}>
            <Box mr={2}>
              <KeyboardDatePicker
                className={classes.form}
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='from-filter'
                label='From'
                value={filters.from}
                onChange={date => handleDateChange('from', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                autoOk
              />
            </Box>
            <KeyboardDatePicker
              className={classes.form}
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='to-filter'
              label='To'
              value={filters.to}
              onChange={date => handleDateChange('to', date)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              autoOk
            />
          </Grid>
          <Grid item xs={12} sm={3} justify='flex-end' container>
            {assets && (
              <FormControl margin='normal' className={classes.form}>
                <InputLabel id='currency-selector-value-label'>
                  Asset
                </InputLabel>
                <Select
                  fullWidth
                  label='Asset'
                  labelId='currency-selector'
                  id='currency-selector-value'
                  value={filters.asset}
                  onChange={handleAssetChange}
                >
                  {assets.map(item => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  )
}

export default FiltersComponent
