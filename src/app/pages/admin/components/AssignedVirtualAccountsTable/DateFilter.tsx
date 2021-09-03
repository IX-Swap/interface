import React from 'react'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'
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
      {({ value, onChange }) => (
        <DateTimePickerComponent
          value={value ?? null}
          className='denseAdornments'
          size='small'
          inputVariant='outlined'
          label={label}
          style={{ width: width }}
          onChange={date => {
            try {
              onChange(convertDateToISO(date))
            } catch (e) {
              onChange(undefined)
            }
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
