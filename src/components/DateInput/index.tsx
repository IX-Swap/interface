import React from 'react'
import { DatePicker } from '@material-ui/pickers'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'

import { Input } from 'components/Input'
import calendarIcon from 'assets/images/calendar.svg'

interface Props {
  value?: string | Date | number
  onChange: (value: any) => void
  label?: string
}

export const DateInput = ({ value, onChange, label, ...props }: Props) => {
  return (
    <Container>
      <Label>
        <Trans>{t`${label || 'Date of Birth'}`}</Trans>
      </Label>
      <DatePicker
        value={value || null}
        onChange={onChange}
        openTo="year"
        views={['year', 'month', 'date']}
        format="DD/MM/YYYY"
        TextFieldComponent={(props: Record<string, any>) => <TextField {...props} />}
        {...props}
      />
    </Container>
  )
}

const TextField = styled(Input)`
  border-radius: 36px;
  height: 60px;
  padding: 11px 66px 9px 21px;
  font-weight: normal;
  font-size: 16px;
  background-image: ${`url("${calendarIcon}")`};
  background-repeat: no-repeat;
  background-position: right 26px top 19px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.text2};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 11px;
`
