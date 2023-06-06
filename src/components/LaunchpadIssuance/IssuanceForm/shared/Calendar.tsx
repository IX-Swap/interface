import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { text30, text45 } from 'components/LaunchpadMisc/typography'

interface Props {
  current: moment.Moment
  selectedRange: moment.Moment[]

  minDate?: Date
  maxDate?: Date

  onSelect: (value: moment.Moment[]) => void
}

enum TimePopupStep {
  START_DATE = 'start-date',
  START_TIME = 'start-time',
  END_DATE = 'end-date',
  END_TIME = 'end-time',
}

export const CalendarPicker: React.FC<Props> = (props) => {
  const [selectedRange, setSelectedRange] = React.useState<moment.Moment[]>([])
  const [timePopupStep, setTimePopupStep] = React.useState<TimePopupStep>(TimePopupStep.START_DATE)
  const [selectedStartDate, setSelectedStartDate] = React.useState<moment.Moment | null>(null)
  const [selectedStartTime, setSelectedStartTime] = React.useState<moment.Moment | null>(null)
  const [selectedEndDate, setSelectedEndDate] = React.useState<moment.Moment | null>(null)
  const [selectedEndTime, setSelectedEndTime] = React.useState<moment.Moment | null>(null)

  const minDate = React.useMemo(() => (props.minDate ? moment(props.minDate) : null), [props.minDate])
  const maxDate = React.useMemo(() => (props.maxDate ? moment(props.maxDate) : null), [props.maxDate])

  const firstDayOfMonth = React.useMemo(
    () => Number(moment(props.current).startOf('month').format('d')),
    [props.current]
  )

  const weekdays = React.useMemo(() => moment.weekdaysMin(), [])

  const daysBeforeMonth = React.useMemo(
    () =>
      Array(firstDayOfMonth)
        .fill(null)
        .map((_, idx) => idx),
    [firstDayOfMonth]
  )
  const daysInMonth = React.useMemo(
    () =>
      Array(props.current.daysInMonth())
        .fill(null)
        .map((_, idx) => idx + 1),
    [props.current]
  )

  const handleDateSelection = (day: number) => {
    const selectedDate = props.current.clone().date(day)

    if (minDate && selectedDate < minDate) {
      return
    }
    if (maxDate && selectedDate > maxDate) {
      return
    }
    if (selectedRange.length === 2) {
      setSelectedStartDate(null)
      setSelectedStartTime(null)
      setSelectedEndDate(null)
      setSelectedEndTime(null)
      setTimePopupStep(TimePopupStep.START_DATE)
      setSelectedRange([])
    }

    if (timePopupStep === TimePopupStep.START_DATE) {
      setSelectedStartDate(selectedDate)
      setTimePopupStep(TimePopupStep.START_TIME)
    } else if (timePopupStep === TimePopupStep.END_DATE) {
      setSelectedEndDate(selectedDate)
      setTimePopupStep(TimePopupStep.END_TIME)
    }
  }

  const handleTimeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeStr = event.target.value
    const selectedTime = moment(timeStr, 'HH:mm')

    if (selectedTime.isValid()) {
      if (timePopupStep === TimePopupStep.START_TIME) {
        setSelectedStartTime(selectedTime)
        setTimePopupStep(TimePopupStep.END_DATE)
      } else if (timePopupStep === TimePopupStep.END_TIME) {
        setSelectedEndTime(selectedTime)
        const range: moment.Moment[] = [
          moment(selectedStartDate),
          moment(selectedStartTime),
          moment(selectedEndDate),
          moment(selectedEndTime),
        ]
        setSelectedRange(range)
        props.onSelect(range)
      }
    }
  }

  const isSelected = React.useCallback(
    (day: number) => {
      return selectedRange.some(
        (selected) => selected && day === selected?.get('date') && props.current.get('month') === selected.get('month')
      )
    },
    [props.current, selectedRange]
  )

  const isWithinRange = React.useCallback(
    (day: number) => {
      if (selectedRange.length !== 2) {
        return false
      }

      const [start, end] = selectedRange

      return props.current.clone().date(day).isBetween(start, end)
    },
    [props.current, selectedRange]
  )

  React.useEffect(() => {
    setSelectedRange(props.selectedRange)
  }, [props.selectedRange])

  return (
    <CalendarGrid>
      {weekdays.map((day) => (
        <HeaderCell key={`header-${day}`}>{day}</HeaderCell>
      ))}

      {/* Empty cells for before the month start */}
      {daysBeforeMonth.map((idx) => (
        <Day key={`blank-${idx}`}></Day>
      ))}

      {/* Actual days of month */}
      {daysInMonth.map((day) => (
        <Day
          key={`day-${day}`}
          onClick={() => handleDateSelection(day)}
          isSelected={isSelected(day)}
          isWithinRange={isWithinRange(day)}
          isDisabled={
            props.current.clone().date(day).isBefore(minDate) || props.current.clone().date(day).isAfter(maxDate)
          }
        >
          {day}
        </Day>
      ))}

      {timePopupStep !== TimePopupStep.START_DATE && (
        <TimeSelectionPopup
          selectedStartDate={selectedStartDate}
          selectedStartTime={selectedStartTime}
          selectedEndDate={selectedEndDate}
          selectedEndTime={selectedEndTime}
          timePopupStep={timePopupStep}
          onStartDateChange={(date: moment.Moment | null) => setSelectedStartDate(date)}
          onStartTimeChange={(time: moment.Moment | null) => setSelectedStartTime(time)}
          onEndDateChange={(date: moment.Moment | null) => setSelectedEndDate(date)}
          onEndTimeChange={(time: moment.Moment | null) => setSelectedEndTime(time)}
          onNext={() => setTimePopupStep(TimePopupStep.END_DATE)}
          onOk={() => {
            const range: moment.Moment[] = [
              moment(selectedStartDate),
              moment(selectedStartTime),
              moment(selectedEndDate),
              moment(selectedEndTime),
            ]
            setSelectedRange(range)
            props.onSelect(range)
          }}
          onClose={() => {
            setSelectedStartDate(null)
            setSelectedStartTime(null)
            setSelectedEndDate(null)
            setSelectedEndTime(null)
            setTimePopupStep(TimePopupStep.START_DATE)
            setSelectedRange([])
          }}
        />
      )}
    </CalendarGrid>
  )
}

const CalendarGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(7, 2rem);
  grid-template-rows: repeat(7, 2rem);

  place-content: center;

  gap: 0.25rem;
`

const HeaderCell = styled.div`
  ${text45}
  text-transform: capitalize;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const Day = styled.div<{ isSelected?: boolean; isDisabled?: boolean; isWithinRange?: boolean }>`
  display: grid;
  place-content: center;
  ${text30}
  text-align: center;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};

  ${(props) => props.isDisabled && `opacity: 0.3;`}
  ${(props) => props.isWithinRange && `background: ${props.theme.launchpad.colors.foreground};`}

  color: ${(props) => props.theme.launchpad.colors.text.title};

  transition: all 0.2s;

  border-radius: 6px;

  ${(props) =>
    props.isSelected &&
    `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
    cursor: default;
  `}

  :hover {
    ${(props) =>
    !props.isSelected && `
      background: ${props.theme.launchpad.colors.foreground};
      `
  }
    
  }
`

const TimeSelectionPopup: React.FC<{
  selectedStartDate: moment.Moment | null
  selectedStartTime: moment.Moment | null
  selectedEndDate: moment.Moment | null
  selectedEndTime: moment.Moment | null
  timePopupStep: TimePopupStep
  onStartDateChange: (date: moment.Moment | null) => void
  onStartTimeChange: (time: moment.Moment | null) => void
  onEndDateChange: (date: moment.Moment | null) => void
  onEndTimeChange: (time: moment.Moment | null) => void
  onNext: () => void
  onOk: () => void
  onClose: () => void
}> = ({
  selectedStartDate,
  selectedStartTime,
  selectedEndDate,
  selectedEndTime,
  timePopupStep,
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  onNext,
  onOk,
  onClose,
}) => {
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateStr = event.target.value
      const selectedDate = moment(dateStr, 'YYYY-MM-DD')

      if (selectedDate.isValid()) {
        onStartDateChange(selectedDate)
      } else {
        onStartDateChange(null)
      }
    }

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const timeStr = event.target.value
      const selectedTime = moment(timeStr, 'HH:mm')

      if (selectedTime.isValid()) {
        onStartTimeChange(selectedTime)
      } else {
        onStartTimeChange(null)
      }
    }

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateStr = event.target.value
      const selectedDate = moment(dateStr, 'YYYY-MM-DD')

      if (selectedDate.isValid()) {
        onEndDateChange(selectedDate)
      } else {
        onEndDateChange(null)
      }
    }

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const timeStr = event.target.value
      const selectedTime = moment(timeStr, 'HH:mm')

      if (selectedTime.isValid()) {
        onEndTimeChange(selectedTime)
      } else {
        onEndTimeChange(null)
      }
    }

    const renderPopupContent = () => {
      switch (timePopupStep) {
        case TimePopupStep.START_DATE:
          return (
            <>
              <label>Start Date:</label>
              <input type="date" value={selectedStartDate?.format('YYYY-MM-DD') || ''} onChange={handleStartDateChange} />
            </>
          )
        case TimePopupStep.START_TIME:
          return (
            <>
              <label>Start Time:</label>
              <input type="time" value={selectedStartTime?.format('HH:mm') || ''} onChange={handleStartTimeChange} />
            </>
          )
        case TimePopupStep.END_DATE:
          return (
            <>
              <label>End Date:</label>
              <input type="date" value={selectedEndDate?.format('YYYY-MM-DD') || ''} onChange={handleEndDateChange} />
            </>
          )
        case TimePopupStep.END_TIME:
          return (
            <>
              <label>End Time:</label>
              <input type="time" value={selectedEndTime?.format('HH:mm') || ''} onChange={handleEndTimeChange} />
            </>
          )
        default:
          return null
      }
    }

    return (
      <PopupContainer>
        <PopupContent>
          {renderPopupContent()}
          {timePopupStep === TimePopupStep.START_TIME && <NextButton onClick={onNext}>Next</NextButton>}
          {timePopupStep === TimePopupStep.END_TIME && (
            <>
              <NextButton onClick={onOk}>Ok</NextButton>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
            </>
          )}
        </PopupContent>
      </PopupContainer>
    )
  }

const PopupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.6);

  z-index: 1000;
`

const PopupContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 6px;
`

const NextButton = styled.button`
  margin-top: 0.5rem;
`

const CancelButton = styled.button`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`
