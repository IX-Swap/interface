import React from 'react'
import { DatePickerComponent } from 'components/form/DatePicker'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'
import { QueryFilter } from 'hooks/filters/useQueryFilter'

export interface DateFilterProps {
  name: QueryFilter
  label: string
  width?: number | string
}

export const DateFilter = ({ name, label, width = 150 }: DateFilterProps) => {
  return (
    <SearchQueryFilter name={name}>
      {({ value, onChange, onClear }) => (
        <DatePickerComponent
          name={name}
          value={value ?? null}
          className='denseAdornments'
          label={label}
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
