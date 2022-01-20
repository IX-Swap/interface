import React, { FC, useState, ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { Label } from '@rebass/forms'
import { TYPE } from 'theme'

import { Container } from 'components/AdminKycTable'
import { SearchInput } from 'components/SearchModal/styleds'
import { BrokerDealerCard } from './BrokerDealerCard'
import { ButtonIXSGradient, ButtonText } from 'components/Button'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'

import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { ReactComponent as Delete } from '../../assets/images/delete-basket.svg'
import { EditButton, StyledButtonGradientBorder, FormGrid, Logo, TokenCard } from './styleds'
import { mockBrokerDealers } from './mock'

export const AdminSecurityCatalog: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [currentIssuer, setCurrentIssuer] = useState<null | any>({
    id: 0,
    name: '',
    website: '',
    logo: '',
  })
  const [showMode, setShowMode] = useState<'catalog' | 'add_issuer' | 'edit_issuer'>('catalog')

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const handleCreateClick = () => {
    setCurrentIssuer({
      id: 0,
      name: '',
      website: '',
      logo: '',
      tokens: [],
    })
    setShowMode('add_issuer')
  }

  const handleEditClick = (editIssuer: any) => {
    setCurrentIssuer(editIssuer)
    setShowMode('edit_issuer')
  }

  return (
    <Container>
      {(showMode === 'add_issuer' || showMode === 'edit_issuer') && (
        <>
          <Box>
            <Flex marginBottom="26px">
              <ButtonText marginRight="10px" onClick={() => setShowMode('catalog')}>
                <ArrowLeft />
              </ButtonText>
              <TYPE.title5>{showMode === 'add_issuer' ? 'Add issuer' : 'Edit issuer'}</TYPE.title5>
            </Flex>
            <FormGrid>
              <Box>
                <Label marginBottom="11px" htmlFor="issuer-name">
                  <TYPE.title11 color="text2">Name</TYPE.title11>
                </Label>
                <InputPanel id={'item-name'}>
                  <ContainerRow>
                    <InputContainer>
                      <Input
                        id="issuer-name"
                        value={currentIssuer.name}
                        onChange={(e) => setCurrentIssuer({ ...currentIssuer, name: e.currentTarget.value })}
                      />
                    </InputContainer>
                  </ContainerRow>
                </InputPanel>
              </Box>
              <Box>
                <Label marginBottom="11px" htmlFor="issuer-website">
                  <TYPE.title11 color="text2">URL</TYPE.title11>
                </Label>
                <InputPanel id={'item-website'}>
                  <ContainerRow>
                    <InputContainer>
                      <Input
                        id="issuer-website"
                        value={currentIssuer.website}
                        onChange={(e) => setCurrentIssuer({ ...currentIssuer, website: e.currentTarget.value })}
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
          </Box>

          <Box>
            <EditButton marginBottom="20px">
              <TYPE.body3 color="white" fontWeight={600}>
                + Add token
              </TYPE.body3>
            </EditButton>
            {currentIssuer?.tokens?.length > 0 &&
              currentIssuer.tokens.map(({ symbol, website, isFeatured, isTradable }: any, index: number) => (
                <TokenCard style={{ marginBottom: 20 }} key={`token-${index}`}>
                  <TYPE.title6>{symbol}</TYPE.title6>
                  <TYPE.title6>0xC02aa....6Cc2</TYPE.title6>
                  <TYPE.title6>{website}</TYPE.title6>
                  <TYPE.title6>{isFeatured ? 'Featured' : 'Not Featured'}</TYPE.title6>
                  <TYPE.title6>Active</TYPE.title6>
                  <TYPE.title6>{isTradable ? 'Tradable' : 'Non Tradable'}</TYPE.title6>
                  <Box>
                    <EditButton>
                      <TYPE.body3 fontWeight={600}>Edit</TYPE.body3>
                    </EditButton>
                  </Box>
                  <Box>
                    <ButtonText>
                      <Delete />
                    </ButtonText>
                  </Box>
                </TokenCard>
              ))}
          </Box>

          <ButtonIXSGradient style={{ width: 226 }}>Save</ButtonIXSGradient>
        </>
      )}

      {showMode === 'catalog' && (
        <>
          <Flex marginBottom="33px">
            <SearchInput value={searchValue} placeholder={t`Search`} onChange={onSearchChange} />
            <StyledButtonGradientBorder marginLeft="33px" onClick={handleCreateClick}>
              + Add issuer
            </StyledButtonGradientBorder>
          </Flex>
          <Flex flexDirection="column">
            {mockBrokerDealers.map(({ info, tokens }, index) => (
              <BrokerDealerCard key={`bd-${index}`} info={info} tokens={tokens} handleEditClick={handleEditClick} />
            ))}
          </Flex>
        </>
      )}
    </Container>
  )
}
