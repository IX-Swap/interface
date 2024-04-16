import React, { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { TextInput } from 'pages/KYC/common'
import { TYPE } from 'theme'
import { RowStart } from 'components/Row'
import { Line } from 'components/Line'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { FormGrid } from 'pages/KYC/styleds'
import { ReactComponent as USDC } from '../../../assets/images/usdcNew.svg'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
import { ReactComponent as Disabled } from '../../../assets/images/newCurrencyLogo.svg'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import usdcDropDown from '../../../assets/images/usdcNew.svg'
import ixsDropDown from '../../../assets/images/ixsToken.svg'
import usdtropDown from '../../../assets/images/usdtNewToken.svg'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IXS_ADDRESS, TOKEN_ADDRESSES } from 'constants/addresses'
import { useWeb3React } from '@web3-react/core'

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
  max-width: 350px;
  width: calc(100% - 48px);
  margin-bottom: 10px;
  outline: none;

  &::placeholder {
    font-size: 32px;
    color: #bdbddb;
    font-weight: 700;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button,
  /* Firefox */
  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const MaxWrapper = styled.div`
  text-align: right;
  margin-right: 60px;
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

const LanguageSelectContainer = styled.div`
  margin-top: 20px;
`

const Options = styled.span`
  cursor: pointer;
  border: 1px solid #e6e6ff;
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  gap: 10px;
  display: flex;
  align-items: center;
`

const LanguageOptions = styled.div`
  display: none;
  width: 100%;
  padding: 10px 24px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin-top: 20px;
  background: #ffffff;
  &.open {
    display: block;
  }
`

const ErrorText = styled.span`
  border: none;
  color: red;
  font-size: 12px;
  display: block;
  margin-bottom: 15px;
  margin-top: 10px;
`

export const TokenOptions = (chainId: number) => [
  {
    value: 'USDC',
    tokenAddress: TOKEN_ADDRESSES.USDC[chainId],
    tokenDecimals: 6,
    tokenSymbol: 'USDC',
    logo: usdcDropDown,
  },
  {
    value: 'USDC.e',
    tokenAddress: TOKEN_ADDRESSES['USDC.e'][chainId],
    tokenDecimals: 6,
    tokenSymbol: 'USDC.e',
    logo: usdcDropDown,
  },
  {
    value: 'USDT',
    tokenAddress: TOKEN_ADDRESSES.USDT[chainId],
    tokenDecimals: 18,
    tokenSymbol: 'USDT',
    logo: usdtropDown,
  },
  {
    tokenSymbol: 'IXS',
    tokenAddress: IXS_ADDRESS[chainId],
    tokenDecimals: 18,
    label: 'IXS',
    logo: ixsDropDown,
  },
]

interface TokenomicsData {
  shareAddress: string
  assetTokenAddress: string
  assetTokenSymbol: string
  shareInput: number
  assetInput: number
  maxSupply: number
  minPrice: number
  maxPrice: number
  startWeight: number
  endWeight: number
  startDate: any
  endDate: string
}
type ChangeHandler = (data: Partial<TokenomicsData>) => void

const validationSchema = Yup.object().shape({
  shareAddress: Yup.string().required('Share Address is required'),
  shareInput: Yup.string().required('Share Amount is required'),
  assetInput: Yup.string().required('Asset Amount is required'),
  maxSupply: Yup.string().required('Max. Supply is required'),
  minPrice: Yup.string().required('Min. price is required'),
  maxPrice: Yup.string().required('Max. price is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date is required'),
})

interface ProjectInfoProps {
  onChange: (data: any) => void
  formDataTokenomics: TokenomicsData
}

// Refactored Tokenomics component
const Tokenomics = ({ onChange, formDataTokenomics }: ProjectInfoProps) => {
  const [valueStart, setStartValue] = useState<number>(30)
  const [valueEnd, setEndValue] = useState<number>(30)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<any>({
    tokenSymbol: 'IXS',
    logo: ixsDropDown,
  })

  const { chainId } = useWeb3React()

  const [formData, setFormData] = useState<TokenomicsData>({
    shareAddress: formDataTokenomics.shareAddress,
    assetTokenAddress: formDataTokenomics.assetTokenAddress,
    assetTokenSymbol: formDataTokenomics.assetTokenSymbol,
    shareInput: formDataTokenomics.shareInput,
    assetInput: formDataTokenomics.assetInput,
    maxSupply: formDataTokenomics.maxSupply,
    minPrice: formDataTokenomics.minPrice,
    maxPrice: formDataTokenomics.maxPrice,
    startWeight: formDataTokenomics.startWeight,
    endWeight: formDataTokenomics.endWeight,
    startDate: formDataTokenomics.startDate,
    endDate: formDataTokenomics.endDate,
  })

  const formik = useFormik({
    initialValues: {
      shareAddress: '',
      shareInput: '',
      assetInput: '',
      maxSupply: '',
      minPrice: '',
      maxPrice: '',
      startWeight: 0.3,
      endWeight: 0.0,
      startDate: '',
      endDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  })

  const handleChangeStart = (event: Event, newValue: number | number[]) => {
    const newStartValue = Math.min(Math.max(newValue as number, 3), 100)
    const newEndValue = Math.min(valueEnd, newStartValue - 3)
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    const updatedFormData = {
      ...formDataTokenomics,
      startWeight: newStartValue,
      endWeight: newEndValue,
    }
    setFormData(updatedFormData)
    onChange(updatedFormData)
  }

  const handleChangeEnd = (event: Event, newValue: number | number[]) => {
    const newEndValue = Math.min(Math.max(newValue as number, 0), 97)
    const newStartValue = Math.max(valueStart, newEndValue + 3)
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    const updatedFormData = {
      ...formDataTokenomics,
      startWeight: newStartValue,
      endWeight: newEndValue,
    }
    setFormData(updatedFormData)
    onChange(updatedFormData)
  }

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const newStartDate = dayjs(date).local().format('YYYY-MM-DD HH:mm:ss')
      const updatedFormData = {
        ...formDataTokenomics,
        startDate: newStartDate,
      }
      setFormData(updatedFormData)
      onChange(updatedFormData)
    }
  }
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const newEndDate = dayjs(date).local().format('YYYY-MM-DD HH:mm:ss')
      const updatedFormData = {
        ...formDataTokenomics,
        endDate: newEndDate,
      }
      setFormData(updatedFormData)
      onChange(updatedFormData)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event)
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    onChange({ ...formDataTokenomics, [name]: value })
  }

  const handleSelect = (selectedOption: any) => {
    setSelectedToken(selectedOption)
    setIsOpen(false)

    const updatedFormData = {
      ...formDataTokenomics,
      shareName: selectedOption,
      assetTokenAddress: selectedOption.tokenAddress,
      assetTokenSymbol: selectedOption.tokenSymbol,
      // logo: selectedOption.logo,
    }

    setFormData(updatedFormData)
    onChange(updatedFormData)
  }

  const tokenOptions = useMemo(() => {
    // exclude tokens that has tokenAddress of undefined
    return TokenOptions(chainId || 0).filter((option) => option.tokenAddress)
  }, [chainId])

  console.info('tokenOptions', tokenOptions)

  return (
    <Container>
      <TextInput
        placeholder="Share Address"
        id="shareAddress"
        label="Share Address"
        name="shareAddress"
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        value={formDataTokenomics.shareAddress}
      />
      {formik.touched.shareAddress && formik.errors.shareAddress ? (
        <ErrorText>{formik.errors.shareAddress}</ErrorText>
      ) : null}
      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginBottom="32px">
        <TYPE.label>
          <Trans>Configure Quantities</Trans>
        </TYPE.label>
      </RowStart>
      <>
        Project Token
        <TokenomicsContainer>
          <TokenomicsItem>
            <div
              style={{
                border: '1px solid #E6E6FF',
                padding: '10px 20px',
                background: '#FFFFFF',
                display: 'flex',
                gap: '8px',
                borderRadius: '8px',
                alignItems: 'center',
              }}
            >
              <Disabled />
              <TYPE.label fontSize={'14px'}>Serenity</TYPE.label>
            </div>
            <SpanBal>
              Balance: <b>4,000.00</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input
              type="number"
              placeholder="0.00"
              name="shareInput"
              onBlur={formik.handleBlur}
              value={formDataTokenomics.shareInput}
              // value={formik.values.shareInput}
              onChange={handleInputChange}
            />

            <MaxWrapper>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {formik.touched.shareInput && formik.errors.shareInput ? (
          <ErrorText>{formik.errors.shareInput}</ErrorText>
        ) : null}
      </>

      {/* Asset section */}

      <>
        Base Token
        <TokenomicsContainer>
          <TokenomicsItem>
            <LanguageSelectContainer>
              <Options onClick={() => setIsOpen(!isOpen)}>
                <img src={selectedToken.logo} alt={selectedToken.tokenSymbol} />
                {selectedToken.tokenSymbol}
              </Options>
              <LanguageOptions className={isOpen ? 'open' : ''}>
                {tokenOptions.map((option, index) => (
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '10px',
                      marginBottom: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                    }}
                    key={index}
                    onClick={() => handleSelect(option)}
                  >
                    <img src={option.logo} alt={option.tokenSymbol} />
                    <span>{option.tokenSymbol}</span>
                  </div>
                ))}
              </LanguageOptions>
            </LanguageSelectContainer>
            <SpanBal>
              Balance: <b>4,000.00</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input
              type="number"
              placeholder="0.00"
              name="assetInput"
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              // value={formik.values.assetInput}
              value={formDataTokenomics.assetInput}
            />
            <MaxWrapper>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {formik.touched.assetInput && formik.errors.assetInput ? (
          <ErrorText>{formik.errors.assetInput}</ErrorText>
        ) : null}
      </>

      <TextInput
        type="number"
        placeholder="Max. Supply"
        id="maxSupply"
        label="Share Max. Supply"
        name="maxSupply"
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        value={formDataTokenomics.maxSupply}
        // value={formik.values.maxSupply}
      />
      {formik.touched.maxSupply && formik.errors.maxSupply ? <ErrorText>{formik.errors.maxSupply}</ErrorText> : null}
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
                padding: '0px 10px',
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
              <div style={{ padding: '10px 20px' }}>{formDataTokenomics.startWeight}%</div>
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
                <div style={{ padding: '10px 20px' }}>{Math.abs(formDataTokenomics.startWeight - 100)}%</div>{' '}
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
              value={formDataTokenomics.startWeight}
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
                padding: '0px 10px',
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
              <div style={{ padding: '10px 20px' }}>{formDataTokenomics.endWeight}%</div>
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
                <div style={{ padding: '10px 20px' }}>{Math.abs(formDataTokenomics.endWeight - 100)}%</div>{' '}
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
          <Slider
            aria-label="End Weight"
            style={{ color: '#6666FF' }}
            value={formDataTokenomics.endWeight ? formDataTokenomics.endWeight : valueEnd}
            onChange={handleChangeEnd}
          />
        </Stack>
      </div>
      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginTop="32px" marginBottom={'30px'}>
        <TYPE.label>
          <Trans>Configure Duration</Trans>
        </TYPE.label>
      </RowStart>

      <FormGrid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              onChange={handleStartDateChange}
              label="Start Date"
              // defaultValue={dayjs(formDataTokenomics.startDate).toDate() as Date}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
              onChange={handleEndDateChange}
              label="End Date"
              // value={formDataTokenomics.endDate ? new Date(formDataTokenomics.endDate) : null}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormGrid>

      <Line style={{ margin: '50px 0px 50px 0px' }} />
      <FormGrid>
        <div style={{ display: 'block' }}>
          <TextInput
            type="number"
            placeholder="$1.00"
            id="minPrice"
            label="Min. price"
            name="minPrice"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formDataTokenomics.minPrice}
          />
          {formik.touched.minPrice && formik.errors.minPrice ? <ErrorText>{formik.errors.minPrice}</ErrorText> : null}
        </div>

        <div style={{ display: 'block' }}>
          <TextInput
            type="number"
            placeholder="$0.00"
            id="maxPrice"
            label="Max. price"
            name="maxPrice"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formDataTokenomics.maxPrice}
          />
          {formik.touched.maxPrice && formik.errors.maxPrice ? <ErrorText>{formik.errors.maxPrice}</ErrorText> : null}
        </div>
      </FormGrid>
    </Container>
  )
}

export default Tokenomics
