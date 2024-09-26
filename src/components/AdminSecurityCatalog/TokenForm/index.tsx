import React, { FC, useEffect, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { getNames } from 'country-list'
import { isMobile } from 'react-device-detect'
import { useFormik } from 'formik'

import { RowBetween, RowEnd } from 'components/Row'
import { isValidAddress } from 'utils'
import { ButtonText, CloseIcon, MEDIA_WIDTHS, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useAddPopup, useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { ButtonIXSGradient, ButtonOutlined, PinnedContentButton } from 'components/Button'
import { addToken, checkWrappedAddress, updateToken, useFetchIssuers, validateToken } from 'state/secCatalog/hooks'
import Upload from 'components/Upload'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { adminOffset as offset } from 'state/admin/constants'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { getAtlasIdByTicker } from 'state/admin/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { AcceptFiles } from 'components/Upload/types'

import { Dropdown } from '../Dropdown'
import { Radio } from '../Radio'
import { ReactComponent as LogoImage } from 'assets/images/UploadLogo.svg'
import { FormWrapper, FormGrid, Logo, FormRow, LoaderContainer, NewFormRow, NewFormRowDescriptions } from '../styleds'
import { industries, initialTokenState } from '../mock'
import { TokenAvailableFor } from '../TokenAvailableFor'
import styled from 'styled-components'
import StickyBox from 'react-sticky-box'
import { ProgressBar } from './ProgressBar'
import GeneralInfo from './GeneralInfo'
import WrappedTokenDetails from './WrappedTokenDetails'
import CustodyDetails from './CustodyDetails'
import WithdrawalDetails from './WithdrawalDetails'
import Whitelisting from './Whitelisting'
import Availability from './Availability'

interface Props {
  token: any | null
  tokenData: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
  toggle: () => void
}

interface ITokenData {
  id?: string
  address: string
  ticker: string
  logo: any
  companyName: string
  description: string
  url: string
  industry: string
  country: string
  atlasOneId: string
  kycType: string
  kycTypeJson: any
  active: boolean
  featured: boolean
  allowDeposit: boolean
  allowWithdrawal: boolean
  chainId: number
  wrappedTokenAddress: string
  tokenId: string
}

const initialValues: ITokenData = {
  address: '',
  ticker: '',
  logo: null,
  companyName: '',
  description: '',
  url: '',
  industry: '',
  country: '',
  atlasOneId: '',
  kycType: '',
  kycTypeJson: {},
  active: false,
  featured: false,
  allowDeposit: false,
  allowWithdrawal: false,
  chainId: SUPPORTED_TGE_CHAINS.MATIC,
  wrappedTokenAddress: '',
  tokenId: '',
}

const TokenForm: FC<Props> = ({ token: propToken, tokenData, currentIssuer, setCurrentToken, toggle }: Props) => {
  const [hasErrorOnSubmit, setHasErrorOnSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>()
  const [isConfirmOpen, handleIsConfirmOpen] = useState(false)
  const [token, setToken] = useState<any>(null)

  const getIssuers = useFetchIssuers()
  const addPopup = useAddPopup()

  const formik = useFormik<ITokenData>({
    initialValues,
    validationSchema: null,
    onSubmit: async (values: any) => {
      try {
        formik.setSubmitting(true)
        console.log('values', values)
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

  const openConfirm = () => handleIsConfirmOpen(true)
  const closeConfirm = () => handleIsConfirmOpen(false)

  const resetErrors = () => {
    setErrors({
      address: null,
      ticker: null,
      logo: null,
      companyName: null,
      description: null,
      wrappedTokenAddress: null,
      kycType: null,
    })
  }

  useEffect(() => {
    if (propToken) setToken(propToken)
    else setToken(initialTokenState)
    resetErrors()
    setHasErrorOnSubmit(false)
  }, [propToken])

  useEffect(() => {
    if (token && hasErrorOnSubmit) {
      const validationErrors = validateToken(token)
      setErrors(validationErrors)
    }
  }, [token, hasErrorOnSubmit])

  const confirmClose = () => {
    closeConfirm()
    resetErrors()
    toggle()
    setCurrentToken(initialTokenState)
    setHasErrorOnSubmit(false)
  }

  const onClose = () => {
    const needConfirm = Object.values(token).some((value) => Boolean(value))
    if (needConfirm) {
      openConfirm()
    } else {
      confirmClose()
    }
    setHasErrorOnSubmit(false)
  }

  const handleDropImage = (acceptedFile: any) => {
    const file = acceptedFile
    if (token.filePath) {
      URL.revokeObjectURL(token.filePath)
    }
    const preview = URL.createObjectURL(file)
    setToken({ ...token, file, filePath: preview })
  }

  const handleCreateClick = async () => {
    const kycTypeJson = Object.keys(token.kycTypeJson).reduce(
      (acc, key) => (key.includes('Acc') ? { ...acc, [key]: token.kycTypeJson[key] } : acc),
      {}
    )
    setIsLoading(true)
    const validationErrors = validateToken(token)
    const hasError = Object.values(validationErrors).some((value) => Boolean(value) === true)
    const formattedData = { ...token, kycType: JSON.stringify(kycTypeJson) }

    if (hasError) {
      setErrors(validationErrors)
      setHasErrorOnSubmit(true)
    } else {
      let data = null
      if (token.id) {
        data = await updateToken(formattedData)
        if (data) {
          addPopup({
            info: {
              success: true,
              summary: 'Token was successfully updated.',
            },
          })
        }
      } else {
        data = await addToken(currentIssuer.id, formattedData)
        if (data) {
          addPopup({
            info: {
              success: true,
              summary: 'Token was successfully created.',
            },
          })
        }
      }

      if (data) {
        toggle()
        getIssuers({ search: '', offset, page: 1 })
        setCurrentToken(null)
        setToken(initialTokenState)
      } else {
        addPopup({
          info: {
            success: false,
            summary: 'Something went wrong',
          },
        })
      }
      resetErrors()
      setHasErrorOnSubmit(false)
    }
    setIsLoading(false)
  }

  const handleWrappedTokenChange = async (e: string) => {
    setIsLoading(true)
    let newToken = { ...token, wrappedTokenAddress: e }

    if (isValidAddress(e)) {
      const data = await checkWrappedAddress(e)
      if (data) newToken = { ...newToken, tokenId: data.id }
      else {
        addPopup({
          info: {
            success: false,
            summary: 'Something went wrong',
          },
        })
      }
    }

    setToken(newToken)
    setIsLoading(false)
  }

  const countries = useMemo(() => {
    return getNames()
      .map((name, index) => ({ id: ++index, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const chainsOptions = useMemo(
    () => [
      { id: SUPPORTED_TGE_CHAINS.MATIC, name: 'Polygon' },
      { id: SUPPORTED_TGE_CHAINS.BASE, name: 'Base' },
    ],
    []
  )

  const selectedChainOption = useMemo(() => {
    if (!token) return {}
    return chainsOptions.find(({ id }) => id === token.chainId)
  }, [token, chainsOptions])

  return (
    <Content>
      <AreYouSureModal isOpen={isConfirmOpen} onDecline={closeConfirm} onAccept={confirmClose} />

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
              onClick={handleCreateClick}
              style={{ width: '200px', height: 48, fontSize: 14 }}
              disabled={isLoading}
            >
              <Trans>Save</Trans>
            </PinnedContentButton>
          </RowEnd>
        </FormContainer>

        <StyledStickyBox style={{ marginBottom: isMobile ? '100px' : '1700px' }}>
          <ProgressBar
            // isSubmitting={formik.isSubmitting}
            // submitForm={formik.submitForm}
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

  & > * + * {
    margin-top: 20px;
  }
`

const StyledStickyBox = styled(StickyBox).attrs(() => ({ offsetTop: 100 }))`
  width: 332px;
  border-radius: 8px;
`

const FormCard = styled.div<{ filled?: boolean }>`
  background: #ffffff;
  padding: 32px;
  border-radius: 8px;

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
