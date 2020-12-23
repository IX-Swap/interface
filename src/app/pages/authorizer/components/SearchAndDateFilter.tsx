import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, InputAdornment, TextField, Button, Box } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { BaseFilter } from 'types/util'
import { convertDateToISO } from 'helpers/dates'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'

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
    <Grid container direction='column' spacing={2} data-testid='form'>
      <Grid item xs={12}>
        <Controller
          name='search'
          control={control}
          as={
            <TextField
              id='search'
              fullWidth
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
      <Grid item xs={12}>
        <Controller
          name='from'
          control={control}
          defaultValue={null}
          render={props => (
            <DateTimePickerComponent
              {...props}
              className='denseAdornments'
              size='small'
              inputVariant='outlined'
              label='From'
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='to'
          control={control}
          defaultValue={null}
          render={props => (
            <DateTimePickerComponent
              {...props}
              className='denseAdornments'
              size='small'
              inputVariant='outlined'
              label='To'
            />
          )}
        />
      </Grid>
      <Grid container item xs={12} justify='flex-end'>
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
    </Grid>
  )
}
