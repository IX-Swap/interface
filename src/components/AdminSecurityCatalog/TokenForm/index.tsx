import React, { FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { useFormik } from 'formik'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import * as yup from 'yup'

import { RowEnd } from 'components/Row'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { getAtlasIdByTicker } from 'state/admin/hooks'
import { ProgressBar } from './ProgressBar'
import GeneralInfo from './GeneralInfo'
import WrappedTokenDetails from './WrappedTokenDetails'
import CustodyDetails from './CustodyDetails'
import WithdrawalDetails from './WithdrawalDetails'
import Whitelisting from './Whitelisting'
import Availability from './Availability'
import apiService from 'services/apiService'
import { toast } from 'react-toastify'

const FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

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
  network: ISelect | null
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
  symbol: string
  decimails: number | string
  custodyVaultId: number | string
  custodyAssetId: number | string
  custodyAssetAddress: string
  withdrawFee: number | string
  withdrawFeeAddress: string
  kycType: any
  checkWhitelistFunciton: string
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
  network: null,
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
  symbol: '',
  decimails: '',
  custodyVaultId: '',
  custodyAssetId: '',
  custodyAssetAddress: '',
  withdrawFee: '',
  withdrawFeeAddress: '',
  kycType,
  checkWhitelistFunciton: 'ifWhitelisted',
  platformId: 3
}

const TokenForm: FC<Props> = ({ token: propToken, tokenData, currentIssuer, setCurrentToken, toggle }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<any>(null)

  const formik = useFormik<ITokenData>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      debugger
      console.log('values', values)
      try {
        formik.setSubmitting(true)
        const formData = new FormData()
        if (!values.needsWhitelisting) {
          delete values.whitelistPlatform
          delete values.whitelistContractAddress
          delete values.checkWhitelistFunciton
          delete values.whitelistFunction
        }
        formData.append('issuerId', currentIssuer.id)
        for (const key in values) {
          if (key === 'logo') {
            formData.append(key, values[key], values[key].name)
          } else if (['country', 'industry', 'originNetwork'].includes(key)) {
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
        if (response.status === 200) {
          toast.success('Tenant create successfully')
        }
      } catch (e: any) {
        console.error(e)
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

  const getAtlasId = async () => {
    try {
      setIsLoading(true)
      const res = await getAtlasIdByTicker(token.atlasOneId)
      setToken({ ...token, atlasOneId: res.allIssuers[0]?.id || '' })
      setIsLoading(false)
    } catch (err) {
      setToken({ ...token, atlasOneId: '' })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token?.atlasOneId && /^[a-zA-Z]{3,}/gm.test(token.atlasOneId)) {
      getAtlasId()
    }
  }, [token?.atlasOneId])

  const onClose = () => {
    formik.resetForm()
    toggle()
  }

  useEffect(() => {
    if (tokenData) {
      formik.setFieldValue('originalAddress', tokenData.tokenAddress)
      formik.setFieldValue('originalName', tokenData.name)
      formik.setFieldValue('originalSymbol', tokenData.symbol)
      formik.setFieldValue('originalDecimals', tokenData.decimals)
      formik.setFieldValue('originNetwork', tokenData.network)
      formik.setFieldValue('name', `Wrapped ${tokenData.name}`)
      formik.setFieldValue('ticker', `Wrapped ${tokenData.name}`)
      formik.setFieldValue('symbol', `w${tokenData.symbol}`)
      formik.setFieldValue('decimails', tokenData.decimals)
      formik.setFieldValue('chainId', tokenData?.network?.chainId)
    }
  }, [JSON.stringify(tokenData)])

  return (
    <Content>
      <Title>Add Token</Title>

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
            <Whitelisting formik={formik} />
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
              disabled={isLoading}
            >
              <Trans>Cancel</Trans>
            </ButtonOutlined>
            <PinnedContentButton
              type="submit"
              onClick={formik.submitForm}
              disabled={formik.isSubmitting}
              style={{ width: '200px', height: 48, fontSize: 14 }}
            >
              <Trans>Save</Trans>
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
