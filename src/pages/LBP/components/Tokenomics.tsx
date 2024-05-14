import React, { useState, useMemo, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
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
import { useTokenContract } from 'hooks/useContract'
import { formatUnits } from 'ethers/lib/utils'
import timezone from 'dayjs/plugin/timezone'
import { ethers } from 'ethers'
import { formatNumberWithDecimals } from 'state/lbp/hooks'

dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault('Asia/Singapore')

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

const TokenSelectContainer = styled.div`
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

const TokenOptionsWrapper = styled.div`
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

const LogoIcon = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  margib-right: 20px;
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
export const getTokenOption = (tokenAddress: string, chainId: number = 0) => {
  const tokenOption = TokenOptions(chainId).find((option) => option.tokenAddress === tokenAddress)
  return tokenOption
}

interface TokenomicsData {
  contractAddress?: string
  shareAddress: string
  assetTokenAddress: string
  assetTokenSymbol: string
  shareInput: number
  assetInput: number
  maxSupply: number
  maxPrice: number
  startWeight: number
  endWeight: number
  startDate: any
  endDate: string
}

const validationSchema = Yup.object().shape({
  shareAddress: Yup.string().required('Project Token Address is required'),
  shareInput: Yup.string().required('Project Token Amount is required'),
  assetInput: Yup.string().required('Base Token Amount is required'),
  // maxSupply: Yup.string().required('Max. Supply is required'),
})

interface ProjectInfoProps {
  onChange: (data: any) => void
  formDataTokenomics: TokenomicsData
  shareTitle: string
  shareLogo: any
  endPrice: number
  isEditable: boolean
}

// Refactored Tokenomics component
const Tokenomics = ({
  onChange,
  formDataTokenomics,
  shareTitle,
  shareLogo,
  endPrice,
  isEditable,
}: ProjectInfoProps) => {
  const [valueStart, setStartValue] = useState<number>(30)
  const [valueEnd, setEndValue] = useState<number>(30)
  const [isOpen, setIsOpen] = useState(false)
  const [startDateError, setStartDateError] = useState<string>('')
  const [endDateError, setEndDateError] = useState<string>('')
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())
  const { chainId, account } = useWeb3React()
  const [selectedToken, setSelectedToken] = useState<any>({
    tokenSymbol: 'USDC',
    logo: usdcDropDown,
  })

  const [balances, setBalances] = useState<any>({
    assetBalance: '',
    shareBalance: '',
  })

  const [formData, setFormData] = useState<TokenomicsData>({
    shareAddress: formDataTokenomics.shareAddress,
    assetTokenAddress: formDataTokenomics.assetTokenAddress,
    assetTokenSymbol: formDataTokenomics.assetTokenSymbol,
    shareInput: formDataTokenomics.shareInput,
    assetInput: formDataTokenomics.assetInput,
    maxSupply: formDataTokenomics.maxSupply,
    maxPrice: formDataTokenomics.maxPrice,
    startWeight: formDataTokenomics.startWeight,
    endWeight: formDataTokenomics.endWeight,
    startDate: formDataTokenomics.startDate,
    endDate: formDataTokenomics.endDate,
    contractAddress: formDataTokenomics.contractAddress,
  })

  const formik = useFormik({
    initialValues: {
      shareAddress: '',
      shareInput: '',
      assetInput: '',
      maxSupply: '',
      maxPrice: 0,
      startWeight: 0.3,
      endWeight: 0.0,
      startDate: null,
      endDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  })

  const assetTokenContract = useTokenContract(
    formDataTokenomics.assetTokenAddress ? formDataTokenomics.assetTokenAddress : TOKEN_ADDRESSES.USDC[chainId || 0]
  )
  const shareTokenContract = useTokenContract(formDataTokenomics.shareAddress ?? '')

  useEffect(() => {
    // console.log(assetTokenContract, shareTokenContract)
    if (!account) return
    const loadBalances = async () => {
      if (assetTokenContract) {
        const assetBalance = await assetTokenContract.balanceOf(account)
        const assetDecimals = await assetTokenContract.decimals()
        setBalances((prevBalances: any) => ({
          ...prevBalances,
          assetBalance: formatUnits(assetBalance, assetDecimals),
        }))
      }

      if (shareTokenContract) {
        const shareBalance = await shareTokenContract.balanceOf(account)
        const shareDecimals = await shareTokenContract.decimals()
        setBalances((prevBalances: any) => ({
          ...prevBalances,
          shareBalance: formatUnits(shareBalance, shareDecimals),
        }))
      }
    }

    loadBalances()
  }, [account, assetTokenContract, shareTokenContract])

  useEffect(() => {
    if (!formDataTokenomics.assetTokenSymbol) {
      const defaultTokenOption = TokenOptions(chainId || 0).find((option) => option.tokenSymbol === 'USDC')
      if (defaultTokenOption) {
        setSelectedToken(defaultTokenOption)
        const updatedFormData = {
          ...formDataTokenomics,
          shareName: defaultTokenOption,
          assetTokenAddress: defaultTokenOption.tokenAddress,
          assetTokenSymbol: defaultTokenOption.tokenSymbol,
        }
        setFormData(updatedFormData)
        onChange(updatedFormData)
      }
    }
  }, [formDataTokenomics.assetTokenSymbol, chainId])

  useEffect(() => {
    // skip if already deployed
    const isDeployed = Boolean(
      formDataTokenomics?.contractAddress && formDataTokenomics.contractAddress !== ethers.constants.AddressZero
    )
    if (isDeployed || !formDataTokenomics.endDate || !formDataTokenomics.startDate) {
      return
    }

    const { startDate: startDateRaw, endDate: endDateRaw } = formDataTokenomics

    const startDate = dayjs(startDateRaw)
    const endDate = dayjs(endDateRaw)
    // Check if the current start date is in the past when formDataTokenomics changes
    if (startDate.isBefore(dayjs())) {
      setStartDateError("Start date can't be in the past")
    }

    if (endDate.isBefore(startDate)) {
      setEndDateError('End date must be after start date')
    }

    if (endDate.isBefore(dayjs())) {
      setEndDateError("End date can't be in the past")
    }

    if (endDate && endDate.isBefore(startDate.add(1, 'day'), 'day')) {
      setEndDateError('End date should be at least 1 day bigger than Start Date')
    }
  }, [formDataTokenomics])

  const handleChangeStart = (event: Event, newValue: number | number[]) => {
    const newStartValue = Math.min(Math.max(newValue as number, 1), 99)
    const newEndValue = Math.min(valueEnd, newStartValue - 1)
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
    const newEndValue = Math.min(Math.max(newValue as number, 1), 99)
    const newStartValue = Math.max(valueStart, newEndValue + 1)
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
  const handleStartDateChange = (date: Dayjs | null) => {
    if (date) {
      const now = dayjs()
      if (date.isBefore(now)) {
        setStartDateError("Start date can't be in the past")
      } else {
        setStartDateError('')
        setStartDate(date)
      }
      const newStartDate = date.local().format('YYYY-MM-DD HH:mm:ss')
      const updatedFormData = {
        ...formDataTokenomics,
        startDate: newStartDate,
      }
      setFormData(updatedFormData)
      onChange(updatedFormData)
    }
  }

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date) {
      const now = dayjs()
      const startDate = dayjs(formDataTokenomics.startDate)
      const minEndDate = startDate.add(1, 'day')
      if (date.isBefore(now)) {
        setEndDateError("End date can't be in the past")
      } else if (date.isBefore(minEndDate)) {
        setEndDateError('End date should be at least 1 day bigger than Start Date')
      } else {
        setEndDateError('')
        setEndDate(date)
      }
      const newEndDate = date.local().format('YYYY-MM-DD HH:mm:ss')
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

  const renderTokenImage = (symbol: string) => {
    const chainId = 1
    const tokenOption = TokenOptions(chainId).find((option) => option.tokenSymbol === symbol)
    if (tokenOption && tokenOption.logo) {
      return <img src={tokenOption.logo} alt={symbol} />
    } else {
      return <img src={usdcDropDown} alt={symbol} />
    }
  }
  const handleMaxClick = (balance: string, field: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: balance,
    }))
    onChange({ ...formDataTokenomics, [field]: balance })
  }

  return (
    <Container>
      <TextInput
        placeholder="Project Token Address"
        id="shareAddress"
        label="Project Token Address"
        name="shareAddress"
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        value={formDataTokenomics.shareAddress}
        disabled={isEditable}
      />
      {formik.touched.shareAddress && !formDataTokenomics.shareAddress ? (
        <ErrorText>{formik.errors.shareAddress}</ErrorText>
      ) : null}

      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginBottom="32px">
        <TYPE.label fontSize={'16px'}>
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
              {shareLogo?.public ? <LogoIcon src={shareLogo?.public} alt="Serenity Logo" /> : <Disabled />}
              <TYPE.label fontSize={'14px'}>{shareTitle}</TYPE.label>
            </div>
            <SpanBal>
              Balance: <b>{balances?.shareBalance}</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input
              disabled={isEditable}
              type="number"
              placeholder="0.00"
              name="shareInput"
              onBlur={formik.handleBlur}
              value={formDataTokenomics.shareInput}
              // value={formik.values.shareInput}
              onChange={handleInputChange}
              onWheel={(event) => event.currentTarget.blur()}
            />

            <MaxWrapper onClick={!isEditable ? () => handleMaxClick(balances?.shareBalance, 'shareInput') : undefined}>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {formik.touched.shareInput && !formDataTokenomics.shareInput ? (
          <ErrorText>{formik.errors.shareInput}</ErrorText>
        ) : null}
      </>

      {/* Asset section */}

      <>
        Base Token
        <TokenomicsContainer>
          <TokenomicsItem>
            <TokenSelectContainer>
              <Options onClick={() => setIsOpen(!isOpen && !isEditable)}>
                {renderTokenImage(formDataTokenomics.assetTokenSymbol)}
                {formDataTokenomics?.assetTokenSymbol
                  ? formDataTokenomics?.assetTokenSymbol
                  : selectedToken.tokenSymbol}
              </Options>
              {/* <Options onClick={() => setIsOpen(!isOpen)}>
                <img src={selectedToken.logo} alt={selectedToken.tokenSymbol} />
                {formDataTokenomics?.assetTokenSymbol
                  ? formDataTokenomics?.assetTokenSymbol
                  : selectedToken.tokenSymbol}
              </Options> */}
              <TokenOptionsWrapper className={isOpen ? 'open' : ''}>
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
              </TokenOptionsWrapper>
            </TokenSelectContainer>
            <SpanBal>
              Balance: <b>{balances?.assetBalance}</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input
              disabled={isEditable}
              type="number"
              placeholder="0.00"
              name="assetInput"
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              // value={formik.values.assetInput}
              value={formDataTokenomics.assetInput}
              onWheel={(event) => event.currentTarget.blur()}
            />
            <MaxWrapper onClick={!isEditable ? () => handleMaxClick(balances?.assetBalance, 'assetInput') : undefined}>
              <Span style={{ padding: '10px 20px', cursor: 'pointer' }}>Max</Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {formik.touched.assetInput && !formDataTokenomics.assetInput ? (
          <ErrorText>{formik.errors.assetInput}</ErrorText>
        ) : null}
      </>

      <TextInput
        type="number"
        placeholder="Max. Supply"
        id="maxSupply"
        label="Project Token Max. Supply"
        name="maxSupply"
        onChange={handleInputChange}
        // onBlur={formik.handleBlur}
        value={formDataTokenomics.maxSupply}
        // value={formik.values.maxSupply}
      />
      {/* {formik.touched.maxSupply && !formDataTokenomics.maxSupply ? (
        <ErrorText>{formik.errors.maxSupply}</ErrorText>
      ) : null} */}
      <Line style={{ margin: '40px 0px 30px 0px' }} />

      <RowStart marginBottom="32px">
        <TYPE.label fontSize={'16px'}>
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
              {shareLogo?.public ? <LogoIcon src={shareLogo?.public} alt="Serenity Logo" /> : <Serenity />}

              <div
                style={{
                  borderRight: '1px solid #E6E6FF',
                  paddingRight: '10px',
                  marginRight: '10px',
                  paddingBottom: '2px',
                  marginLeft: '5px',
                }}
              >
                {shareTitle ? shareTitle : 'Project Token'}
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
                  gap: '8px',
                }}
              >
                <div style={{ padding: '10px 20px' }}>{Math.abs(formDataTokenomics.startWeight - 100)}%</div>{' '}
                {renderTokenImage(formDataTokenomics.assetTokenSymbol)}
                {formDataTokenomics?.assetTokenSymbol
                  ? formDataTokenomics?.assetTokenSymbol
                  : selectedToken.tokenSymbol}
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
              disabled={isEditable}
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
              {shareLogo?.public ? <LogoIcon src={shareLogo?.public} alt="Serenity Logo" /> : <Serenity />}
              <div
                style={{
                  borderRight: '1px solid #E6E6FF',
                  paddingRight: '10px',
                  marginRight: '10px',
                  paddingBottom: '2px',
                  marginLeft: '5px',
                }}
              >
                {shareTitle ? shareTitle : 'Project Token'}
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
                  gap: '8px',
                }}
              >
                <div style={{ padding: '10px 20px' }}>{Math.abs(formDataTokenomics.endWeight - 100)}%</div>{' '}
                {renderTokenImage(formDataTokenomics.assetTokenSymbol)}
                {formDataTokenomics?.assetTokenSymbol
                  ? formDataTokenomics?.assetTokenSymbol
                  : selectedToken.tokenSymbol}
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
            disabled={isEditable}
          />
        </Stack>
      </div>
      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginTop="32px" marginBottom={'30px'}>
        <TYPE.label fontSize={'16px'}>
          <Trans>Configure Duration</Trans>
        </TYPE.label>
      </RowStart>

      <FormGrid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: 'grid' }}>
            <DateTimePicker
              disabled={isEditable}
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              onChange={handleStartDateChange}
              label="Start Date"
              value={dayjs(formDataTokenomics.startDate)}
            />
            {startDateError && <span style={{ color: 'red', marginTop: '6px' }}>{startDateError}</span>}
          </div>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: 'grid' }}>
            <DateTimePicker
              disabled={isEditable}
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              onChange={handleEndDateChange}
              label="End Date"
              value={dayjs(formDataTokenomics.endDate)}
            />
            {endDateError && <span style={{ color: 'red', marginTop: '6px' }}>{endDateError}</span>}
          </div>
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
            disabled={true}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formatNumberWithDecimals(endPrice, 3)}
          />
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
            disabled={isEditable}
          />

          {/* {formik.touched.maxPrice && !formDataTokenomics.maxPrice ? (
            <ErrorText>{formik.errors.maxPrice}</ErrorText>
          ) : null} */}
        </div>
      </FormGrid>
    </Container>
  )
}

export default Tokenomics
