import React, { useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { TextInput } from 'pages/KYC/common'
import { TYPE } from 'theme'
import { RowStart } from 'components/Row'
import { Line } from 'components/Line'
import { DateInput } from 'components/DateInput' // Import the DateInput component
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { FormGrid } from 'pages/KYC/styleds'

const TokenomicsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e6e6ff;
  background: #f7f7fa;
  padding: 12px 18px;
  margin-bottom: 10px;
`

const TokenomicsItem = styled.div`
  margin-bottom: 8px;
`

const Select = styled.select`
  flex: 1;
  display: block;
  border: none;
  padding: 8px;
  margin-right: 8px;
`

const Option = styled.option`
  padding: 8px;
`

const Span = styled.span`
  color: #8f8fb2;
  font-size: 12px;
  padding: 8px;
  text-align: center;
  border: 1px solid #e6e6ff;
  background: #ffffff;
  border-radius: 6px;
  width: fit-content;
  margin: 0 auto;
`

const Input = styled.input`
  border: none;
  padding: 8px;
  text-align: right;
  background: none;
  font-size: 32px;
  font-weight: 700;
  color: #292933;
  max-width: 200px;
  width: calc(100% - 48px);
  margin-bottom: 10px;
  &::placeholder {
    font-size: 32px;
    color: #bdbddb;
    font-weight: 700;
  }
`

const MaxWrapper = styled.div`
  text-align: center;
`

const WeightsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px 18px;
  margin-bottom: 10px;
`
const SpanBal = styled.span`
  display: block;
  color: #8f8fb2;
  font-size: 12px;
  padding: 8px;
  margin-top: 8px;
`
const Tokenomics = () => {
  const [valueStart, setStartValue] = useState<number>(30)
  const [valueEnd, setEndValue] = useState<number>(30)
  const [valueStartDate, setStartDate] = useState('')
  const [valueEndDate, setEndDate] = useState('')

  const handleChangeStart = (event: Event, newValue: number | number[]) => {
    setStartValue(newValue as number)
  }

  const handleChangeEnd = (event: Event, newValue: number | number[]) => {
    setEndValue(newValue as number)
  }

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const newStartDate = dayjs(date).local().format('YYYY-MM-DD')
      setStartDate(newStartDate)
    }
  }

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const newEndDate = dayjs(date).local().format('YYYY-MM-DD')
      setEndDate(newEndDate)
    }
  }

  return (
    <>
      <TextInput placeholder="Share Address" id="title" label="Share Address" />
      <RowStart marginBottom="32px">
        <TYPE.label>
          <Trans>Configure Quantities</Trans>
        </TYPE.label>
      </RowStart>
      <>
        Share
        <TokenomicsContainer>
          <TokenomicsItem>
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
            <SpanBal>
              Balance: <b>4,000.00</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input type="text" placeholder="0.00" />
            <MaxWrapper>
              <Span>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
      </>

      <>
        Asset
        <TokenomicsContainer>
          <TokenomicsItem>
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
            <SpanBal>
              Balance: <b>4,000.00</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input type="text" placeholder="0.00" />
            <MaxWrapper>
              <Span>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
      </>

      <TextInput placeholder="Max. Supply" id="Max" label="Share Max. Supply Max. Supply" />
      <Line style={{ margin: '20px' }} />

      <RowStart marginBottom="32px">
        <TYPE.label>
          <Trans>Configure Weights</Trans>
        </TYPE.label>
      </RowStart>
      <>
        Start Weight
        <WeightsContainer>
          <TokenomicsItem>
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </TokenomicsItem>
          <TokenomicsItem>
            <MaxWrapper>
              <Span>Max</Span>
            </MaxWrapper>
            {/* <Input type="text" placeholder="0.00" /> */}
          </TokenomicsItem>
        </WeightsContainer>
        <div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider aria-label="Volume" style={{ color: '#6666FF' }} value={valueStart} onChange={handleChangeStart} />
          </Stack>
        </div>
      </>
      <>
        End Weight
        <WeightsContainer>
          <TokenomicsItem>
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </TokenomicsItem>
          <TokenomicsItem>
            <MaxWrapper>
              <Span>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </WeightsContainer>
      </>
      <div>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="Volume" style={{ color: '#6666FF' }} value={valueEnd} onChange={handleChangeEnd} />
        </Stack>
      </div>
      <Line style={{ margin: '20px' }} />
      <RowStart marginTop="32px">
        <TYPE.label>
          <Trans>Configure Duration</Trans>
        </TYPE.label>
      </RowStart>

      <FormGrid>
        <DateInput
          label={''}
          placeholder="ID Issuance Date"
          id="documentIssueDateButton"
          maxHeight={60}
          value={valueStartDate}
          onChange={handleStartDateChange}
          maxDate={new Date()}
        />
        <DateInput
          label={''}
          id="documentExpiryDateButton"
          placeholder="ID Expiration Date"
          maxHeight={60}
          value={valueEndDate}
          onChange={handleEndDateChange}
          minDate={new Date()}
        />
      </FormGrid>
      <Line style={{ margin: '20px' }} />
      <FormGrid>
        <TextInput placeholder="$1.00" id="title" label="Min. price" />
        <TextInput placeholder="$0.00" id="title" label="Max. price" />
      </FormGrid>
    </>
  )
}

export default Tokenomics
