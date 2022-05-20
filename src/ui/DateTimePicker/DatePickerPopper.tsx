import { PickerOnChangeFn } from '@mui/lab/internal/pickers/hooks/useViews'
import { Box, ClickAwayListener, Popper, PopperProps } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import { CustomCalendarPicker } from 'ui/DateTimePicker/CustomDatePicker'
import { CustomMonthPicker } from 'ui/DateTimePicker/CustomMonthPicker'
import { CustomYearPicker } from 'ui/DateTimePicker/CustomYearPicker'
import { DatePickerActions } from 'ui/DateTimePicker/DatePickerActions'
import { DatePickerWrapper } from 'ui/DateTimePicker/DatePickerWrapper'
import { PickerButton } from 'ui/DateTimePicker/PickerButton'
import { TimePicker } from 'ui/DateTimePicker/TimePicker'
import { useStyles } from 'ui/DateTimePicker/DatePickerPopper.styles'

export interface DatePickerPopperProps extends PopperProps {
  date: Date
  onChange: PickerOnChangeFn<unknown>
  view: 'year' | 'month' | 'day' | 'ampm'
  minDate: Date | undefined
  maxDate: Date | undefined
  resetViews: () => void
  setViewToMonth: () => void
  setViewToYear: () => void
  setViewToAmPm: () => void
  clickAwayHandler: (event: MouseEvent | TouchEvent) => void
  variant: 'date' | 'time' | 'datetime'
  cancelAction: () => void
  setDateAction: () => void
}

export const DatePickerPopper = ({
  date,
  onChange,
  view,
  minDate,
  maxDate,
  resetViews,
  setViewToMonth,
  setViewToAmPm,
  setViewToYear,
  clickAwayHandler,
  variant,
  cancelAction,
  setDateAction,
  ...rest
}: DatePickerPopperProps) => {
  const classes = useStyles()
  return (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <Popper className={classes.popperStyles} {...rest}>
        <DatePickerWrapper elevation={0} sx={{ mt: '4px' }}>
          <Box maxWidth={320}>
            {variant === 'date' || variant === 'datetime' ? (
              <>
                <Box display='flex' justifyContent='space-between' px={4}>
                  <PickerButton
                    date={date}
                    setDate={onChange}
                    open={view === 'month'}
                    onClick={setViewToMonth}
                    minDate={minDate}
                    maxDate={maxDate}
                    el={CustomMonthPicker}
                    label={format(date, 'MMMM')}
                    clickAwayHandler={resetViews}
                  />
                  <PickerButton
                    date={date}
                    setDate={onChange}
                    open={view === 'year'}
                    onClick={setViewToYear}
                    minDate={minDate}
                    maxDate={maxDate}
                    el={CustomYearPicker}
                    label={format(date, 'yyyy')}
                    isDateDisabled={() => false}
                    placement='bottom-end'
                    clickAwayHandler={resetViews}
                  />
                </Box>
                <Box position='relative' width='100%'>
                  <CustomCalendarPicker
                    date={date}
                    onChange={onChange}
                    view='day'
                    views={['day']}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                </Box>
              </>
            ) : null}
            {variant === 'time' || variant === 'datetime' ? (
              <>
                <Box px={4}>
                  <TimePicker
                    onChange={onChange}
                    value={date}
                    view={view}
                    openAmPm={setViewToAmPm}
                    resetViews={resetViews}
                  />
                </Box>
              </>
            ) : null}
            <DatePickerActions
              setDateAction={setDateAction}
              cancelAction={cancelAction}
              setDateLabel={
                variant === 'date' || variant === 'datetime'
                  ? 'Set Date'
                  : 'Set Time'
              }
            />
          </Box>
        </DatePickerWrapper>
      </Popper>
    </ClickAwayListener>
  )
}
