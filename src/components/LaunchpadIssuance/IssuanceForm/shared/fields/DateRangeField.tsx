import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import moment, { Moment } from 'moment'
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather'
import { CalendarPicker } from '../Calendar'
import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { text19, text30, text40 } from 'components/LaunchpadMisc/typography'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { RowEnd } from 'components/Row'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import useStateRef from 'react-usestateref'
import { formatDateRange } from 'components/LaunchpadIssuance/ManageOffer/utils'

type DateRange = moment.Moment[]
type DateRangeValue = Date[]

interface Props {
  mode: 'single' | 'range'
  label: string
  error?: string
  value?: Date | DateRange
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  field?: string
  setter?: (field: string, value: any) => void
  onChange?: (range: DateRangeValue) => void
  showButton?: boolean
  dateFormat?: string
}

export const DateRangeField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [range, setRange] = React.useState<DateRange>([])
  const [selectedRange, setSelectedRange, selectedRangeRef] = useStateRef<DateRange>([])
  const [showPicker, setShowPicker, showPickerRef] = useStateRef(false)
  const [startTime, setStartTime, startTimeRef] = useStateRef<Moment | null>()
  const [endTime, setEndTime, endTimeRef] = useStateRef<Moment | null | undefined>()
  const [dateErrorText, setDateErrorText] = useState<string>()

  const [currentMonth, setCurrentMonth] = React.useState(moment())
  const nextMonth = React.useMemo(() => currentMonth.clone().month(currentMonth.get('month') + 1), [currentMonth])

  const copyTime = (date: moment.Moment, time: moment.Moment): moment.Moment => {
    return date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second'),
    })
  }

  const callPropsOnChange = () => {
    if (props.field && props.setter && selectedRangeRef.current) {
      props.setter(
        props.field,
        props.mode === 'single' ? selectedRangeRef.current[0].toDate() : selectedRangeRef.current.map((x) => x.toDate())
      )
    }

    if (props.onChange) {
      props.onChange(selectedRangeRef.current.map((x) => x.toDate()))
    }
  }

  const onStartTimeChanged = (value: moment.Moment | null) => {
    if (value) {
      setStartTime(value)
      if (props.mode === 'single') {
        setSelectedRange([copyTime(selectedRangeRef.current[0], value)])
      } else {
        setSelectedRange([copyTime(selectedRangeRef.current[0], value), selectedRangeRef.current[1]])
      }

      callPropsOnChange()
    }
  }

  const onEndTimeChanged = (value: moment.Moment | null) => {
    if (value) {
      setEndTime(value)
      if (props.mode === 'range') {
        if (range.length === 1) {
          selectedRangeRef.current[1] = selectedRangeRef.current[0].clone()
        }
        setSelectedRange([selectedRangeRef.current[0], copyTime(selectedRangeRef.current[1], value)])
      }

      callPropsOnChange()
    }
  }

  const toggle = React.useCallback(() => {
    if (!props.disabled) {
      if (
        showPickerRef.current &&
        selectedRangeRef.current &&
        ((selectedRangeRef.current[0] && selectedRangeRef.current[0].get('minute')) % 10 !== 0 ||
          (selectedRangeRef.current[1] && selectedRangeRef.current[1].get('minute')) % 10 !== 0)
      ) {
        setDateErrorText('The minute must be divisible by 10')
        return
      } else {
        setDateErrorText('')
      }
      if (props.mode === 'range' && selectedRangeRef.current.length === 2) {
        const duration = moment.duration(selectedRangeRef.current[1].diff(selectedRangeRef.current[0]))
        const minutes = duration.asMinutes()
        if (minutes < 20) {
          setDateErrorText('Closed Date should be later than Sale Date at least 20 minutes')
          return
        } else {
          setDateErrorText('')
        }
      }
      setShowPicker((state) => !state)
    }
  }, [props.disabled])

  const onSelect = React.useCallback(
    (value: moment.Moment) => {
      if (props.mode === 'single') {
        if (startTimeRef.current) {
          value = copyTime(value, startTimeRef.current)
        }
        setSelectedRange([value])
      } else if (range.length === 1) {
        let first = range[0]
        if (first.isBefore(value)) {
          if (startTimeRef.current && endTimeRef.current) {
            first = copyTime(first, startTimeRef.current)
            value = copyTime(value, endTimeRef.current)
          }
          setSelectedRange([first, value])
        } else {
          if (startTimeRef.current && endTimeRef.current) {
            value = copyTime(value, startTimeRef.current)
            first = copyTime(first, endTimeRef.current)
          }
          setSelectedRange([value, first])
        }
      } else {
        setSelectedRange([value])
      }

      callPropsOnChange()
    },
    [range, selectedRange, startTime, endTime]
  )

  const moveMonthBack = React.useCallback(
    () => setCurrentMonth((state) => state.clone().month(state.get('month') - 1)),
    []
  )
  const moveMonthForward = React.useCallback(
    () => setCurrentMonth((state) => state.clone().month(state.get('month') + 1)),
    []
  )
  const formattedDate = React.useMemo(() => {
    const dateFormat = props.dateFormat || 'Do MMM, HH:mm'
    const hasEmptyState = range.length === 0 || range.some((date) => !date.isValid())
    if (hasEmptyState) {
      return `Do MMM, HH:mm ${props.mode === 'range' ? ` - ${dateFormat.toLowerCase()}` : ''}`
    }
    return formatDateRange(range[0]?.toDate(), range[1]?.toDate())
  }, [range, props.mode, props.dateFormat])

  React.useEffect(() => {
    if (props.value !== undefined) {
      if (props.mode === 'single') {
        setRange([moment(props.value as Date)])
      } else {
        setRange(props.value as DateRange)
      }
    } else {
      setRange([])
    }
  }, [props.value])

  return (
    <Column>
      <FieldContainer disabled={props.disabled} onClick={toggle}>
        <FieldIcon>
          <Calendar color={theme.launchpad.colors.text.caption} />
        </FieldIcon>
        <FieldLabel>{props.label}</FieldLabel>

        <FieldValue isPlaceholder={formattedDate.startsWith('m')}>{formattedDate}</FieldValue>
      </FieldContainer>
      <IssuanceDialog show={showPicker} onClose={toggle}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker>
            <DatePickerHeader area="current-header">
              <ChangeMonthButton onClick={moveMonthBack}>
                <ChevronLeft color={theme.launchpad.colors.primary} />
              </ChangeMonthButton>
              <DatePickerTitle>{currentMonth.format('MMMM YYYY')}</DatePickerTitle>
            </DatePickerHeader>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <CalendarPicker
                current={currentMonth}
                selectedRange={range}
                onSelect={onSelect}
                {...(props.minDate && { minDate: props.minDate })}
                {...(props.maxDate && { maxDate: props.maxDate })}
              />
              <TimePicker
                label="Select Time"
                minutesStep={10}
                value={startTime}
                onChange={onStartTimeChanged}
                disablePast={true}
                ampm={false}
                format="HH:mm"
                minTime={moment(props.minDate)}
              />
            </div>

            <DatePickerHeader area="next-header">
              <DatePickerTitle>{nextMonth.format('MMMM YYYY')}</DatePickerTitle>
              <ChangeMonthButton onClick={moveMonthForward}>
                <ChevronRight color={theme.launchpad.colors.primary} />
              </ChangeMonthButton>
            </DatePickerHeader>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <CalendarPicker
                current={nextMonth}
                selectedRange={range}
                onSelect={onSelect}
                {...(props.minDate && { minDate: props.minDate })}
                {...(props.maxDate && { maxDate: props.maxDate })}
              />

              {props.mode === 'range' && (
                <TimePicker
                  label="Select Time"
                  minutesStep={10}
                  value={endTime}
                  onChange={onEndTimeChanged}
                  disablePast={true}
                  ampm={false}
                  format="HH:mm"
                  minTime={moment(props.minDate)}
                />
              )}
            </div>
          </DatePicker>
        </LocalizationProvider>
        <SelectedDateText>Selected Date: {formattedDate}</SelectedDateText>
        {dateErrorText && <ErrorText>{dateErrorText}</ErrorText>}
        {props.showButton && (
          <RowEnd>
            <FilledButton onClick={toggle}>Confirm</FilledButton>
          </RowEnd>
        )}
      </IssuanceDialog>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const FieldContainer = styled.div<{ disabled?: boolean }>`
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 10px;
  grid-template-areas:
    'label icon'
    'value icon';

  place-content: start center;
  gap: 0.25rem;
  padding: 1rem;

  ${(props) => !props.disabled && `cursor: pointer;`}

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${(props) =>
    props.disabled &&
    `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const FieldIcon = styled.div`
  grid-area: icon;
  display: grid;
  place-content: center;
  margin-right: 8px;
`

const SelectedDateText = styled.div`
  ${text30}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldLabel = styled.div`
  grid-area: label;
  ${text19}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldValue = styled.div<{ isPlaceholder: boolean }>`
  grid-area: value;
  ${text30}
  color: ${(props) =>
    props.isPlaceholder ? props.theme.launchpad.colors.text.bodyAlt : props.theme.launchpad.colors.text.title};
`

const DatePicker = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-template-areas: 'current-header next-header';
  gap: 1rem;
`

const DatePickerHeader = styled.div<{ area: 'current-header' | 'next-header' }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  grid-area: ${(props) => props.area};
`

const DatePickerTitle = styled.div`
  display: grid;
  place-content: center;
  flex-grow: 1;
  ${text40}
  text-align: right;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const ChangeMonthButton = styled.button`
  display: grid;
  place-content: center;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 6px;
  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`
