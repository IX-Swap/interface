import React, { FC, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { useFormik } from 'formik'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'

import { RowEnd } from 'components/Row'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { ProgressBar } from './ProgressBar'
import GeneralInfo from './GeneralInfo'
import WrappedTokenDetails from './WrappedTokenDetails'
import CustodyDetails from './CustodyDetails'
import WithdrawalDetails from './WithdrawalDetails'
import Whitelisting from './Whitelisting'
import Availability from './Availability'
import apiService from 'services/apiService'
import { Slide, toast } from 'react-toastify'
import Loader from 'components/Loader'
import { countries, industries } from '../mock'
import { blockchainNetworks } from 'pages/KYC/mock'
import { ITokenData } from './types'
import { compareChanges, prepareFormData, initialValues, platforms, kycType } from './helper'
import { validationSchema } from './schema'
import SuccessContent from 'components/ToastContent/Success'
import ErrorContent from 'components/ToastContent/Error'

interface Props {
  token: any | null
  tokenData: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
  toggle: () => void
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
          const formData = prepareFormData(values, currentIssuer?.id)

          const response = await apiService.post('/token', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (response.status === 201) {
            onClose()
            toast.success(<SuccessContent message="A new token has been successfully added." />, {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              position: 'bottom-right',
              autoClose: 3000,
            })
          }
        } else {
          const compareEditPlayload = { ...editableToken, ...editableToken.token } as any
          const payload = compareChanges(values, compareEditPlayload)
          const formData = prepareFormData(payload, currentIssuer?.id)

          const response = await apiService.put(`/token/${editableToken?.token?.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })

          if (response.status === 200) {
            onClose()
            toast.success(<SuccessContent message="The token has been successfully edited." />, {
              icon: false,
              transition: Slide,
              hideProgressBar: true,
              position: 'bottom-right',
              autoClose: 3000,
            })
          }
        }
      } catch (e: any) {
        console.error(e)
        toast.error(<ErrorContent message={e.message} />, {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          position: 'bottom-right',
          autoClose: 3000,
        })
      } finally {
        formik.setSubmitting(false)
      }
    },
  })

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
      formik.setFieldValue('ticker', `w${tokenData.symbol}`)
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
      const fieldKycType =
        editableToken.kycTypeJson && typeof editableToken.kycTypeJson === 'string'
          ? JSON.parse(editableToken.kycTypeJson)
          : editableToken.kycTypeJson
      formik.setFieldValue('kycType', fieldKycType ?? kycType)
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

  useEffect(() => {
    const handleBackButton = () => {
      toggle()
      history.go(1)
    }

    window.onpopstate = handleBackButton

    return () => {
      window.onpopstate = null
    }
  }, [history])

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
