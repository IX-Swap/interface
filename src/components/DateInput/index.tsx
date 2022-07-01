import React, { ReactChildren } from 'react'
import { DatePicker } from '@material-ui/pickers'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { TYPE } from 'theme'
import { Input } from 'components/Input'
import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg'

interface Props {
  value?: string | Date | number
  onChange: (value: any) => void
  onBlur?: (e: any) => void
  label?: string
  name?: string
  error?: any | ReactChildren
  maxHeight?: number
  maxDate?: any
  minDate?: any
}

export const DateInput = ({ value, onChange, label, name, onBlur, error, maxDate, ...props }: Props) => {
  return (
    <Container>
      <Label>{t`${label || 'Date of Birth'}`}</Label>
      <DatePicker
        name={name}
        value={value || null}
        onChange={onChange}
        onBlur={onBlur}
        autoOk
        openTo="year"
        views={['year', 'month', 'date']}
        format="DD/MM/YYYY"
        TextFieldComponent={(props: Record<string, any>) => (
          <TextFieldContainer>
            <TextField {...props} />
            <StyledCalendarIcon />
          </TextFieldContainer>
        )}
        maxDate={maxDate}
        {...props}
      />
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Container>
  )
}

const TextFieldContainer = styled.div`
  position: relative;
`

const StyledCalendarIcon = styled(CalendarIcon)`
  position: absolute;
  right: 26px;
  top: 19px;
`

const TextField = styled(Input)<{ maxHeight?: number }>`
  border-radius: 36px;
  height: 60px;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : 'auto')};
  padding: 11px 66px 9px 21px;
  font-weight: normal;
  font-size: 16px;
  background-color: ${({ theme: { bg19 } }) => bg19};
`

const Label = styled.div`
  color: ${({ theme }) => theme.text2};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 11px;
`
