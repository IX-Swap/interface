import React from 'react'
import {
  SearchQueryFilter,
  SearchQueryFilterProps
} from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'

export interface GroupedDateTimeFilterProps {
  name: SearchQueryFilterProps<'fromDate' | 'toDate'>['name']
  groupFilter: SearchQueryFilterProps<'fromDate' | 'toDate'>['groupFilter']
  // TODO: fix type when pickers updated
  dateTimePickerProps?: any
}

export const GroupedDateTimeFilter = (props: GroupedDateTimeFilterProps) => {
  const { dateTimePickerProps = {}, ...filterProps } = props

  return (
    <SearchQueryFilter {...filterProps}>
      {({ value, onChange }) => (
        <DateTimePickerComponent
          {...dateTimePickerProps}
          value={value ?? new Date()}
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
