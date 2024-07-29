import React, { useState, useMemo, useEffect, useCallback } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Select, TextInput } from 'pages/KYC/common'
import { TYPE } from 'theme'
import { RowStart } from 'components/Row'
import { Line } from 'components/Line'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import { FormGrid } from 'pages/KYC/styleds'
import { ReactComponent as Serenity } from '../../../assets/images/serenity.svg'
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
import { isEmptyObject, isEthChainAddress } from 'utils'
import { blockchainNetworks } from 'pages/KYC/mock'
import { checkWrongChain } from 'chains'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'

dayjs.extend(utc)
dayjs.extend(timezone)

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
    tokenDecimals: 6,
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
  xTokenLiteProxyAddress: string
  assetTokenAddress: string
  assetTokenSymbol: string
  shareInput: number
  assetInput: number
  maxSupply?: number | string
  maxPrice?: number | string
  startWeight: number
  endWeight: number
  startDate: any
  endDate: string
  network: string
}

const validationSchema = Yup.object().shape({
  shareAddress: Yup.string()
    .nullable()
    .required('Project Token Address is required')
    .test('is-valid-address', 'Please enter a valid address', (value) => Boolean(isEthChainAddress(value))),
  xTokenLiteProxyAddress: Yup.string()
    .nullable()
    .test('is-valid-address', 'Please enter a valid address', (value) => Boolean(isEthChainAddress(value))),
  shareInput: Yup.string().required('Project Token Amount is required'),
  assetInput: Yup.string().required('Base Token Amount is required'),
  network: Yup.string().required('Network is required'),
})

interface ProjectInfoProps {
  onChange: (data: any) => void
  formDataTokenomics: TokenomicsData
  shareTitle: string
  shareLogo: any
  endPrice: number
  isEditable: boolean
  setProjectTokenSymbol: (projectToken: string) => void
  setDirty: (dirty: boolean) => void
}

