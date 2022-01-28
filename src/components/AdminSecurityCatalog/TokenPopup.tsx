import React, { FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'

import { RowBetween } from 'components/Row'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { Radio } from './Radio'
import { ButtonIXSGradient } from 'components/Button'
import { addToken, updateToken, useFetchIssuers } from 'state/secCatalog/hooks'

import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { WideModal, WideModalWrapper, FormWrapper, FormGrid, Logo, FormRow } from './styleds'

interface Props {
  token: any | null
  currentIssuer: any
}

export const TokenPopup: FC<Props> = ({ token: propToken, currentIssuer }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const toggle = useTokenPopupToggle()
  const getIssuers = useFetchIssuers()
  const [token, setToken] = useState<any>(null)

  useEffect(() => {
    if (propToken) setToken(propToken)
    else
      setToken({
        id: null,
        address: '',
        ticker: '',
        logo: '',
        companyName: '',
        url: '',
        industry: '',
        country: '',
        atlasOneId: '',
        description: '',
        active: null,
        feautured: null,
        tradable: null,
        chainId: 42,
      })
  }, [propToken])

  const onClose = () => {
    toggle()
  }

  const handleCreateClick = async () => {
    if (token.id) {
      await updateToken(token)
    } else {
      await addToken(currentIssuer.id, token)
    }

    getIssuers()
    toggle()
  }

  console.log(token)

  return (
    <WideModal isLarge isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <WideModalWrapper data-testid="tokenPopup" style={{ width: 1000 }}>
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween marginBottom="27px">
              <TYPE.description5>
                <Trans>Add token</Trans>
              </TYPE.description5>

              <CloseIcon data-testid="cross" onClick={onClose} />
            </RowBetween>

            {token && (
              <>
                <FormWrapper>
                  <FormGrid>
                    <Box>
                      <Label marginBottom="11px" htmlFor="issuer-name">
                        <TYPE.title11 color="text2">Contract Address</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-name'}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-name"
                              value={token.address}
                              onChange={(e) => setToken({ ...token, address: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>
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
                        <Logo>
                          <LogoImage />
                        </Logo>
                      </ButtonText>
                    </Box>
                  </FormGrid>
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
                      <InputPanel id={'item-website'} style={{ marginBottom: 20 }}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
                              value={token.industry}
                              onChange={(e) => setToken({ ...token, industry: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>

                      <Label marginBottom="11px" htmlFor="issuer-website">
                        <TYPE.title11 color="text2">Country:</TYPE.title11>
                      </Label>
                      <InputPanel id={'item-website'} style={{ marginBottom: 20 }}>
                        <ContainerRow>
                          <InputContainer>
                            <Input
                              id="issuer-website"
                              value={token.country}
                              onChange={(e) => setToken({ ...token, country: e.currentTarget.value })}
                            />
                          </InputContainer>
                        </ContainerRow>
                      </InputPanel>

                      <Label marginBottom="11px" htmlFor="issuer-website">
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
