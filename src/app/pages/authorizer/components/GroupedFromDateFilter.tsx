import React from 'react'
import { DateTimePickerComponent } from 'components/form/_DateTimePicker'
import {
  SearchQueryFilter,
  SearchQueryFilterProps
} from 'components/SearchQueryFilter/SearchQueryFilter'
import { convertDateToISO } from 'helpers/dates'
import { KeyboardDateTimePickerProps } from '@material-ui/pickers'

export interface GroupedDateTimeFilterProps {
  name: SearchQueryFilterProps<'fromDate' | 'toDate'>['name']
  groupFilter: SearchQueryFilterProps<'fromDate' | 'toDate'>['groupFilter']
  dateTimePickerProps?: Partial<KeyboardDateTimePickerProps>
}

export const GroupedDateTimeFilter = (props: GroupedDateTimeFilterProps) => {
  const { dateTimePickerProps = {}, ...filterProps } = props

  return (
    <SearchQueryFilter {...filterProps}>
      {({ value, onChange }) => (
        <DateTimePickerComponent
          {...dateTimePickerProps}
          value={value ?? null}
          size='small'
          inputVariant='outlined'
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
