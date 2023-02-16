import React from 'react'
import styled, { useTheme } from 'styled-components'
import moment from 'moment'
import { Calendar, ChevronLeft, ChevronRight } from 'react-feather'
import { CalendarPicker } from '../Calendar'
import { Column, ErrorText } from 'components/LaunchpadMisc/styled'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { RowEnd } from 'components/Row'

type DateRange = moment.Moment[]
type DateRangeValue = Date[]

interface Props {
  mode: 'single' | 'range'
  label: string
  error?: string
  value?: Date | DateRange
  disabled?: boolean
  minDate?: Date
  field?: string
  setter?: (field: string, value: any) => void
  onChange?: (range: DateRangeValue) => void
  showButton?: boolean
  dateFormat?: string
}

export const DateRangeField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [range, setRange] = React.useState<DateRange>([])
  const [showPicker, setShowPicker] = React.useState(false)

  const [currentMonth, setCurrentMonth] = React.useState(moment())
  const nextMonth = React.useMemo(() => currentMonth.clone().month(currentMonth.get('month') + 1), [currentMonth])

  const toggle = React.useCallback(() => {
    if (!props.disabled) {
      setShowPicker((state) => !state)
    }
  }, [props.disabled])

  const onSelect = React.useCallback(
    (value: moment.Moment) => {
      let selectedRange: DateRange

      if (props.mode === 'single') {
        selectedRange = [value]
      } else if (range.length === 1) {
        const first = range[0]
        selectedRange = first.isBefore(value) ? [first, value] : [value, first]
      } else {
        selectedRange = [value]
      }

      if (props.field && props.setter) {
        props.setter(
          props.field,
          props.mode === 'single' ? selectedRange[0].toDate() : selectedRange.map((x) => x.toDate())
        )
      }

      if (props.onChange) {
        props.onChange(selectedRange.map((x) => x.toDate()))
      }
    },
    [range]
  )

  const moveMonthBack = React.useCallback(
    () => setCurrentMonth((state) => state.clone().month(state.get('month') - 1)),
    []
  )
  const moveMonthForward = React.useCallback(
    () => setCurrentMonth((state) => state.clone().month(state.get('month') + 1)),
    []
  )

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

  const dateFormat = props.dateFormat || 'MM/DD/YYYY'
  return (
    <Column>
      <FieldContainer disabled={props.disabled} onClick={toggle}>
        <FieldIcon>
          <Calendar color={theme.launchpad.colors.text.caption} />
        </FieldIcon>
        <FieldLabel>{props.label}</FieldLabel>

        {range.length === 0 && (
          <FieldPlaceholder>mm/dd/yyyy {props.mode === 'range' && ` - ${dateFormat.toLowerCase()}`}</FieldPlaceholder>
        )}

        {range.length > 0 && (
          <FieldSelectedValue>{range.map((date) => date.format(dateFormat)).join(' - ')}</FieldSelectedValue>
        )}
      </FieldContainer>

      <IssuanceDialog show={showPicker} onClose={toggle}>
        <DatePicker>
          <DatePickerHeader area="current-header">
            <ChangeMonthButton onClick={moveMonthBack}>
              <ChevronLeft color={theme.launchpad.colors.primary} />
            </ChangeMonthButton>
            <DatePickerTitle>{currentMonth.format('MMMM YYYY')}</DatePickerTitle>
          </DatePickerHeader>

          <CalendarPicker minDate={props.minDate} current={currentMonth} selectedRange={range} onSelect={onSelect} />

          <DatePickerHeader area="next-header">
            <DatePickerTitle>{nextMonth.format('MMMM YYYY')}</DatePickerTitle>
            <ChangeMonthButton onClick={moveMonthForward}>
              <ChevronRight color={theme.launchpad.colors.primary} />
            </ChangeMonthButton>
          </DatePickerHeader>

          <CalendarPicker minDate={props.minDate} current={nextMonth} selectedRange={range} onSelect={onSelect} />
        </DatePicker>
        {showButton && (
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
`

const FieldLabel = styled.div`
  grid-area: label;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldPlaceholder = styled.div`
  grid-area: value;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldSelectedValue = styled.div`
  grid-area: value;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.text.title};
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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
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
