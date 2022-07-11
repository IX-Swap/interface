import React, { useMemo, ReactChildren } from 'react'
import { MobileDateRangePicker } from '@material-ui/pickers'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import calendarIcon from 'assets/images/calendar.svg'
import { Label } from 'components/Label'
import { Input } from 'components/Input'
import { TYPE } from 'theme'
import { DarkBlueCard } from 'components/MultipleFilters/styleds'
import { Props as LabelProps } from 'components/Label'

interface Props extends Partial<LabelProps> {
  value: [null | string, null | string]
  onChange: (data: [null | string, null | string]) => void
  label?: string
  onBlur?: (e: any) => void
  name?: string
  error?: any | ReactChildren
  openTo?: 'date' | 'year' | 'month'
  maxHeight?: number
  maxDate?: any
  minDate?: any
  placeholder?: string
  calendars?: 1 | 2 | 3
}

export const DateRangePickerInput = ({
  value,
  onChange,
  label,
  error,
  required,
  tooltipText,
  calendars = 1,
  ...rest
}: Props) => {
  return (
    <Container>
      <Label label={t`${label || 'Date picker'}`} required={required} tooltipText={tooltipText} />
      <MobileDateRangePicker
        calendars={calendars}
        value={value}
        onChange={onChange}
        renderInput={({ inputProps }) => {
          return <TextField {...inputProps} />
        }}
        {...rest}
      />
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Container>
  )
}

export const DateRangePickerFilter = ({ value, onChange, label, calendars = 1, ...rest }: Props) => {
  const haveValue = useMemo(() => value.some((el) => el), [value])

  return (
    <MobileDateRangePicker
      value={value}
      onChange={onChange}
      calendars={calendars}
      renderInput={({ inputProps, focused }) => {
        return (
          <DarkBlueCard
            className="dropdown"
            onClick={inputProps?.onClick as any}
            isOpen={Boolean(focused || haveValue)}
          >
            <TYPE.body2
              color="inherit"
              fontWeight={300}
              overflow="hidden"
              style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {label}
            </TYPE.body2>
          </DarkBlueCard>
        )
      }}
      {...rest}
    />
  )
}

const TextField = styled(Input)<{ maxHeight?: number }>`
  border-radius: 36px;
  height: 60px;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : 'auto')};
  padding: 11px 66px 9px 21px;
  font-weight: normal;
  font-size: 16px;
  background-image: ${`url("${calendarIcon}")`};
  background-repeat: no-repeat;
  background-position: right 26px top 19px;
  background-color: ${({ theme: { bg19 } }) => bg19};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
