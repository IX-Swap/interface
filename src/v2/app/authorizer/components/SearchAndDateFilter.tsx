import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, InputAdornment, TextField, Button } from '@material-ui/core'
import { DateRange as DateIcon, Search as SearchIcon } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import {
  DatePicker,
  DatePickerProps,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/styles'
import { BaseFilter } from 'v2/types/util'
import { convertDateToISO } from 'v2/helpers/dates'

interface SearchAndDateFilterFormValues {
  search: string
  from: Date | undefined
  to: Date | undefined
}

export interface SearchAndDateFilterProps {
  onApplyFilter: (filters: Partial<BaseFilter>) => void
}

export const initialValues: SearchAndDateFilterFormValues = {
  search: '',
  from: undefined,
  to: undefined
}

export const SearchAndDateFilter: React.FC<SearchAndDateFilterProps> = props => {
  const { onApplyFilter } = props
  const classes = useStyles()
  const { control, handleSubmit } = useForm<SearchAndDateFilterFormValues>({
    defaultValues: initialValues
  })
  const onSubmit = (values: SearchAndDateFilterFormValues): void => {
    const { search, from, to } = values

    onApplyFilter({
      from: convertDateToISO(from),
      to: convertDateToISO(to),
      search
    })
  }

  return (
    <form style={{ width: '100%' }} data-testid='form'>
      <Grid
        item
        xs={12}
        className={classes.spaced}
        style={{ paddingTop: '24px' }}
      >
        <Controller
          name='search'
          control={control}
          as={
            <TextField
              id='search'
              fullWidth
              style={{ marginBottom: '8px' }}
              label='Search'
              variant='outlined'
              size='small'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' style={{ color: '#AAAAAA' }}>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          }
        />
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid item xs={12} className={classes.spaced}>
          <Controller
            name='from'
            control={control}
            defaultValue={null}
            render={props => (
              <DatePickerComponent
                {...props}
                label='From'
                format='MM/dd/yyyy'
              />
            )}
          />
        </Grid>
        <Grid item xs={12} className={classes.spaced}>
          <Controller
            name='to'
            control={control}
            defaultValue={null}
            render={props => (
              <DatePickerComponent {...props} label='To' format='MM/dd/yyyy' />
            )}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid
        container
        item
        xs={12}
        justify='flex-end'
        className={classes.spaced}
      >
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Grid>
    </form>
  )
}

const DatePickerComponent: React.FC<DatePickerProps> = props => {
  return (
    <DatePicker
      {...props}
      autoOk
      variant='inline'
      inputVariant='outlined'
      margin='normal'
      TextFieldComponent={TextFieldComponent}
    />
  )
}

const TextFieldComponent: React.FC = (props: any) => (
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
