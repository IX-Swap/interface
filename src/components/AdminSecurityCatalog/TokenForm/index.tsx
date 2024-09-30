import React, { FC, useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { useFormik } from 'formik'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import * as yup from 'yup'

import { RowEnd } from 'components/Row'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { ProgressBar } from './ProgressBar'
import GeneralInfo from './GeneralInfo'
import WrappedTokenDetails from './WrappedTokenDetails'
import CustodyDetails from './CustodyDetails'
import WithdrawalDetails from './WithdrawalDetails'
import Whitelisting from './Whitelisting'
import Availability from './Availability'
import apiService from 'services/apiService'
import { toast } from 'react-toastify'
import Loader from 'components/Loader'
import { countries, industries } from '../mock'
import { blockchainNetworks } from 'pages/KYC/mock'

const FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
const platforms = [
  { value: 'investax', label: 'XTokenLite' },
  { value: 'ixswap', label: 'XTokenProxy' },
] as any

export const kycType = {
  individualAccredited: false,
  individualAccreditedNot: false,
  corporateAccredited: false,
  corporateAccreditedNot: false,
}

const selectSchema = yup
  .object({
    value: yup.string().required('Network value is required'),
    label: yup.string().required('Network label is required'),
  })
  .nullable()

const validationSchema = yup.object().shape({
  logo: yup
    .mixed()
    .required('Logo is required')
    .test('fileSize', 'File too large. Maximum size is 2MB.', (value) => !value || (value && value.size <= FILE_SIZE))
    .test(
      'fileFormat',
      'Unsupported file format. Only JPG, PNG, and GIF are allowed.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  companyName: yup.string().required('Company name is required'),
  url: yup.string().url('Invalid URL').required('URL is required'),
  industry: selectSchema.required('Industry is required'),
  country: selectSchema.required('Country is required'),
  description: yup.string().required('Description is required'),
  withdrawFee: yup.number().required('Withdraw fee is required'),
  withdrawFeeAddress: yup.string().required('Withdraw fee address is required'),
  needsWhitelisting: yup.boolean().required(),
  whitelistPlatform: selectSchema.when('needsWhitelisting', {
    is: true, // When the switch is on (true)
    then: selectSchema.required('Whitelist Platform is required'), // Validate this field
    otherwise: selectSchema.nullable(), // If the switch is off, no validation
  }),
  whitelistContractAddress: yup.string().when('needsWhitelisting', {
    is: true, // When the switch is on (true)
    then: yup.string().required('Whitelist Contract Address is required'), // Validate this field
    otherwise: yup.string().nullable(), // If the switch is off, no validation
  }),
})

interface Props {
  token: any | null
  tokenData: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
  toggle: () => void
}

interface ISelect {
  value: string
  label: string
}
interface ITokenData {
  id?: string
  ticker: string
  logo: any
  companyName: string
  description: string
  url: string
  industry: ISelect | null
  country: ISelect | null
  brokerDealerId: string | number
  active: boolean
  featured: boolean
  allowDeposit: boolean
  allowWithdrawal: boolean
  chainId: number
  whitelistPlatform: ISelect | null
  needsWhitelisting: boolean
  originalSymbol: string
  originalName: string
  originalDecimals: number | string
  originalAddress: string
  originalNetwork: ISelect | null
  symbol: string
  decimals: number | string
  custodyVaultId: number | string
  custodyAssetId: number | string
  custodyAssetAddress: string
  withdrawFee: number | string
  withdrawFeeAddress: string
  kycType: any
  whitelistFunction: string
  platformId: number
}

const initialValues: ITokenData = {
  ticker: '',
  logo: null,
  companyName: '',
  description: '',
  url: '',
  industry: null,
  country: null,
  brokerDealerId: 1,
  active: false,
  featured: false,
  allowDeposit: false,
  allowWithdrawal: false,
  chainId: SUPPORTED_TGE_CHAINS.MATIC,
  whitelistPlatform: null,
  needsWhitelisting: false,
  originalSymbol: '',
  originalName: '',
  originalDecimals: '',
  originalAddress: '',
  originalNetwork: null,
  symbol: '',
  decimals: 18,
  custodyVaultId: '',
  custodyAssetId: '',
  custodyAssetAddress: '',
  withdrawFee: '',
  withdrawFeeAddress: '',
  kycType,
  whitelistFunction: 'ifWhitelisted',
  platformId: 4,
}

const TokenForm: FC<Props> = ({ token: editableToken, tokenData, currentIssuer, setCurrentToken, toggle }: Props) => {
  const onClose = () => {
    formik.resetForm()
    toggle()
    setCurrentToken(null)
  }

  const formik = useFormik<ITokenData>({
    initialValues,
    validationSchema: tokenData ? validationSchema : null,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      try {
        formik.setSubmitting(true)

        if (tokenData) {
          const formData = new FormData()
          if (!values.needsWhitelisting) {
            delete values.whitelistPlatform
            delete values.whitelistContractAddress
            delete values.whitelistFunction
            delete values.whitelistFunction
          } else {
            formData.append('checkWhitelistFunction', 'isWhitelisted')
          }
          formData.append('issuerId', currentIssuer.id)
          for (const key in values) {
            if (key === 'logo') {
              formData.append(key, values[key], values[key].name)
            } else if (['country', 'industry', 'originalNetwork', 'network', 'whitelistPlatform'].includes(key)) {
              formData.append(key, values[key].value)
            } else if (key === 'kycType') {
              formData.append(key, JSON.stringify(values[key]))
            } else {
              formData.append(key, values[key])
            }
          }

          const response = await apiService.post('/token', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          if (response.status === 201) {
            onClose()
            toast.success('Create token successfully')
          }
        } else {
          console.log('values', values)
          const payload = {} as any
          const compareEditPlayload = { ...editableToken, ...editableToken.token } as any

          for (const [key, value] of Object.entries(values)) {
            if (key === 'logo') {
              // @ts-ignore
              if (value.name != compareEditPlayload.logo.name) {
                payload[key] = value
              }
            } else if (key === 'brokerDealerId') {
              continue
            } else if (['country', 'industry', 'originalNetwork', 'network', 'whitelistPlatform'].includes(key)) {
              // @ts-ignore
              if (compareEditPlayload[key] != value?.value) {
                // @ts-ignore
                payload[key] = value?.value
              }
            } else if (key === 'kycType') {
              if (JSON.stringify(values[key]) != JSON.stringify(compareEditPlayload['kycTypeJson'])) {
                payload[key] = JSON.stringify(values[key])
              }
            } else {
              if (compareEditPlayload[key] && compareEditPlayload[key] == value) {
                continue
              } else {
                payload[key] = value
              }
            }
          }

          const formData = new FormData()
          if (!values.needsWhitelisting) {
            delete payload.whitelistPlatform
            delete payload.whitelistContractAddress
            delete payload.whitelistFunction
            delete payload.whitelistFunction
          } else {
            formData.append('checkWhitelistFunction', 'isWhitelisted')
          }
          formData.append('issuerId', currentIssuer.id)
          for (const key in payload) {
            if (key === 'logo') {
              formData.append(key, payload[key], payload[key].name)
            } else if (['country', 'industry', 'originalNetwork', 'network', 'whitelistPlatform'].includes(key)) {
              formData.append(key, payload[key].value)
            } else if (key === 'kycType') {
              formData.append(key, JSON.stringify(payload[key]))
            } else {
              formData.append(key, payload[key])
            }
          }

          const response = await apiService.put(`/catalog/token/${editableToken.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          if (response.status === 200) {
            onClose()
            toast.success('Edit token successfully')
          }
        }
      } catch (e: any) {
        console.error(e)
        toast.error(e.message)
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

  console.log('formik', formik)

  const fetchFileData = async (fileInfo: any, key: string) => {
    try {
      if (fileInfo && fileInfo.public) {
        const response = await fetch(fileInfo.public)
        if (response.ok) {
          const blob = await response.blob()
          formik.setFieldValue(key, new File([blob], fileInfo.name || key, { type: fileInfo.mimeType }))
        } else {
          throw new Error(`Failed to fetch ${key} data`)
        }
      }
    } catch (error) {
      console.log(`Error fetching ${key} data`)
    }
  }

  useEffect(() => {
    if (tokenData) {
      formik.setFieldValue('originalAddress', tokenData.tokenAddress)
      formik.setFieldValue('originalName', tokenData.name)
      formik.setFieldValue('originalSymbol', tokenData.symbol)
      formik.setFieldValue('originalDecimals', tokenData.decimals)
      formik.setFieldValue('originalNetwork', tokenData.network)
      formik.setFieldValue('network', tokenData.network)
      formik.setFieldValue('name', `Wrapped ${tokenData.name}`)
      formik.setFieldValue('ticker', `Wrapped ${tokenData.name}`)
      formik.setFieldValue('symbol', `w${tokenData.symbol}`)
      formik.setFieldValue('decimals', tokenData.decimals)
      formik.setFieldValue('chainId', tokenData?.network?.chainId)
    }
  }, [JSON.stringify(tokenData)])

  useEffect(() => {
    if (editableToken) {
      formik.setFieldValue('ticker', editableToken.ticker)
      formik.setFieldValue('companyName', editableToken.companyName)
      formik.setFieldValue('description', editableToken.description)
      formik.setFieldValue('url', editableToken.url)
      const country = countries.find((c) => c.value == editableToken.country)
      const industry = industries.find((i) => i.id == editableToken.industry)
      const industryMap = { value: industry?.id, label: industry?.name }
      formik.setFieldValue('country', country)
      formik.setFieldValue('industry', industryMap)
      formik.setFieldValue('kycType', editableToken?.kycTypeJson ?? kycType)
      formik.setFieldValue('active', editableToken?.active ?? false)
      formik.setFieldValue('featured', editableToken?.featured ?? false)
      formik.setFieldValue('allowDeposit', editableToken?.allowDeposit ?? false)
      formik.setFieldValue('allowWithdrawal', editableToken?.allowWithdrawal ?? false)
      fetchFileData(editableToken.logo, 'logo')
      if (editableToken.token) {
        formik.setFieldValue('decimals', editableToken?.token?.decimals)
        formik.setFieldValue('symbol', editableToken?.token?.symbol)
        formik.setFieldValue('name', editableToken?.token?.name)
        formik.setFieldValue('originalDecimals', editableToken?.token?.originalDecimals)
        formik.setFieldValue('originalSymbol', editableToken?.token?.originalSymbol)
        formik.setFieldValue('originalName', editableToken?.token?.originalName)
        formik.setFieldValue('originalAddress', editableToken?.token?.originalAddress)
        formik.setFieldValue(
          'originalNetwork',
          blockchainNetworks.find((n: any) => n.value === editableToken?.token?.originalNetwork)
        )
        formik.setFieldValue(
          'network',
          blockchainNetworks.find((n: any) => n.value === editableToken?.token?.originalNetwork)
        )
        formik.setFieldValue('custodyVaultId', editableToken?.token?.custodyVaultId)
        formik.setFieldValue('custodyAssetId', editableToken?.token?.custodyAssetId)
        formik.setFieldValue('custodyAssetAddress', editableToken?.token?.custodyAssetAddress)
        formik.setFieldValue('needsWhitelisting', editableToken?.token?.needsWhitelisting)
        formik.setFieldValue(
          'whitelistPlatform',
          platforms.find((p: any) => p.value === editableToken?.token?.whitelistPlatform)
        )
        formik.setFieldValue('whitelistContractAddress', editableToken?.token?.whitelistContractAddress)
        formik.setFieldValue('withdrawFee', editableToken?.token?.withdrawFee)
        formik.setFieldValue('withdrawFeeAddress', editableToken?.token?.withdrawFeeAddress)
        formik.setFieldValue('chainId', editableToken?.token?.chainId)
      }
    }
  }, [JSON.stringify(editableToken)])

  console.log('editableToken', editableToken)
  return (
    <Content>
      <Title>{tokenData ? 'Add Token' : 'Edit Token'}</Title>

      <FormWrap>
        <FormContainer>
          <FormCard id="GeneralInfo">
            <GeneralInfo formik={formik} />
          </FormCard>

          <FormCard id="WrappedTokenDetails">
            <WrappedTokenDetails formik={formik} />
          </FormCard>

          <FormCard id="CustodyDetails">
            <CustodyDetails formik={formik} />
          </FormCard>

          <FormCard id="Whitelisting">
            <Whitelisting formik={formik} platforms={platforms} />
          </FormCard>

          <FormCard id="WithdrawalDetails">
            <WithdrawalDetails formik={formik} />
          </FormCard>

          <FormCard id="Availability">
            <Availability formik={formik} />
          </FormCard>

          <RowEnd>
            <ButtonOutlined
              style={{ width: '200px', background: '#fff', fontSize: 14, marginRight: 16 }}
              onClick={onClose}
            >
              <Trans>Cancel</Trans>
            </ButtonOutlined>
            <PinnedContentButton
              type="submit"
              onClick={formik.submitForm}
              disabled={formik.isSubmitting}
              style={{ width: '200px', height: 48, fontSize: 14 }}
            >
              {formik.isSubmitting ? <Loader size="18px" /> : null} Save
            </PinnedContentButton>
          </RowEnd>
        </FormContainer>

        <StyledStickyBox style={{ marginBottom: isMobile ? '100px' : '1700px' }}>
          <ProgressBar
            isSubmitting={formik.isSubmitting}
            submitForm={formik.submitForm}
            topics={[
              {
                title: 'General Info',
                href: 'GeneralInfo',
              },

              {
                title: 'Wrapped Token Details',
                href: 'WrappedTokenDetails',
              },
              {
                title: 'Custody Details',
                href: 'CustodyDetails',
              },
              {
                title: 'Whitelisting',
                href: 'Whitelisting',
              },
              {
                title: 'Withdrawal Details',
                href: 'WithdrawalDetails',
              },
              {
                title: 'Availability',
                href: 'Availability',
              },
            ]}
          />
        </StyledStickyBox>
      </FormWrap>
    </Content>
  )
}

export default TokenForm

const Content = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

const FormWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`

const Title = styled.h1`
  color: #292933;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.96px;
  margin-top: 0;
`

const FormContainer = styled.div`
  gap: 20px;
  flex-grow: 1;
`

const StyledStickyBox = styled(StickyBox).attrs(() => ({ offsetTop: 100 }))`
  width: 332px;
  border-radius: 8px;
`

const FormCard = styled.div<{ filled?: boolean }>`
  background: #ffffff;
  padding: 32px;
  border-radius: 8px;
  margin-bottom: 24px;

  .title {
    color: #292933;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    letter-spacing: -0.6px;
    margin: 0;
  }
`
