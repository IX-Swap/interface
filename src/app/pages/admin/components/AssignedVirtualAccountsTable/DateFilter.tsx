import React from 'react'
import { DatePickerComponent } from 'components/form/DatePicker'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'
import { QueryFilter } from 'hooks/filters/useQueryFilter'

export interface DateFilterProps {
  name: QueryFilter
  label?: string
  width?: number | string
  // TODO: fix type when pickers updated
  dateTimePickerProps?: any
}

export const DateFilter = ({
  name,
  label,
  width = 150,
  dateTimePickerProps = {}
}: DateFilterProps) => {
  return (
    <SearchQueryFilter name={name}>
      {({ value, onChange, onClear }) => (
        <DatePickerComponent
          {...dateTimePickerProps}
          name={name}
          label={label}
          value={value ?? null}
          className='denseAdornments'
          clearable
          InputProps={{
            fullWidth: false,
            style: {
              width
            }
          }}
          onChange={date => {
            if (date === null) {
              onClear()
            } else {
              try {
                onChange(convertDateToISO(date as Date))
              } catch (e) {
                onChange(undefined)
              }
            }
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
