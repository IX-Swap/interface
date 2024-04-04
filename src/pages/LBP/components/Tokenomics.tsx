import React, { useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { TextInput } from 'pages/KYC/common'
import { TYPE } from 'theme'
import { RowStart } from 'components/Row'
import { Line } from 'components/Line'
import { DateInput } from 'components/DateInput'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { FormGrid } from 'pages/KYC/styleds'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'


const Container = styled.div`
  width: 100%;
`

const TokenomicsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #e6e6ff;
  background: #f7f7fa;
  padding: 12px 18px;
  margin-bottom: 20px;
  margin-top: 15px;
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

// Refactored Tokenomics component
const Tokenomics = ({ onChange }: { onChange: (data: any) => void }) => {
  const [valueStart, setStartValue] = useState<number>(30)
  const [valueEnd, setEndValue] = useState<number>(30)
  const [valueStartDate, setStartDate] = useState('')
  const [valueEndDate, setEndDate] = useState('')
  const [formData, setFormData] = useState<any>({
    shareAddress: '',
    shareInput: '',
    assetInput: '',
    maxSupply: '',
    minPrice: '',
    maxPrice: '',
    startWeight: 30,
    endWeight: 30,
    idIssuanceDate: '',
    idExpirationDate: '',
  })

  const handleChangeStart = (event: Event, newValue: number | number[]) => {
    const newStartValue = newValue as number
    const newEndValue = Math.max(valueEnd, newStartValue - 3) // Ensure end value is at least 3 less than start value
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    setFormData({ ...formData, startWeight: newStartValue, endWeight: newEndValue })
    onChange({ ...formData, startWeight: newStartValue, endWeight: newEndValue })
  }

  const handleChangeEnd = (event: Event, newValue: number | number[]) => {
    const newEndValue = newValue as number
    const newStartValue = Math.min(valueStart, newEndValue + 3) // Ensure start value is at least 3 more than end value
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    setFormData({ ...formData, startWeight: newStartValue, endWeight: newEndValue })
    onChange({ ...formData, startWeight: newStartValue, endWeight: newEndValue })
  }

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const newStartDate = dayjs(date).local().format('YYYY-MM-DD HH:mm:ss');
      setStartDate(newStartDate);
      setFormData({ ...formData, idIssuanceDate: newStartDate });
      onChange({ ...formData, idIssuanceDate: newStartDate });
    }
  };
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const newEndDate = dayjs(date).local().format('YYYY-MM-DD HH:mm:ss');
      setEndDate(newEndDate);
      setFormData({ ...formData, idExpirationDate: newEndDate });
      onChange({ ...formData, idExpirationDate: newEndDate });
    }
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
    onChange({ ...formData, [name]: value })
  }

  return (
    <Container>
      <TextInput
        placeholder="Share Address"
        id="shareAddress"
        label="Share Address"
        name="shareAddress"
        onChange={handleInputChange}
      />
      <Line style={{ margin: '40px 0px 30px 0px' }} />
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
            <Input type="text" placeholder="0.00" name="shareInput" onChange={handleInputChange} />
            <MaxWrapper>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
      </>

      {/* Asset section */}

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
            <Input type="text" placeholder="0.00" name="assetInput" onChange={handleInputChange} />
            <MaxWrapper>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
      </>

      <TextInput
        placeholder="Max. Supply"
        id="maxSupply"
        label="Share Max. Supply"
        name="maxSupply"
        onChange={handleInputChange}
      />
      <Line style={{ margin: '40px 0px 30px 0px' }} />

      <RowStart marginBottom="32px">
        <TYPE.label>
          <Trans>Configure Weights</Trans>
        </TYPE.label>
      </RowStart>
      <>
        Start Weight
        <WeightsContainer style={{ padding: '12px 0px' }}>
          <TokenomicsItem>
            <div
              style={{
                border: '1px solid #E6E6FF',
                padding: '0px 0px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Serenity />{' '}
              <div
                style={{
                  borderRight: '1px solid #E6E6FF',
                  paddingRight: '10px',
                  marginRight: '10px',
                  paddingBottom: '2px',
                  marginLeft: '5px',
                }}
              >
                Serenity
              </div>
              <div style={{ padding: '10px 20px' }}>{valueStart}%</div>
            </div>
          </TokenomicsItem>
          <TokenomicsItem>
            <TokenomicsItem>
              <div
                style={{
                  border: '1px solid #E6E6FF',
                  padding: '0px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ padding: '10px 20px' }}>{Math.abs(valueStart - 100)}%</div>{' '}
                <div
                  style={{
                    borderRight: '1px solid #E6E6FF',
                    paddingRight: '10px',
                    marginRight: '10px',
                    paddingBottom: '2px',
                    marginLeft: '5px',
                  }}
                >
                  USDC
                </div>
                <USDC />
              </div>
            </TokenomicsItem>
          </TokenomicsItem>
        </WeightsContainer>
        <div>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <Slider
              aria-label="Start Weight"
              style={{ color: '#6666FF' }}
              value={valueStart}
              onChange={handleChangeStart}
            />
          </Stack>
        </div>
      </>
      <>
        End Weight
        <WeightsContainer style={{ padding: '12px 0px' }}>
          <TokenomicsItem>
            <div
              style={{
                border: '1px solid #E6E6FF',
                padding: '0px 0px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Serenity />{' '}
              <div
                style={{
                  borderRight: '1px solid #E6E6FF',
                  paddingRight: '10px',
                  marginRight: '10px',
                  paddingBottom: '2px',
                  marginLeft: '5px',
                }}
              >
                Serenity
              </div>
              <div style={{ padding: '10px 20px' }}>{valueEnd}%</div>
            </div>
          </TokenomicsItem>
          <TokenomicsItem>
            <TokenomicsItem>
              <div
                style={{
                  border: '1px solid #E6E6FF',
                  padding: '0px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ padding: '10px 20px' }}>{Math.abs(valueEnd - 100)}%</div>{' '}
                <div
                  style={{
                    borderRight: '1px solid #E6E6FF',
                    paddingRight: '10px',
                    marginRight: '10px',
                    paddingBottom: '2px',
                    marginLeft: '5px',
                  }}
                >
                  USDC
                </div>
                <USDC />
              </div>
            </TokenomicsItem>
          </TokenomicsItem>
        </WeightsContainer>
      </>
      <div>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider aria-label="End Weight" style={{ color: '#6666FF' }} value={valueEnd} onChange={handleChangeEnd} />
        </Stack>
      </div>
      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginTop="32px" marginBottom={'30px'}>
        <TYPE.label>
          <Trans>Configure Duration</Trans>
        </TYPE.label>
      </RowStart>

      <FormGrid>
        {/* <DateTimeInput
          label={''}
          placeholder="ID Issuance Date"
          id="documentIssueDateButton"
          maxHeight={60}
          value={valueStartDate}
          onChange={handleStartDateChange}
          maxDate={new Date()}
        />
        <DateTimeInput
          label={''}
          id="documentExpiryDateButton"
          placeholder="ID Expiration Date"
          maxHeight={60}
          value={valueEndDate}
          onChange={handleEndDateChange}
          minDate={new Date()}
        /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker onChange={handleStartDateChange} label="ID Issuance Date" />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker onChange={handleEndDateChange} label="ID Expiration Date" />
          </DemoContainer>
        </LocalizationProvider>

      </FormGrid>
      <Line style={{ margin: '50px 0px 50px 0px' }} />
      <FormGrid>
        <TextInput placeholder="$1.00" id="minPrice" label="Min. price" name="minPrice" onChange={handleInputChange} />
        <TextInput placeholder="$0.00" id="maxPrice" label="Max. price" name="maxPrice" onChange={handleInputChange} />
      </FormGrid>
    </Container>
  )
}

export default Tokenomics
