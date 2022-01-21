import React, { FC, useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import { Box } from 'rebass'
import { Label } from '@rebass/forms'

import { RowBetween } from 'components/Row'
import { ButtonText, CloseIcon, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { useModalOpen, useTokenPopupToggle } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { WideModal, WideModalWrapper, FormWrapper, FormGrid, Logo, FormRow } from './styleds'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { Radio } from './Radio'
import { ButtonIXSGradient } from 'components/Button'

interface FakeTokenProps {
  address: string
  symbol: string
  logo: string
  companyName: string
  url: string
  industry: string
  country: string
  atlasID: string
  description: string
  isActive: boolean
  isFeatured: boolean
  isSwapable: boolean
}

interface Props {
  token: FakeTokenProps | null
}

export const TokenPopup: FC<Props> = ({ token: propToken }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TOKEN_POPUP)
  const toggle = useTokenPopupToggle()
  const [token, setToken] = useState<FakeTokenProps>()

  useEffect(() => {
    setToken(
      propToken || {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        symbol: 'TSLA',
        logo: '',
        companyName: 'Tesla',
        url: 'https://tesla.com/token',
        industry: 'Automotive',
        country: 'USA',
        atlasID: '235',
        description:
          'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. ',
        isActive: true,
        isFeatured: true,
        isSwapable: false,
      }
    )
  }, [propToken])

  const onClose = () => {
    toggle()
  }

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
                              value={token.symbol}
                              onChange={(e) => setToken({ ...token, symbol: e.currentTarget.value })}
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
                              value={token.atlasID}
                              onChange={(e) => setToken({ ...token, atlasID: e.currentTarget.value })}
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
                      <Radio
                        isActive={token.isActive}
                        onToggle={() => setToken({ ...token, isActive: !token.isActive })}
                      />
                      <Radio
                        isActive={token.isFeatured}
                        onToggle={() => setToken({ ...token, isFeatured: !token.isFeatured })}
                      />
                      <Radio
                        isActive={token.isSwapable}
                        onToggle={() => setToken({ ...token, isSwapable: !token.isSwapable })}
                      />
                    </Box>
                  </Box>
                </FormWrapper>

                <ButtonIXSGradient margin="35px 0px 30px 0px" style={{ width: 475 }}>
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
