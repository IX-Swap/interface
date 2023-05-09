import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePickerProps as MUIDatePickerProps } from '@mui/lab/DatePicker'
import { PickerOnChangeFn } from '@mui/lab/internal/pickers/hooks/useViews'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Box, IconButton, InputAdornment } from '@mui/material'
import { addYears, format, subYears } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { DatePickerPopper } from 'ui/DateTimePicker/DatePickerPopper'
import { Icon } from 'ui/Icons/Icon'
import { TextInput } from 'ui/TextInput/TextInput'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

const defaultDates = {
  min: subYears(new Date(), 40),
  max: addYears(new Date(), 40)
}

export interface DatePickerProps
  extends Omit<MUIDatePickerProps, 'renderInput'> {
  name: string
  dateFormat?: string
  timeFormat?: string
  variant?: 'date' | 'time' | 'datetime'
  label?: string
  hasError?: boolean
}

export type View = 'day' | 'month' | 'year' | 'ampm'

export const DatePicker = ({
  minDate = defaultDates.min,
  maxDate = defaultDates.max,
  value,
  onChange: setDate,
  name,
  dateFormat = 'MM / dd / yyyy',
  timeFormat = 'hh : mm a',
  variant = 'date',
  label,
  hasError = false
}: DatePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [view, setView] = useState<View>('day')
  const [open, setOpen] = useState(false)

  const date: Date | undefined = value instanceof Date ? value : new Date()
  const _minDate: Date | undefined =
    minDate instanceof Date ? minDate : undefined
  const _maxDate: Date | undefined =
    maxDate instanceof Date ? maxDate : undefined

  const [previousValue, setPreviousValue] = useState<Date | undefined>(
    undefined
  )

  const getDateValue = (val: unknown) => {
    if (!(val instanceof Date)) {
      return undefined
    }
    let dateValue = val
    if (_minDate !== undefined && val < _minDate) {
      dateValue = _minDate
    }
    if (_maxDate !== undefined && val > _maxDate) {
      dateValue = _maxDate
    }

    return dateValue
  }

  const onChange: PickerOnChangeFn<unknown> = pickerValue => {
    setDate(getDateValue(pickerValue))
    setView('day')
  }

  const resetViews = () => {
    setView('day')
  }

  const setViewToMonth = () => {
    setView('month')
  }

  const setViewToYear = () => {
    setView('year')
  }

  const setViewToAmPm = () => {
    setView('ampm')
  }

  const handleFocus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    resetViews()
    setOpen(!open)
  }

  const closePicker = () => {
    resetViews()
    setOpen(false)
  }

  const handleCancel = () => {
    previousValue !== undefined && setDate(previousValue)
    closePicker()
  }

  const handleSetDate = () => {
    closePicker()
  }

  useEffect(() => {
    if (open) {
      setPreviousValue(date)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box position='relative'>
        {label !== undefined && (
          <InputLabel style={{ fontSize: 14 }} shrink error={hasError}>
            {label}
          </InputLabel>
        )}
        <TextInput
          value={format(
            date,
            `${
              variant === 'date' || variant === 'datetime'
                ? dateFormat + '   '
                : ''
            }${variant === 'time' || variant === 'datetime' ? timeFormat : ''}`
          )}
          name={name}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  disableRipple
                  sx={{
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  <Icon
                    name={
                      variant === 'date' || variant === 'datetime'
                        ? 'date'
                        : 'time'
                    }
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
          onClick={handleFocus}
          fullWidth
          sx={{
            input: {
              caretColor: 'transparent',
              cursor: 'default'
            }
          }}
        />
        {open && (
          <DatePickerPopper
            date={date}
            onChange={onChange}
            view={view}
            minDate={_minDate}
            maxDate={_maxDate}
            resetViews={resetViews}
            setViewToMonth={setViewToMonth}
            setViewToAmPm={setViewToAmPm}
            setViewToYear={setViewToYear}
            placement='bottom-start'
            open={open}
            anchorEl={anchorEl}
            clickAwayHandler={handleCancel}
            variant={variant}
            cancelAction={handleCancel}
            setDateAction={handleSetDate}
          />
        )}
      </Box>
    </LocalizationProvider>
  )
}