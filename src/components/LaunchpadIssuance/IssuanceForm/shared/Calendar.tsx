import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

interface Props {
  current: moment.Moment
  selectedRange: moment.Moment[]

  minDate?: Date

  onSelect: (value: moment.Moment) => void
}

export const CalendarPicker: React.FC<Props> = (props) => {
  const [selectedRange, setSelectedRange] = React.useState<moment.Moment[]>([])

  const minDate = React.useMemo(() => moment(props.minDate), [])
  const firstDayOfMonth = React.useMemo(() => Number(moment(props.current).startOf('month').format('d')), [props.current])

  const weekdays = React.useMemo(() => moment.weekdaysMin(), [])

  const daysBeforeMonth = React.useMemo(() => Array(firstDayOfMonth).fill(null).map((_, idx) => idx), [firstDayOfMonth])
  const daysInMonth = React.useMemo(() => Array(props.current.daysInMonth()).fill(null).map((_, idx) => idx + 1), [props.current])

  const select = React.useCallback((day: number) => {
    const selectedDate = props.current.clone().date(day)

    if (selectedDate < minDate) {
      return
    }
    
    props.onSelect(selectedDate)
  }, [props.current, minDate, props.onSelect])

  const isSelected = React.useCallback((day: number) => {
    return selectedRange.some(selected => 
      selected && 
      day === selected?.get('date') && 
      props.current.get('month') === selected.get('month')
    )
  }, [props.current, selectedRange])

  const isWithinRange = React.useCallback((day: number) => {
    if (selectedRange.length < 2) {
      return false
    }

    const [start, end] = selectedRange

    return props.current.clone().date(day).isBetween(start, end)
  }, [props.current, selectedRange])

  React.useEffect(() => { 
    setSelectedRange(props.selectedRange)
  }, [props.selectedRange])

  return (
    <CalendarGrid>
      {weekdays.map(day => <HeaderCell key={`header-${day}`}>{day}</HeaderCell>)}

      {/* Empty cells for before the month start */}
      {daysBeforeMonth.map(idx => <Day key={`blank-${idx}`}></Day>)}

      {/* Actual days of month */}
      {daysInMonth.map(day => (
        <Day 
          key={`day-${day}`} 
          onClick={() => select(day)}
          isSelected={isSelected(day)}
          isWithinRange={isWithinRange(day)}
          isDisabled={props.current.clone().date(day).isBefore(minDate)}
        >
          {day}
        </Day>
      ))}
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
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.01em;

  text-transform: capitalize;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const Day = styled.div<{ isSelected?: boolean, isDisabled?: boolean, isWithinRange?: boolean }>`
  display: grid;
  place-content: center;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;
  
  text-align: center;
  cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
  
  ${props => props.isDisabled && `opacity: 0.3;`}
  ${props => props.isWithinRange && `background: ${props.theme.launchpad.colors.foreground};`}

  color: ${props => props.theme.launchpad.colors.text.title};



  transition: all 0.2s;

  border-radius: 6px;

  ${props => props.isSelected && `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
  `}

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`
