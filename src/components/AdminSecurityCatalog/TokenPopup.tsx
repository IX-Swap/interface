import React, { FC, useEffect, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { getNames } from 'country-list'
import { isMobile } from 'react-device-detect'

import { RowBetween, RowEnd } from 'components/Row'
import { isValidAddress } from 'utils'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
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

interface Props {
  token: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer, setCurrentToken }: Props) => {
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
      { id: SUPPORTED_TGE_CHAINS.MAIN, name: 'Ethereum' },
      { id: SUPPORTED_TGE_CHAINS.KOVAN, name: 'Kovan' },
      { id: SUPPORTED_TGE_CHAINS.MATIC, name: 'Polygon' },
    ],
    []
  )

  const selectedChainOption = useMemo(() => {
    if (!token) return {}
    return chainsOptions.find(({ id }) => id === token.chainId)
  }, [token, chainsOptions])

  return (
    <>
      <AreYouSureModal isOpen={isConfirmOpen} onDecline={closeConfirm} onAccept={confirmClose} />
      <WideModal isLarge isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
        <WideModalWrapper data-testid="tokenPopup" style={{ width: 1700, position: 'relative' }}>
          {isLoading && (
            <LoaderContainer>
              <LoaderThin size={48} />
            </LoaderContainer>
          )}
          <ModalContentWrapper>
            <ModalPadding>
              <RowBetween marginBottom="27px">
                <TYPE.title4>
                  <Trans>{token?.id ? 'Edit token' : 'Add token'}</Trans>
                </TYPE.title4>

                <CloseIcon data-testid="cross" onClick={onClose} />
              </RowBetween>
              <Line style={{ marginBottom: '70px' }} />
              {token && (
                <>
                  <FormWrapper>
                    <FormGrid>
                      <Box>
                        <Label marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Logo:</Trans>
                          </TYPE.title11>
                        </Label>
                        <ButtonText>
                          {/* <Upload
                            accept={AcceptFiles.IMAGE}
                            file={currentIssuer?.file}
                            onDrop={(file) => handleDropImage(file)}
                          >
                            <Logo>
                              {currentIssuer?.filePath || currentIssuer?.logo?.public ? (
                                <img
                                  style={{ borderRadius: '6px' }}
                                  width="146px"
                                  height="146px"
                                  src={currentIssuer?.filePath || currentIssuer?.logo?.public}
                                />
                              ) : (
                                <div style={{ border: '1px solid #E6E6FF', borderRadius: '8px', padding: '35px' }}>
                                  <LogoImage />
                                </div>
                              )}
                            </Logo>
                          </Upload> */}
                          <Upload accept={AcceptFiles.IMAGE} file={token.file} onDrop={(file) => handleDropImage(file)}>
                            <Logo error={errors?.logo}>
                              {token.filePath || token.logo?.public ? (
                                <img
                                  style={{ borderRadius: '6px' }}
                                  width="146px"
                                  height="146px"
                                  src={token.filePath || token.logo?.public}
                                />
                              ) : (
                                <div
                                  style={{
                                    border: '1px solid #E6E6FF',
                                    marginTop: '76px',
                                    borderRadius: '8px',
                                    padding: '35px',
                                  }}
                                >
                                  <LogoImage />
                                </div>
                              )}
                            </Logo>
                          </Upload>
                        </ButtonText>
                        {errors?.logo && (
                          <TYPE.small textAlign="center" marginTop="4px" color={'red1'}>
                            {errors.logo}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-address">
                          <TYPE.title11 color="text2">
                            <Trans>Contract Address</Trans>
                          </TYPE.title11>
                        </Label>
                        <AddressInput
                          {...{
                            id: 'token-address',
                            value: token.address,
                            error: !Boolean(isValidAddress(token?.address || '')),
                            onChange: (e: any) => setToken({ ...token, address: e }),
                            placeholder: ' ',
                          }}
                        />
                        {errors?.address && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.address}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-ticker">
                          <TYPE.title11 color="text2">
                            <Trans>Ticker</Trans>
                          </TYPE.title11>
                        </Label>
                        <InputPanel id={'item-website'}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                id="token-ticker"
                                value={token.ticker}
                                onChange={(e: any) => setToken({ ...token, ticker: e.currentTarget.value })}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                        {errors?.ticker && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.ticker}
                          </TYPE.small>
                        )}
                      </Box>
                    </FormGrid>
                    <FormRow>
                      {/* <FormGrid> */}
                      <Box></Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-chain">
                          <TYPE.title11 color="text2">
                            <Trans>Origin Chain</Trans>
                          </TYPE.title11>
                        </Label>
                        <Dropdown
                          onSelect={(item) => {
                            setToken({ ...token, chainId: item.id })
                          }}
                          selectedItem={selectedChainOption}
                          items={chainsOptions}
                        />
                        {errors?.chainId && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.chainId}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-wrapped-input">
                          <TYPE.title11 color="text2">
                            <Trans>Wrapped token address</Trans>
                          </TYPE.title11>
                        </Label>
                        <AddressInput
                          {...{
                            id: 'token-wrapped-input',
                            disabled: token?.token ? true : false,
                            value: token.wrappedTokenAddress,
                            error: !Boolean(isValidAddress(token?.wrappedTokenAddress || '')),
                            onChange: handleWrappedTokenChange,
                            placeholder: ' ',
                          }}
                        />
                      </Box>
                      {/* </FormGrid> */}
                    </FormRow>
                    <FormRow>
                      <Box></Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-company-name">
                          <TYPE.title11 color="text2">
                            <Trans>Company name:</Trans>
                          </TYPE.title11>
                        </Label>
                        <InputPanel id={'token-company-name'}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                id="token-company-name"
                                value={token.companyName}
                                onChange={(e: any) => setToken({ ...token, companyName: e.currentTarget.value })}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                        {errors?.companyName && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.companyName}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-website">
                          <TYPE.title11 color="text2">
                            <Trans>URL:</Trans>
                          </TYPE.title11>
                        </Label>
                        <InputPanel id={'token-website'}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                id="token-website"
                                value={token.url}
                                onChange={(e: any) => setToken({ ...token, url: e.currentTarget.value })}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                        {errors?.url && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.url}
                          </TYPE.small>
                        )}
                      </Box>
                    </FormRow>

                    <NewFormRow>
                      <Box></Box>
                      <Box>
                        <Label marginTop="20px" marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Industry:</Trans>
                          </TYPE.title11>
                        </Label>
                        <Dropdown
                          onSelect={(item) => setToken({ ...token, industry: item.name })}
                          selectedItem={industries.find(({ name }) => name === token.industry)}
                          items={industries}
                        />
                        {errors?.industry && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.industry}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginTop="20px" marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Country:</Trans>
                          </TYPE.title11>
                        </Label>
                        <Dropdown
                          withScroll
                          onSelect={(item) => setToken({ ...token, country: item.name })}
                          selectedItem={countries.find(({ name }) => name === token.country)}
                          items={countries}
                        />
                        {errors?.country && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.country}
                          </TYPE.small>
                        )}
                      </Box>
                      <Box>
                        <Label marginTop="20px" marginBottom="11px" htmlFor="token-atlas-id">
                          <TYPE.title11 color="text2">
                            <Trans>AtlasOne ID:</Trans>
                          </TYPE.title11>
                        </Label>
                        <InputPanel id={'token-atlas-id'} style={{ marginBottom: 20 }}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                id="token-atlas-id"
                                value={token.atlasOneId}
                                onChange={(e: any) => setToken({ ...token, atlasOneId: e.currentTarget.value })}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                      </Box>
                    </NewFormRow>
                    <NewFormRowDescriptions>
                      <Box></Box>
                      <Box>
                        <Label marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Description:</Trans>
                          </TYPE.title11>
                        </Label>
                        <Textarea
                          value={token.description}
                          style={{ height: '290px', marginBottom: 0 }}
                          onChange={(e: any) => setToken({ ...token, description: e.currentTarget.value })}
                        />
                        {errors?.description && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.description}
                          </TYPE.small>
                        )}
                      </Box>
                    </NewFormRowDescriptions>
                    <FormRow>
                      <Box></Box>
                      <Box>
                        <TokenAvailableFor setToken={setToken} token={token} error={errors.kycTypeJson} />
                      </Box>
                      <Box
                        style={{ border: '1px solid #E6E6FF', marginTop: '32px' }}
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Box padding={'20px'} marginRight={isMobile ? '0px' : '16px'}>
                          <TYPE.title11 marginBottom="16px" color="text2">
                            <Trans>Active</Trans>
                          </TYPE.title11>
                          <TYPE.title11 marginBottom="26px" color="text2">
                            <Trans>Featured</Trans>
                          </TYPE.title11>
                          <TYPE.title11 marginBottom="26px" color="text2">
                            <Trans>Allow Deposit</Trans>
                          </TYPE.title11>
                          <TYPE.title11 marginBottom="26px" color="text2">
                            <Trans>Allow Withdrawal</Trans>
                          </TYPE.title11>
                        </Box>
                        <Box paddingRight={'30px'} paddingTop={'20px'} marginLeft={isMobile ? 'auto' : '0px'}>
                          <Radio
                            isActive={token.active}
                            onToggle={() => setToken({ ...token, active: !token.active })}
                          />
                          <Radio
                            isActive={token.featured}
                            onToggle={() => setToken({ ...token, featured: !token.featured })}
                          />
                          <Radio
                            isActive={token.allowDeposit}
                            onToggle={() => setToken({ ...token, allowDeposit: !token.allowDeposit })}
                          />
                          <Radio
                            isActive={token.allowWithdrawal}
                            onToggle={() => setToken({ ...token, allowWithdrawal: !token.allowWithdrawal })}
                          />
                        </Box>
                      </Box>
                    </FormRow>
                  </FormWrapper>
                  {/* <div style={{ display: 'flex' }}> */}

                  {/* </div> */}
                </>
              )}
            </ModalPadding>
          </ModalContentWrapper>
          <RowEnd>
            <ButtonOutlined
              onClick={onClose}
              backgroundColor={'none'}
              style={{ width: isMobile ? '100%' : 200, color: '#B8B8CC', marginRight: '10px' }}
              disabled={isLoading}
            >
              <Trans>Cancel</Trans>
            </ButtonOutlined>
            <PinnedContentButton
              onClick={handleCreateClick}
              style={{ width: isMobile ? '100%' : 200 }}
              disabled={isLoading}
            >
              <Trans>Save</Trans>
            </PinnedContentButton>
          </RowEnd>
        </WideModalWrapper>
      </WideModal>
    </>
  )
}
