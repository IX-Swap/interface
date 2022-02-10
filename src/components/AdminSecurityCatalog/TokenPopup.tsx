import React, { FC, useEffect, useMemo, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'
import { getNames } from 'country-list'

import { RowBetween } from 'components/Row'
import { isValidAddress } from 'utils'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useAddPopup, useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { Radio } from './Radio'
import { ButtonIXSGradient } from 'components/Button'
import { addToken, checkWrappedAddress, updateToken, useFetchIssuers, validate } from 'state/secCatalog/hooks'
import { Dropdown } from './Dropdown'
import Upload from 'components/Upload'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'

import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { WideModal, WideModalWrapper, FormWrapper, FormGrid, Logo, FormRow } from './styleds'
import { industries, initialTokenState } from './mock'
import { CREATE_TOKEN_CHAINS } from 'constants/addresses'
import { isMobile } from 'react-device-detect'

interface Props {
  token: any | null
  currentIssuer: any
  setCurrentToken: (value: any | null) => void
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer, setCurrentToken }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const toggle = useTokenPopupToggle()
  const getIssuers = useFetchIssuers()
  const addPopup = useAddPopup()
  const [token, setToken] = useState<any>(null)

  useEffect(() => {
    if (propToken) setToken(propToken)
    else setToken(initialTokenState)
  }, [propToken])

  const onClose = () => {
    toggle()
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
    if (!validate(token)) {
      addPopup({
        info: {
          success: false,
          summary: 'All fields are required',
        },
      })
    } else {
      let data = null
      if (token.id) {
        data = await updateToken(token)
        if (data) {
          addPopup({
            info: {
              success: true,
              summary: 'Token was successfully updated.',
            },
          })
        }
      } else {
        data = await addToken(currentIssuer.id, token)
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
        getIssuers()
        toggle()
        setCurrentToken(null)
      } else {
        addPopup({
          info: {
            success: false,
            summary: 'Something went wrong',
          },
        })
      }
    }
  }

  const handleWrappedTokenChange = async (e: string) => {
    let newToken = { ...token, wrappedTokenAddress: e }

    if (isValidAddress(e)) {
      const data = await checkWrappedAddress(e)
      if (data) newToken = { ...newToken, tokenId: data.id }
    }

    setToken(newToken)
  }

  const countries = useMemo(() => {
    return getNames()
      .map((name, index) => ({ id: ++index, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  console.log(countries)

  return (
    <WideModal isLarge isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <WideModalWrapper data-testid="tokenPopup" style={{ width: 1000 }}>
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
                    </Box>
                    <Box>
                      <Label marginBottom="11px">
                        <TYPE.title11 color="text2">
                          <Trans>Logo:</Trans>
                        </TYPE.title11>
                      </Label>
                      <ButtonText>
                        <Upload file={token.file} onDrop={(file) => handleDropImage(file)}>
                          <Logo>
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
                        selectedItem={CREATE_TOKEN_CHAINS.find(({ id }) => id === token.chainId)}
                        items={CREATE_TOKEN_CHAINS}
                      />
                    </Box>
                    <Box>
                      <Label marginBottom="11px" htmlFor="token-wrapped-input">
                        <TYPE.title11 color="text2">
                          <Trans>Wrapped token address</Trans>
                        </TYPE.title11>
                      </Label>
                      <AddressInput
                        {...{
                          disabled: token?.id ? true : false,
                          id: 'token-wrapped-input',
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
                        style={{ height: '290px', background: '#372E5E' }}
                        onChange={(e) => setToken({ ...token, description: e.currentTarget.value })}
                      />
                    </Box>
                  </FormRow>

                  <Box display="flex">
                    <Box marginRight={isMobile ? '0px' : '178px'}>
                      <TYPE.title11 marginBottom="26px" color="text2">
                        <Trans>Active</Trans>
                      </TYPE.title11>
                      <TYPE.title11 marginBottom="26px" color="text2">
                        <Trans>Featured</Trans>
                      </TYPE.title11>
                    </Box>

                    <Box marginLeft={isMobile ? 'auto' : '0px'}>
                      <Radio isActive={token.active} onToggle={() => setToken({ ...token, active: !token.active })} />
                      <Radio
                        isActive={token.featured}
                        onToggle={() => setToken({ ...token, featured: !token.featured })}
                      />
                    </Box>
                  </Box>
                </FormWrapper>

                <ButtonIXSGradient
                  onClick={handleCreateClick}
                  margin="35px 0px 30px 0px"
                  style={{ width: isMobile ? '100%' : 475 }}
                >
                  <Trans>Save</Trans>
                </ButtonIXSGradient>
              </>
            )}
          </ModalPadding>
        </ModalContentWrapper>
      </WideModalWrapper>
    </WideModal>
  )
}
