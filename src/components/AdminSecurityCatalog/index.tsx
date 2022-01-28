import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { Label } from '@rebass/forms'
import { TYPE } from 'theme'

import { Container } from 'components/AdminKycTable'
import { SearchInput } from 'components/SearchModal/styleds'
import { BrokerDealerCard } from './BrokerDealerCard'
import { ButtonIXSGradient, ButtonText } from 'components/Button'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import { useTokenPopupToggle } from 'state/application/hooks'
import { TokenPopup } from './TokenPopup'
import { useAddIssuer, useEditIssuer, useFetchIssuers, useSecCatalogState, deleteToken } from 'state/secCatalog/hooks'
import Upload from 'components/Upload'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'

import { EditButton, StyledButtonGradientBorder, FormGrid, Logo, TokenCard } from './styleds'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { ReactComponent as Delete } from '../../assets/images/delete-basket.svg'

export const AdminSecurityCatalog: FC = () => {
  const addIssuer = useAddIssuer()
  const editIssuer = useEditIssuer()
  const getIssuers = useFetchIssuers()
  const { issuers } = useSecCatalogState()
  const toggle = useTokenPopupToggle()
  const [searchValue, setSearchValue] = useState('')
  const [currentIssuer, setCurrentIssuer] = useState<null | any>({
    name: '',
    url: '',
    logo: '',
    filePath: '',
    file: null,
  })
  const [currentToken, setCurrentToken] = useState<any | null>(null)
  const [showMode, setShowMode] = useState<'catalog' | 'add_issuer' | 'edit_issuer'>('catalog')

  useEffect(() => {
    if (showMode === 'catalog') {
      getIssuers()
    }
  }, [getIssuers, showMode])

  useEffect(() => {
    if (currentIssuer) {
      setCurrentIssuer(issuers?.find(({ id }: any) => id === currentIssuer.id))
    }
  }, [issuers])

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  const handleResetState = async () => {
    setCurrentIssuer({
      name: '',
      url: '',
      logo: '',
      filePath: '',
      file: null,
      tokens: [],
    })
    setShowMode('catalog')
  }

  const handleEditTokenClick = (token: any) => {
    setCurrentToken(token)
    toggle()
  }

  const handleSaveClick = async () => {
    const { name, url, file } = currentIssuer
    let data = null

    if (showMode === 'add_issuer') {
      data = await addIssuer({ name, url, description: 'desciption', logo: file })
    }
    if (showMode === 'edit_issuer') {
      data = await editIssuer(currentIssuer.id, { name, url, description: 'desciption' })
    }
    if (data === BROKER_DEALERS_STATUS.SUCCESS) {
      handleResetState()
    }
  }

  const handleDeleteToken = async (tokenId: number) => {
    await deleteToken(tokenId)
    getIssuers()
  }

  const handleCreateClick = () => {
    setCurrentIssuer({
      name: '',
      url: '',
      logo: '',
      filePath: '',
      file: null,
      tokens: [],
    })
    setShowMode('add_issuer')
  }

  const handleEditClick = (editIssuer: any) => {
    setCurrentIssuer(editIssuer)
    setShowMode('edit_issuer')
  }

  const handleDropImage = (acceptedFile: any) => {
    const file = acceptedFile
    if (currentIssuer.filePath) {
      URL.revokeObjectURL(currentIssuer.filePath)
    }
    const preview = URL.createObjectURL(file)
    setCurrentIssuer({ ...currentIssuer, file, filePath: preview })
  }

  return (
    <Container>
      {(showMode === 'add_issuer' || showMode === 'edit_issuer') && (
        <>
          <Box>
            <Flex marginBottom="26px">
              <ButtonText marginRight="10px" onClick={handleResetState}>
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
                <Label marginBottom="11px" htmlFor="issuer-url">
                  <TYPE.title11 color="text2">URL</TYPE.title11>
                </Label>
                <InputPanel id={'item-url'}>
                  <ContainerRow>
                    <InputContainer>
                      <Input
                        id="issuer-url"
                        value={currentIssuer.url}
                        onChange={(e) => setCurrentIssuer({ ...currentIssuer, url: e.currentTarget.value })}
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
                  <Upload file={currentIssuer.file} onDrop={(file) => handleDropImage(file)}>
                    {
                      <Logo>
                        {currentIssuer.filePath || currentIssuer.logo?.public ? (
                          <img
                            style={{ borderRadius: '36px' }}
                            width="100%"
                            height="100%"
                            src={currentIssuer.logo?.public || currentIssuer.filePath}
                          />
                        ) : (
                          <LogoImage />
                        )}
                      </Logo>
                    }
                  </Upload>
                </ButtonText>
              </Box>
            </FormGrid>
          </Box>

          <Box>
            {showMode === 'edit_issuer' && (
              <EditButton marginBottom="20px" onClick={() => handleEditTokenClick(null)}>
                <TYPE.body3 color="white" fontWeight={600}>
                  + Add token
                </TYPE.body3>
              </EditButton>
            )}
            {currentIssuer?.tokens?.length > 0 &&
              currentIssuer.tokens.map((token: any) => {
                const { id, ticker, logo, url, feautured, active, tradable } = token

                return (
                  <TokenCard style={{ marginBottom: 20 }} key={`token-${id}`}>
                    <Box>
                      <img width="30px" height="30px" src={logo?.public} />
                      <TYPE.body3 color="text1" marginLeft="12px">
                        {ticker}
                      </TYPE.body3>
                    </Box>
                    <TYPE.body3 color="text1">0xC02aa....6Cc2</TYPE.body3>
                    <TYPE.body3 color="text1">{url}</TYPE.body3>
                    <TYPE.body3 color="text1">{feautured ? 'Featured' : 'Not Featured'}</TYPE.body3>
                    <TYPE.body3 color="text1">{active ? 'Active' : 'Not Active'}</TYPE.body3>
                    <TYPE.body3 color="text1">{tradable ? 'Tradable' : 'Non Tradable'}</TYPE.body3>
                    <Box>
                      <EditButton onClick={() => handleEditTokenClick(token)}>
                        <TYPE.body3 fontWeight={600}>Edit</TYPE.body3>
                      </EditButton>
                    </Box>
                    <Box>
                      <ButtonText onClick={() => handleDeleteToken(id)}>
                        <Delete />
                      </ButtonText>
                    </Box>
                  </TokenCard>
                )
              })}
          </Box>

          <ButtonIXSGradient onClick={handleSaveClick} style={{ width: 226 }}>
            Save
          </ButtonIXSGradient>
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
            {issuers &&
              issuers?.length > 0 &&
              issuers.map((issuer, index) => (
                <BrokerDealerCard key={`bd-${index}`} issuer={issuer} handleEditClick={handleEditClick} />
              ))}
          </Flex>
        </>
      )}

      <TokenPopup token={currentToken} currentIssuer={currentIssuer} />
    </Container>
  )
}
