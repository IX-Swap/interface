import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, InputAdornment, TextField, Button, Box } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import useStyles from './SearchAndDateFilter.styles'
import { BaseFilter } from 'v2/types/util'
import { convertDateToISO } from 'v2/helpers/dates'
import { DateTimePickerComponent } from 'v2/components/form/DateTimePicker'

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
  const { control, handleSubmit, reset, formState } = useForm<
    SearchAndDateFilterFormValues
  >({ defaultValues: initialValues })

  const handleReset = (): void => {
    onApplyFilter({
      from: convertDateToISO(initialValues.from),
      to: convertDateToISO(initialValues.to),
      search: initialValues.search
    })
    reset()
  }

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
              <DateTimePickerComponent {...props} label='From' />
            )}
          />
        </Grid>
        <Grid item xs={12} className={classes.spaced}>
          <Controller
            name='to'
            control={control}
            defaultValue={null}
            render={props => <DateTimePickerComponent {...props} label='To' />}
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
        {formState.isDirty && (
          <Button
            variant='contained'
            size='small'
            color='default'
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
        <Box mx={1} />
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
