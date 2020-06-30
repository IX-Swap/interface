import React, { useState } from 'react'
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {
  Subject as UnauthorizedIcon,
  Assignment as AllIcon,
  AssignmentTurnedIn as ApprovedIcon,
  Gavel as RejectedIcon,
  Search as SearchIcon,
  DateRange as DateIcon
} from '@material-ui/icons'

// import { formatISO } from 'date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import StatusFilter from './status-filter'
import { BaseFilter, AuthorizableStatus } from '../../../../../../types/util'
import { formatISO } from 'date-fns'

const useStyles = makeStyles(() => ({
  filtersLabel: {
    color: '#999999',
    fontSize: '1rem',
    fontWeight: 900
  },
  spaced: {
    paddingLeft: '24px!important',
    paddingRight: '24px!important'
  }
}))

interface FilterProps {
  onApplyFilter: (filters: BaseFilter) => void
}

interface StatusFilterItemType {
  icon: () => React.ReactNode
  title: string
  value: AuthorizableStatus
  isSelected: boolean
}

const DatePickerInputComponent = (props: any) => (
  <TextField
    {...props}
    fullWidth
    size='small'
    InputProps={{
      endAdornment: (
        <InputAdornment position='end' style={{ color: '#AAAAAA' }}>
          <DateIcon />
        </InputAdornment>
      )
    }}
  />
)

const initialStatusFilter: StatusFilterItemType[] = [
  { icon: () => <UnauthorizedIcon />, value: 'Unauthorized', title: 'Unauthorized', isSelected: true },
  { icon: () => <ApprovedIcon />, value: 'Approved', title: 'Approved', isSelected: false },
  { icon: () => <RejectedIcon />, value: 'Rejected', title: 'Rejected', isSelected: false },
  { icon: () => <AllIcon />, value: '', title: 'All', isSelected: false }
]

const Filter = ({ onApplyFilter }: FilterProps) => {
  const classes = useStyles()
  const [searchItem, setSearchItem] = useState('')
  const [statusFilters, setStatusFilters] = useState([...initialStatusFilter])
  const [fromDate, setFromDate] = useState<Date| null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)

  const handleFromDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(0, 0, 0, 0)
    }
    setFromDate(date)
  }

  const handleToDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(23, 59, 59, 99)
    }
    setToDate(date)
  }

  const handleTextChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchItem(evt.target.value)
  }

  const handleApply = (statusIndex?: number) => {
    const selected = statusIndex !== undefined ? statusFilters[statusIndex] : statusFilters.find((e) => e.isSelected)
    let status: AuthorizableStatus = ''
    if (selected) {
      status = selected.value
    }

    onApplyFilter({
      status,
      search: searchItem,
      from: (fromDate && formatISO(fromDate)) ?? undefined,
      to: (toDate && formatISO(toDate)) ?? undefined
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='button' className={classes.filtersLabel}>FILTERS</Typography>
      </Grid>
      <Grid item xs={12}>
        {statusFilters.map((e, i) => (
          <StatusFilter
            key={i}
            isSelected={e.isSelected}
            handleItemClick={() => {
              handleApply(i)
              setStatusFilters(
                statusFilters.map((j, k) => ({
                  ...j,
                  isSelected: i === k
                }))
              )
            }}
            title={e.title}
          >
            {e.icon()}
          </StatusFilter>
        ))}
      </Grid>
      <Grid item xs={12} className={classes.spaced} style={{ paddingTop: '24px' }}>
        <TextField
          fullWidth
          style={{ marginBottom: '8px' }}
          id='outlined-required'
          label='Search'
          variant='outlined'
          size='small'
          onChange={handleTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' style={{ color: '#AAAAAA' }}>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={12} className={classes.spaced}>
          <DatePicker
            autoOk
            variant='inline'
            inputVariant='outlined'
            margin='normal'
            label='From'
            format='MM/dd/yyyy'
            value={fromDate}
            onChange={handleFromDateChange}
            TextFieldComponent={DatePickerInputComponent}
          />
        </Grid>
        <Grid item xs={12} className={classes.spaced}>
          <DatePicker
            autoOk
            variant='inline'
            inputVariant='outlined'
            margin='normal'
            label='To'
            format='MM/dd/yyyy'
            value={toDate}
            onChange={handleToDateChange}
            TextFieldComponent={DatePickerInputComponent}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid container item xs={12} justify='flex-end' className={classes.spaced}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={() => handleApply()}
        >
          Apply
        </Button>
      </Grid>
    </Grid>
  )
}

export default Filter