// Refactored Tokenomics component
const Tokenomics = ({
  onChange,
  formDataTokenomics,
  shareTitle,
  shareLogo,
  endPrice,
  isEditable,
  setProjectTokenSymbol,
  setDirty,
}: ProjectInfoProps) => {
  const [valueStart, setStartValue] = useState<number>(30)
  const [valueEnd, setEndValue] = useState<number>(30)
  const [isOpen, setIsOpen] = useState(false)
  const [startDateError, setStartDateError] = useState<string>('')
  const [endDateError, setEndDateError] = useState<string>('')
  const { chainId, account } = useWeb3React()
  const [selectedNetwork, setSelectedNetwork] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<any>({
    tokenSymbol: 'USDC',
    logo: usdcDropDown,
  })

  const [balances, setBalances] = useState<any>({
    assetBalance: '',
    shareBalance: '',
  })
  const { isWrongChain, expectChain } = checkWrongChain(chainId || 0, selectedNetwork)

  const getAddresses = (chainId: number, assetTokenAddress: string = TOKEN_ADDRESSES.USDC[chainId || 0]) => ({
    assetTokenAddress: assetTokenAddress || '',
    shareTokenAddress: formDataTokenomics?.shareAddress || '',
  })

  const [addresses, setAddresses] = useState(getAddresses(chainId || 0))
  const assetTokenContract = useTokenContract(addresses.assetTokenAddress)
  const shareTokenContract = useTokenContract(addresses.shareTokenAddress)
  const formik = useFormik({
    initialValues: {
      shareAddress: '',
      xTokenLiteProxyAddress: '',
      shareInput: '',
      assetInput: '',
      maxSupply: '',
      maxPrice: 0,
      startWeight: 0.3,
      endWeight: 0.0,
      startDate: null,
      endDate: '',
      network: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  })

  const loadBalances = useCallback(async () => {
    if (!account) return

    try {
      if (assetTokenContract) {
        const assetBalance = await assetTokenContract.balanceOf(account)
        const assetDecimals = await assetTokenContract.decimals()
        setBalances((prevBalances: any) => ({
          ...prevBalances,
          assetBalance: formatUnits(assetBalance, assetDecimals),
        }))
      }
    } catch (error) {
      console.error('Error fetching asset balance:', error)
    }

    try {
      if (shareTokenContract) {
        const shareBalance = await shareTokenContract.balanceOf(account)
        const shareDecimals = await shareTokenContract.decimals()
        const shareSymbol = await shareTokenContract.symbol()
        setProjectTokenSymbol(shareSymbol)
        setBalances((prevBalances: any) => ({
          ...prevBalances,
          shareBalance: formatUnits(shareBalance, shareDecimals),
        }))
      } else {
        setProjectTokenSymbol('')
      }
    } catch (error) {
      console.error('Error fetching share balance:', error)
    }
  }, [account, assetTokenContract, shareTokenContract, setProjectTokenSymbol])

  useEffect(() => {
    setAddresses(getAddresses(chainId || 0))
  }, [chainId, formDataTokenomics?.shareAddress])

  useEffect(() => {
    if (isWrongChain) {
      const updatedFormData = {
        shareAddress: '',
      }
      onChange(updatedFormData)
    }
    loadBalances()
  }, [isWrongChain, loadBalances, addresses, chainId])

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

    if (endDate && endDate.isBefore(startDate.add(1, 'day'))) {
      setEndDateError('End date should be at least 1 day bigger than Start Date')
    }
  }, [formDataTokenomics])

  const handleChangeStart = (event: Event, newValue: number | number[]) => {
    const newStartValue = Math.min(Math.max(newValue as number, 1), 99)
    const newEndValue = Math.min(valueEnd, newStartValue == 1 ? 1 : newStartValue - 1)
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    const updatedFormData = {
      ...formDataTokenomics,
      startWeight: newStartValue,
      endWeight: newEndValue,
    }
    onChange(updatedFormData)
  }

  const handleChangeEnd = (event: Event, newValue: number | number[]) => {
    const newEndValue = Math.min(Math.max(newValue as number, 1), 99)
    const newStartValue = Math.max(valueStart, newEndValue === 99 ? 99 : newEndValue + 1)
    setStartValue(newStartValue)
    setEndValue(newEndValue)
    const updatedFormData = {
      ...formDataTokenomics,
      startWeight: newStartValue,
      endWeight: newEndValue,
    }
    onChange(updatedFormData)
  }
  const handleStartDateChange = (date: Dayjs | null) => {
    if (date) {
      const now = dayjs()
      if (date.isBefore(now)) {
        setStartDateError("Start date can't be in the past")
      } else {
        setStartDateError('')
      }
      const newStartDate = date.local().format('YYYY-MM-DD HH:mm:ss')
      const updatedFormData = {
        ...formDataTokenomics,
        startDate: newStartDate,
      }
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
      }
      const newEndDate = date.local().format('YYYY-MM-DD HH:mm:ss')
      const updatedFormData = {
        ...formDataTokenomics,
        endDate: newEndDate,
      }
      onChange(updatedFormData)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event)
    const { name, value } = event.target
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
    setAddresses(getAddresses(chainId || 0, selectedOption.tokenAddress))
    onChange(updatedFormData)
  }

  const handleSelectNetwork = (selectedOption: any) => {
    const chainName = selectedOption?.value
    const updatedAddresses = getAddresses(selectedOption.chainId)
    const updatedFormData = {
      ...formDataTokenomics,
      network: chainName,
      assetTokenAddress: updatedAddresses.assetTokenAddress,
    }
    setSelectedNetwork(selectedOption?.value)
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
    onChange({ ...formDataTokenomics, [field]: balance })
  }

  const renderLogo = (shareLogo: any) => {
    return shareLogo && typeof shareLogo === 'object' && shareLogo.public ? (
      <LogoIcon as="img" src={shareLogo.public} alt="Serenity Logo" />
    ) : shareLogo && (typeof shareLogo === 'string' || shareLogo instanceof File) ? (
      <LogoIcon
        as="img"
        src={shareLogo instanceof File ? URL.createObjectURL(shareLogo) : shareLogo}
        alt="Serenity Logo"
      />
    ) : (
      <Serenity />
    )
  }

  useEffect(() => {
    formik.setFieldValue('shareAddress', formDataTokenomics.shareAddress)
    formik.setFieldValue('shareInput', formDataTokenomics.shareInput)
    formik.setFieldValue('assetInput', formDataTokenomics.assetInput)
    formik.setFieldValue('network', formDataTokenomics.network)
    setStartValue(formDataTokenomics.startWeight)
    setEndValue(formDataTokenomics.endWeight)
  }, [formDataTokenomics])

  useEffect(() => {
    if (!isEmptyObject(formik.touched)) {
      setDirty(true)
    }
  }, [JSON.stringify(formik.touched)])



  console.log(formDataTokenomics.assetTokenAddress, chainId, 'assetTokenAddress')

  return (
    <Container>
      <InputeWrapper>
        <Block>
          <TextInput
            placeholder="Project Token Address"
            id="shareAddress"
            label="Project Token Address *"
            name="shareAddress"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formDataTokenomics.shareAddress}
            disabled={!isEditable}
          />
          {formik.touched.shareAddress && (formik.errors.shareAddress || !formDataTokenomics.shareAddress) ? (
            <ErrorText>{formik.errors.shareAddress}</ErrorText>
          ) : null}
        </Block>

        <Block>
          <Select
            name="network"
            id="network"
            label="Blockchain Network"
            placeholder="Blockchain Network"
            selectedItem={formik.values.network}
            items={blockchainNetworks}
            value={formDataTokenomics.network}
            onSelect={(selectedItem) => {
              handleSelectNetwork(selectedItem)
              formik.setFieldTouched('network', true)
            }}
          />
          {formik.touched.network && (formik.errors.network || !formDataTokenomics.network) ? (
            <ErrorText>{formik.errors.network}</ErrorText>
          ) : null}
        </Block>

        {/* open dailog box for change network */}
        {isWrongChain ? (
          <Portal>
            <CenteredFixed width="100vw" height="100vh">
              <NetworkNotAvailable expectChain={expectChain} />
            </CenteredFixed>
          </Portal>
        ) : null}
      </InputeWrapper>

      <div style={{ marginTop: 16 }}>
        <TextInput
          placeholder="Not required for project token of type ERC20"
          id="xTokenLiteProxyAddress"
          label="XTokenLite Proxy Address"
          name="xTokenLiteProxyAddress"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formDataTokenomics.xTokenLiteProxyAddress}
          disabled={!isEditable}
        />
        {formik.touched.xTokenLiteProxyAddress &&
        formDataTokenomics.xTokenLiteProxyAddress &&
        formik.errors.xTokenLiteProxyAddress ? (
          <ErrorText>{formik.errors.xTokenLiteProxyAddress}</ErrorText>
        ) : null}
      </div>

      <Line style={{ margin: '40px 0px 30px 0px' }} />
      <RowStart marginBottom="32px">
        <TYPE.label fontSize={'16px'}>
          <Trans>Configure Quantities</Trans>
        </TYPE.label>
      </RowStart>
      <>
        Project Token *
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
              {renderLogo(shareLogo)}
              <TYPE.label fontSize={'14px'}>{shareTitle}</TYPE.label>
            </div>
            <SpanBal>
              Balance: <b>{formDataTokenomics.shareAddress ? balances?.shareBalance : 0}</b>
            </SpanBal>
          </TokenomicsItem>
          <TokenomicsItem>
            <Input
              disabled={!isEditable}
              type="number"
              placeholder="0.00"
              name="shareInput"
              onBlur={formik.handleBlur}
              value={formDataTokenomics.shareInput}
              // value={formik.values.shareInput}
              onChange={handleInputChange}
              onWheel={(event) => event.currentTarget.blur()}
            />

            <MaxWrapper>
              <Span
                style={{ padding: '10px 20px', cursor: 'pointer' }}
                onClick={isEditable ? () => handleMaxClick(balances?.shareBalance, 'shareInput') : undefined}
              >
                Max.
              </Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {balances?.shareBalance &&
        parseFloat(formDataTokenomics.shareInput.toString() || '0') > parseFloat(balances?.shareBalance || '0') ? (
          <ErrorText>Insufficient balance</ErrorText>
        ) : null}
        {formik.touched.shareInput && formik.errors.shareInput ? (
          <ErrorText>{formik.errors.shareInput}</ErrorText>
        ) : null}
      </>

      {/* Asset section */}

      <>
        Base Token *
        <TokenomicsContainer>
          <TokenomicsItem>
            <TokenSelectContainer>
              <Options onClick={() => setIsOpen(!isOpen && isEditable)}>
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
              disabled={!isEditable}
              type="number"
              placeholder="0.00"
              name="assetInput"
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              // value={formik.values.assetInput}
              value={formDataTokenomics.assetInput}
              onWheel={(event) => event.currentTarget.blur()}
            />
            <MaxWrapper>
              <Span
                style={{ padding: '10px 20px', cursor: 'pointer' }}
                onClick={isEditable ? () => handleMaxClick(balances?.assetBalance, 'assetInput') : undefined}
              >
                Max.
              </Span>
            </MaxWrapper>
          </TokenomicsItem>
        </TokenomicsContainer>
        {balances?.assetBalance &&
        parseFloat(formDataTokenomics.assetInput.toString() || '0') > parseFloat(balances?.assetBalance || '0') ? (
          <ErrorText>Insufficient balance</ErrorText>
        ) : null}
        {formik.touched.assetInput && formik.errors.assetInput ? (
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
        onWheel={(event) => event.currentTarget.blur()}
        // onBlur={formik.handleBlur}
        value={formDataTokenomics.maxSupply}
        // value={formik.values.maxSupply}
      />
      {formDataTokenomics.maxSupply &&
      parseFloat(formDataTokenomics.maxSupply.toString() || '') <
        parseFloat(formDataTokenomics.shareInput.toString() || '0') ? (
        <ErrorText>Must be bigger than Project Token quantity</ErrorText>
      ) : null}
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
              {renderLogo(shareLogo)}

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
              disabled={!isEditable}
              min={1}
              max={99}
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
              {renderLogo(shareLogo)}
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
            disabled={!isEditable}
            min={1}
            max={99}
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
              disabled={!isEditable}
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              onChange={handleStartDateChange}
              label="Start Date *"
              value={dayjs(formDataTokenomics.startDate)}
            />
            {startDateError && <span style={{ color: 'red', marginTop: '6px' }}>{startDateError}</span>}
          </div>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: 'grid' }}>
            <DateTimePicker
              disabled={!isEditable}
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              onChange={handleEndDateChange}
              label="End Date *"
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

        <div style={{ display: 'block', visibility: 'hidden' }}>
          <TextInput
            type="number"
            placeholder="$0.00"
            id="maxPrice"
            label="Max. price"
            onWheel={(event) => event.currentTarget.blur()}
            name="maxPrice"
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            value={formDataTokenomics.maxPrice}
            disabled={!isEditable}
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

const InputeWrapper = styled.div`
  display: flex;
  gap: 20px;
`

const Block = styled.div`
  display: block;
  width: -webkit-fill-available;
`
