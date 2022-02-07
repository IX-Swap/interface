import React from 'react'
import { DatePickerComponent } from 'components/form/DatePicker'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'

export const GroupedToDateFilter = () => {
  return (
    <SearchQueryFilter groupFilter name='toDate'>
      {({ value, onChange }) => (
        <DatePickerComponent
          name='to'
          value={value ?? null}
          className='denseAdornments'
          label='To'
          onChange={date => {
            try {
              onChange(convertDateToISO(date as Date))
            } catch (e) {
              onChange(undefined)
            }
          }}
        />
      )}
    </SearchQueryFilter>
  )
}
