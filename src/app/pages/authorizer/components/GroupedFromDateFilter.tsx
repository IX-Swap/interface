import React from 'react'
import { DatePickerComponent } from 'components/form/DatePicker'
import {
  SearchQueryFilter,
  SearchQueryFilterProps
} from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'

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
        <DatePickerComponent
          {...dateTimePickerProps}
          value={value ?? null}
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
