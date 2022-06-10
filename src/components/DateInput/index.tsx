import React, { ReactChildren } from 'react'
import { DatePicker } from '@material-ui/pickers'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { Label } from 'components/Label'
import { TYPE } from 'theme'
import { Input } from 'components/Input'
import { Props as LabelProps } from 'components/Label'
import calendarIcon from 'assets/images/calendar.svg'

interface Props {
  value?: string | Date | number
  onChange: (value: any) => void
  name?: string
  error?: any | ReactChildren
  openTo?: 'date' | 'year' | 'month'
  maxHeight?: number
  maxDate?: any
  minDate?: any
  placeholder?: string
}

export const DateInput = ({
  value,
  openTo,
  onChange,
  label,
  error,
  maxDate,
  tooltipText,
  required,
  ...props
}: Props & Partial<LabelProps>) => {
  return (
    <Container>
      <Label label={t`${label || 'Date of Birth'}`} required={required} tooltipText={tooltipText} />
      <DatePicker
        value={value || null}
        onChange={onChange}
        openTo={openTo ?? 'year'}
        views={['year', 'month', 'date']}
        inputFormat="DD/MM/YYYY"
        renderInput={(props: Record<string, any>) => <TextField {...props} />}
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
