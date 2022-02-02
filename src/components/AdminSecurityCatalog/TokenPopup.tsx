import React, { FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'

import { RowBetween } from 'components/Row'
import { isAddress, isValidAddress, shortAddress } from 'utils'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useAddPopup, useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { Radio } from './Radio'
import { ButtonIXSGradient } from 'components/Button'
import { addToken, checkWrappedAddress, updateToken, useFetchIssuers } from 'state/secCatalog/hooks'
import { Dropdown } from './Dropdown'
import Upload from 'components/Upload'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'

import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { WideModal, WideModalWrapper, FormWrapper, FormGrid, Logo, FormRow } from './styleds'
import { initialTokenState } from './mock'

const chains = [
  { id: 1, name: 'Main' },
  { id: 42, name: 'Kovan' },
]

interface Props {
  token: any | null
  currentIssuer: any
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer }: Props) => {
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
    let data = null

    if (token.id) {
      data = await updateToken(token)
    } else {
      data = await addToken(currentIssuer.id, token)
    }

    if (data) {
      getIssuers()
      toggle()
    } else {
      addPopup({
        info: {
          success: false,
          summary: 'All fields should not be empty',
        },
      })
    }
  }

  const handleWrappedTokenChange = async (e: string) => {
    let newToken = { ...token, wrappedTokenAddress: e }

    if (isValidAddress(e)) {
      const data = await checkWrappedAddress(e)
      if (data) newToken = { ...newToken, token: data.id }
    }

    setToken(newToken)
  }

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
                        <TYPE.title11 color="text2">Contract Address</TYPE.title11>
                      </Label>
                      {/* <InputPanel id={'item-name'}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-name"
                              value={token.address}
                              onChange={(e) => setToken({ ...token, address: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel> */}
                      <AddressInput
                        {...{
                          id: 'token-address',
                          value: isAddress(token.address) ? shortAddress(token.address || '') : token.address,
                          error: !Boolean(isValidAddress(token?.address || '')),
                          onChange: (e) => setToken({ ...token, address: e }),
                          placeholder: ' ',
                        }}
                      />
                    </Box>
                    <Box>
                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Ticker</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-website'}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
                              value={token.ticker}
                              onChange={(e) => setToken({ ...token, ticker: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>
                    </Box>
                    <Box>
                      <Label marginBottom="11px">
                        <TYPE.title11 color="text2">Logo:</TYPE.title11>
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
                        <TYPE.title11 color="text2">Select Chain</TYPE.title11>
                      </Label>
                      <Dropdown
                        onSelect={(item) => {
                          setToken({ ...token, chainId: item.id })
                        }}
                        selectedItem={chains.find(({ id }) => id === token.chainId)}
                        items={chains}
                      />
                    </Box>
                    <Box>
                      <Label marginBottom="11px" htmlFor="token-wrapped-input">
                        <TYPE.title11 color="text2">Wrapped token address</TYPE.title11>
                      </Label>
                      <AddressInput
                        {...{
                          disabled: token?.id ? true : false,
                          id: 'token-wrapped-input',
                          value: isAddress(token.wrappedTokenAddress)
                            ? shortAddress(token.wrappedTokenAddress || '')
                            : token.wrappedTokenAddress,
                          error: !Boolean(isValidAddress(token?.wrappedTokenAddress || '')),
                          onChange: handleWrappedTokenChange,
                          placeholder: ' ',
                        }}
                      />
                    </Box>
                  </FormRow>
                  <FormRow>
                    <Box>
                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Company name:</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-website'}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
                              value={token.companyName}
                              onChange={(e) => setToken({ ...token, companyName: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>
                    </Box>
                    <Box>
                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">URL:</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-website'}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
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
                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Industry:</TYPE.title11>
                      </Label>
                      <Dropdown
                        onSelect={() => {
                          console.log('seelct')
                        }}
                        selectedItem={{ id: 1, name: 'IT' }}
                        items={[
                          { id: 1, name: 'IT' },
                          { id: 2, name: 'Oil' },
                        ]}
                      />
                      <Label marginTop="20px" marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Country:</TYPE.title11>
                      </Label>
                      <Dropdown
                        onSelect={() => {
                          console.log('seelct')
                        }}
                        selectedItem={{ id: 1, name: 'Kazakhstan' }}
                        items={[
                          { id: 1, name: 'Russia' },
                          { id: 2, name: 'USA' },
                        ]}
                      />

                      <Label marginTop="20px" marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">AtlasOne ID:</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-website'} style={{ marginBottom: 20 }}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
                              value={token.atlasOneId}
                              onChange={(e) => setToken({ ...token, atlasOneId: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>
                    </Box>

                    <Box>
                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Description:</TYPE.title11>
                      </Label>
                      <Textarea
                        value={token.description}
                        style={{ height: '290px', background: '#372E5E' }}
                        onChange={(e) => setToken({ ...token, description: e.currentTarget.value })}
                      />
                    </Box>
                  </FormRow>

                  <Box display="flex">
                    <Box marginRight="178px">
                      <TYPE.title11 marginBottom="26px" color="text2">
                        Active
                      </TYPE.title11>
                      <TYPE.title11 marginBottom="26px" color="text2">
                        Featured
                      </TYPE.title11>
                      <TYPE.title11 marginBottom="26px" color="text2">
                        Available for swap
                      </TYPE.title11>
                    </Box>

                    <Box>
                      <Radio isActive={token.active} onToggle={() => setToken({ ...token, active: !token.active })} />
                      <Radio
                        isActive={token.feautured}
                        onToggle={() => setToken({ ...token, feautured: !token.feautured })}
                      />
                      <Radio
                        isActive={token.tradable}
                        onToggle={() => setToken({ ...token, tradable: !token.tradable })}
                      />
                    </Box>
                  </Box>
                </FormWrapper>

                <ButtonIXSGradient onClick={handleCreateClick} margin="35px 0px 30px 0px" style={{ width: 475 }}>
                  Save
                </ButtonIXSGradient>
              </>
            )}
          </ModalPadding>
        </ModalContentWrapper>
      </WideModalWrapper>
    </WideModal>
  )
}
