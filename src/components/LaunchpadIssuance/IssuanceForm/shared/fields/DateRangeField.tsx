import React from 'react'
import styled, { useTheme } from 'styled-components'

import moment from 'moment'

import { Calendar, ChevronLeft, ChevronRight } from 'react-feather'

import { CalendarPicker } from '../Calendar'

import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'

type DateRange = moment.Moment[]

interface Props {
  mode: 'single' | 'range'

  label: string
  error?: string

  disabled?: boolean

  field?: string
  setter?: (field: string, value: DateRange) => void
  onChange?: (range: DateRange) => void
}

export const DateRangeField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [range, setRange] = React.useState<DateRange>([])
  const [showPicker, setShowPicker] = React.useState(false)

  const [currentMonth, setCurrentMonth] = React.useState(moment())
  const nextMonth = React.useMemo(() => currentMonth.clone().month(currentMonth.get('month') + 1), [currentMonth])

  const toggle = React.useCallback(() => {
    if (!props.disabled) {
      setShowPicker(state => !state)
    }
  }, [props.disabled])

  const onSelect = React.useCallback((value: moment.Moment) => {
    if (props.mode === 'single') {
      setRange([value])
    } else if (range.length < 2) {
      setRange(state => [...state, value])
    } else {
      setRange([value])
    }


    // if (range.length === 0) {
    //   setRange([value])
    // } else if (range.length < 2) {
    //   const selected = range[0]

    //   if (selected.isBefore(value)) {
    //     setRange([selected, value])
    //   } else {
    //     setRange([value, selected])
    //   }
    // } else {
    //   const [start, end] = range

    //   if (value.isBetween(start, end)) {
    //     console.log(
    //       value.format('DD/MM/YYYY'),
    //       start.format('DD/MM/YYYY'), 
    //       end.format('DD/MM/YYYY')
    //     )

    //     console.log(value.diff(start), end.diff(value))
        
    //     setRange(value.diff(start) < end.diff(value)
    //       ? [value, end]
    //       : [start, value])

    //   } else if (value.isSameOrBefore(start)) {
    //     setRange([value, end])
    //   } if (value.isSameOrAfter(end)) {
    //     setRange([start, value])
    //   } 
    // }
  }, [range])

  const moveMonthBack = React.useCallback(() => setCurrentMonth(state => state.clone().month(state.get('month') - 1)), [])
  const moveMonthForward = React.useCallback(() => setCurrentMonth(state => state.clone().month(state.get('month') + 1)), [])
  
  React.useEffect(() => {
    if (props.field && props.setter) {
      props.setter(props.field, range)
    }

    if (props.onChange) {
      props.onChange(range)
    }
  }, [range])

  return (
    <Column>
      <FieldContainer onClick={toggle}>
        <FieldIcon><Calendar color={theme.launchpad.colors.text.caption} /></FieldIcon>
        <FieldLabel>{props.label}</FieldLabel>
        
        {range.length === 0 && (
          <FieldPlaceholder>
            mm/dd/yyyy {props.mode === 'range' && ' - mm/dd/yyyy'}
          </FieldPlaceholder>
        )}
        
        {range.length > 0 && (
          <FieldSelectedValue>
            {range.map(date => date.format('MM/DD/YYYY')).join(' - ')}
          </FieldSelectedValue>
        )}
      </FieldContainer>

      
      <IssuanceDialog show={showPicker} onClose={toggle}>
        <DatePicker>
          <DatePickerHeader area='current-header'>
            <ChangeMonthButton onClick={moveMonthBack}>
              <ChevronLeft color={theme.launchpad.colors.primary} />
            </ChangeMonthButton>
            <DatePickerTitle>{currentMonth.format('MMMM YYYY')}</DatePickerTitle>
          </DatePickerHeader>

          <CalendarPicker current={currentMonth} selectedRange={range} onSelect={onSelect} />
          
          <DatePickerHeader area='next-header'>
            <DatePickerTitle>{nextMonth.format('MMMM YYYY')}</DatePickerTitle>
            <ChangeMonthButton onClick={moveMonthForward}>
              <ChevronRight color={theme.launchpad.colors.primary} />
            </ChangeMonthButton>
          </DatePickerHeader>

          <CalendarPicker current={nextMonth} selectedRange={range} onSelect={onSelect} />
        </DatePicker>
      </IssuanceDialog>

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Column>
  )
}

const FieldContainer = styled.div`
  position: relative;

  display: grid;

  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 10px;
  grid-template-areas:
    "label icon"
    "value icon";

  place-content: start center;

  gap: 0.25rem;
  padding: 1rem;

  cursor: pointer;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const FieldIcon = styled.div`
  grid-area: icon;

  display: grid;
  place-content: center;
`

const FieldLabel = styled.div`
  grid-area: label;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldPlaceholder = styled.div`
  grid-area: value;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldSelectedValue = styled.div`
  grid-area: value;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`


const DatePicker = styled.div`
  display: grid;
  
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-template-areas:
    "current-header next-header";

  gap: 1rem;
`

const DatePickerHeader = styled.div<{ area: 'current-header' | 'next-header' }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  grid-area: ${props => props.area};
`


const DatePickerTitle = styled.div`
  display: grid;
  place-content: center;

  flex-grow: 1;
  
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;
  
  text-align: right;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const ChangeMonthButton = styled.button`
  display: grid;
  place-content: center;

  cursor: pointer;

  background: none;
  border: none;

  border-radius: 6px;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`