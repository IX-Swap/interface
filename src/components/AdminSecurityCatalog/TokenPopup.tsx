import React, { FC, useEffect, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { getNames } from 'country-list'
import { isMobile } from 'react-device-detect'

import { RowBetween } from 'components/Row'
import { isValidAddress } from 'utils'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useAddPopup, useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { Radio } from './Radio'
import { ButtonIXSGradient } from 'components/Button'
import { addToken, checkWrappedAddress, updateToken, useFetchIssuers, validateToken } from 'state/secCatalog/hooks'
import { Dropdown } from './Dropdown'
import Upload from 'components/Upload'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import { NETWORK_LABELS } from 'constants/chains'
import { AreYouSureModal } from 'components/AreYouSureModal'
import { adminOffset as offset } from 'state/admin/constants'
import { SUPPORTED_TGE_CHAINS } from 'constants/addresses'

import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { WideModal, WideModalWrapper, FormWrapper, FormGrid, Logo, FormRow, LoaderContainer } from './styleds'
import { industries, initialTokenState } from './mock'
import { TokenAvailableFor } from './TokenAvailableFor'
import { getAtlasIdByTicker } from 'state/admin/hooks'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { LoaderThin } from 'components/Loader/LoaderThin'

interface Props {
  token: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer, setCurrentToken }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const [isLoading, setIsLoading] = useState(false)
  const toggle = useTokenPopupToggle()
  const [errors, setErrors] = useState<any>()
  const [isConfirmOpen, handleIsConfirmOpen] = useState(false)

  const getIssuers = useFetchIssuers()
  const addPopup = useAddPopup()
  const [token, setToken] = useState<any>(null)

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
  }, [propToken])

  useEffect(() => {
    if (token) {
      const validationErrors = validateToken(token)
      setErrors(validationErrors)
    }
  }, [token])

  const confirmClose = () => {
    closeConfirm()
    resetErrors()
    toggle()
    setCurrentToken(initialTokenState)
  }

  const onClose = () => {
    const needConfirm = Object.values(token).some((value) => Boolean(value))
    if (needConfirm) {
      openConfirm()
    } else {
      confirmClose()
    }
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

  const chainsOptions = [
    { id: SUPPORTED_TGE_CHAINS.MAIN, name: 'Mainnet' },
    { id: SUPPORTED_TGE_CHAINS.KOVAN, name: 'Kovan' },
    { id: SUPPORTED_TGE_CHAINS.MATIC, name: 'Matic' },
  ]

  const selectedChainOption = useMemo(() => {
    if (!token) return {}
    return chainsOptions.find(({ id }) => id === token.chainId)
  }, [token?.chainId])

  return (
    <>
      <AreYouSureModal isOpen={isConfirmOpen} onDecline={closeConfirm} onAccept={confirmClose} />
      <WideModal isLarge isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
        <WideModalWrapper data-testid="tokenPopup" style={{ width: 1000, position: 'relative' }}>
          {isLoading && (
            <LoaderContainer>
              <LoaderThin size={48} />
            </LoaderContainer>
          )}
          <ModalContentWrapper>
            <ModalPadding>
              <RowBetween marginBottom="27px">
                <TYPE.description5>
                  <Trans>{token?.id ? 'Edit token' : 'Add token'}</Trans>
                </TYPE.description5>

                <CloseIcon data-testid="cross" onClick={onClose} />
              </RowBetween>

              {token && (
                <>
                  <FormWrapper>
                    <FormGrid>
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
                            onChange: (e) => setToken({ ...token, address: e }),
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
                                onChange={(e) => setToken({ ...token, ticker: e.currentTarget.value })}
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
                      <Box>
                        <Label marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Logo:</Trans>
                          </TYPE.title11>
                        </Label>
                        <ButtonText>
                          <Upload file={token.file} onDrop={(file) => handleDropImage(file)}>
                            <Logo error={errors?.logo}>
                              {token.filePath || token.logo?.public ? (
                                <img
                                  style={{ borderRadius: '36px' }}
                                  width="100%"
                                  height="100%"
                                  src={token.filePath || token.logo?.public}
                                />
                              ) : (
                                <LogoImage />
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
                    </FormGrid>
                    <FormRow>
                      <Box>
                        <Label marginBottom="11px" htmlFor="token-chain">
                          <TYPE.title11 color="text2">
                            <Trans>Select Chain</Trans>
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
                    </FormRow>
                    <FormRow>
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
                                onChange={(e) => setToken({ ...token, companyName: e.currentTarget.value })}
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
                                onChange={(e) => setToken({ ...token, url: e.currentTarget.value })}
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

                    <FormRow>
                      <Box>
                        <Label marginBottom="11px">
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
                                onChange={(e) => setToken({ ...token, atlasOneId: e.currentTarget.value })}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                      </Box>

                      <Box>
                        <Label marginBottom="11px">
                          <TYPE.title11 color="text2">
                            <Trans>Description:</Trans>
                          </TYPE.title11>
                        </Label>
                        <Textarea
                          value={token.description}
                          style={{ height: '290px', background: '#372E5E', marginBottom: 0 }}
                          onChange={(e) => setToken({ ...token, description: e.currentTarget.value })}
                        />
                        {errors?.description && (
                          <TYPE.small marginTop="4px" color={'red1'}>
                            {errors.description}
                          </TYPE.small>
                        )}
                      </Box>
                    </FormRow>
                    <FormRow>
                      <Box>
                        <TokenAvailableFor setToken={setToken} token={token} error={errors.kycTypeJson} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box marginRight={isMobile ? '0px' : '16px'}>
                          <TYPE.title11 marginBottom="26px" color="text2">
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
                        <Box marginLeft={isMobile ? 'auto' : '0px'}>
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

                  <ButtonIXSGradient
                    onClick={handleCreateClick}
                    margin="35px auto 30px auto"
                    style={{ width: isMobile ? '100%' : 475 }}
                    disabled={isLoading}
                  >
                    <Trans>Save</Trans>
                  </ButtonIXSGradient>
                </>
              )}
            </ModalPadding>
          </ModalContentWrapper>
        </WideModalWrapper>
      </WideModal>
    </>
  )
}
