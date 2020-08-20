import React, { useEffect } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  Box,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { BaseFilter } from 'v2/types/util'
import { Asset } from 'v2/types/asset'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { useStore } from 'v2/context/balances'
import { useObserver } from 'mobx-react'
import storageHelper from 'v2/helpers/storageHelper'
import { noop } from 'lodash'

interface FilterProps {
  filters: BaseFilter
  assets: Asset[]
  handleAssetChange: (ev: React.ChangeEvent<{ value: unknown }>) => void
  handleDateChange: (name: 'to' | 'from', date: MaterialUiPickersDate) => void
}

const useStyles = makeStyles({
  form: {
    width: 270
  }
})

const BalancesSelect = ({
  handleAssetChange,
  filters
}: Partial<FilterProps>) => {
  const classes = useStyles()
  const balancesState = useStore()

  useEffect(() => {
    balancesState
      .getAllBalances(storageHelper.getUserId())
      .then(noop)
      .catch(noop)
  }, [balancesState])

  return useObserver(() => (
    <FormControl margin='normal' className={classes.form}>
      <InputLabel id='currency-selector-value-label'>Asset</InputLabel>
      <Select
        fullWidth
        label='Asset'
        labelId='currency-selector'
        id='currency-selector-value'
        value={filters?.asset ?? ''}
        onChange={handleAssetChange}
      >
        {Object.values(balancesState.balances).map((item) => (
          <MenuItem key={item.assetId} value={item.assetId}>
            {item.symbol}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ))
}

const TransactionsFilter = ({
  filters,
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
                onChange={(date) => handleDateChange('from', date)}
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
              onChange={(date) => handleDateChange('to', date)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              autoOk
            />
          </Grid>
          <Grid item xs={12} sm={3} justify='flex-end' container>
            <BalancesSelect
              filters={filters}
              handleAssetChange={handleAssetChange}
            />
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  )
}

export default TransactionsFilter
