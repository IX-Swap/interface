import React from 'react'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'
import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'

export const GroupedToDateFilter = () => {
  return (
    <SearchQueryFilter groupFilter name='toDate'>
      {({ value, onChange }) => (
        <DateTimePickerComponent
          value={value ?? null}
          className='denseAdornments'
          size='small'
          inputVariant='outlined'
          label='To'
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
