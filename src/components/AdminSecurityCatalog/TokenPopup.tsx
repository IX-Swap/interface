import React, { FC, useEffect, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { getNames } from 'country-list'
import { isMobile } from 'react-device-detect'
import styled, { useTheme } from 'styled-components'

import { RowBetween, RowEnd } from 'components/Row'
import { isValidAddress } from 'utils'
import { ButtonText, CloseIcon, ModalBlurWrapper, ModalContentWrapper, ModalPadding, theme, TYPE } from 'theme'
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

import { Dropdown } from './Dropdown'
import { Radio } from './Radio'
import { ReactComponent as LogoImage } from '../../assets/images/UploadLogo.svg'
import {
  WideModal,
  WideModalWrapper,
  FormWrapper,
  FormGrid,
  Logo,
  FormRow,
  LoaderContainer,
  NewFormRow,
  NewFormRowDescriptions,
} from './styleds'
import { industries, initialTokenState } from './mock'
import { TokenAvailableFor } from './TokenAvailableFor'
import { Line } from 'components/Line'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import NetworkSelect from './NetworkSelect'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { blockchainNetworks } from 'pages/KYC/mock'

interface Props {
  token: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer, setCurrentToken }: Props) => {
  const theme = useTheme()
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const [hasErrorOnSubmit, setHasErrorOnSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>()
  const [isConfirmOpen, handleIsConfirmOpen] = useState(false)
  const [token, setToken] = useState<any>(null)

  const toggle = useTokenPopupToggle()
  const getIssuers = useFetchIssuers()
  const addPopup = useAddPopup()

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
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={toggle}>
        <ModalBody>
          <CloseButton>
            <CloseIcon onClick={toggle} />
          </CloseButton>

          <Title>Add Token</Title>

          <FormWrapper>
            <Label htmlFor="network">Network</Label>

            <NetworkSelect
              id="network"
              name="network"
              placeholder="Choose Network"
              isClearable={false}
              isSearchable={false}
              onSelect={() => {}}
              value={null}
              options={blockchainNetworks}
            />
          </FormWrapper>

          <FormWrapper>
            <Label htmlFor="token-address">Contract Address</Label>
            <AddressInput
              {...{
                id: 'token-address',
                value: '',
                error: !Boolean(isValidAddress(token?.address || '')),
                onChange: (e: any) => setToken({ ...token, address: e }),
                placeholder: 'Contract Address',
                fontSize: 14,
              }}
            />
          </FormWrapper>

          <Flex justifyContent="space-between" style={{ gap: 12, marginTop: 32 }}>
            <OutlineButton style={{ border: '1px solid #6666FF33', width: '100%' }} onClick={onClose}>
              Cancel
            </OutlineButton>

            <FilledButton style={{ width: '100%' }}>Continue</FilledButton>
          </Flex>
        </ModalBody>
      </RedesignedWideModal>
    </>
  )
}

const ModalBody = styled.div`
  min-width: 420px;
  padding: 32px;
  position: relative;
`

const CloseButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`

const Title = styled.h1`
  color: #292933;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
  text-align: left;
`

const Label = styled.label`
  color: #556;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.28px;
  padding-bottom: 12px;
  display: block;

  .desc {
    color: #8f8fb2;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.36px;
  }
`
