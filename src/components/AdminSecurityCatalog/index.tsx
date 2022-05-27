import React, { FC, useState, useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { Label } from '@rebass/forms'
import { isMobile } from 'react-device-detect'

import { ExternalLink, TYPE } from 'theme'
import { Container } from 'components/AdminAccreditationTable'
import { ButtonIXSGradient, ButtonText } from 'components/Button'
import { Search } from 'components/AdminAccreditationTable/Search'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import { useAddPopup, useTokenPopupToggle, useDeleteTokenPopupToggle } from 'state/application/hooks'
import {
  getIssuer,
  useAddIssuer,
  useEditIssuer,
  useFetchIssuers,
  useSecCatalogState,
  validateIssuer,
} from 'state/secCatalog/hooks'
import Upload from 'components/Upload'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { BROKER_DEALERS_STATUS } from 'state/brokerDealer/hooks'
import { adminOffset as offset } from 'state/admin/constants'
import { useOnlyAdminAccess } from 'state/admin/hooks'
import { Pagination } from 'components/Pagination'
import { NoData } from 'components/Whitelist/styleds'
import { AcceptFiles } from 'components/Upload/types'

import { TokenPopup } from './TokenPopup'
import { DeleteTokenConfirmationPopup } from './DeleteConfirmation'
import { Loader } from '../AdminTransactionsTable'
import { BrokerDealerCard } from './BrokerDealerCard'
import { EditButton, StyledButtonGradientBorder, FormGrid, Logo, TokenCard } from './styleds'
import { initialIssuerState } from './mock'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { ReactComponent as LogoImage } from '../../assets/images/wallpaper.svg'
import { ReactComponent as Delete } from '../../assets/images/delete-basket.svg'

interface Tab {
  value: 'catalog' | 'add_issuer' | 'edit_issuer'
}

export const AdminSecurityCatalog: FC = () => {
  useOnlyAdminAccess()
  const addIssuer = useAddIssuer()
  const editIssuer = useEditIssuer()
  const getIssuers = useFetchIssuers()
  const addPopup = useAddPopup()
  const [issuerErrors, setIssuerErrors] = useState<any>({
    name: null,
    logo: null,
    url: null,
  })
  const { issuers, loadingRequest } = useSecCatalogState()
  const toggle = useTokenPopupToggle()
  const toggleDeleteTokenPopup = useDeleteTokenPopupToggle()
  const [searchValue, setSearchValue] = useState('')
  const [currentIssuer, setCurrentIssuer] = useState<null | any>(initialIssuerState)
  const [currentToken, setCurrentToken] = useState<any | null>(null)
  const [deleteTokenId, setDeleteTokenId] = useState(0)
  const [showMode, setShowMode] = useState<Tab['value']>('catalog')

  useEffect(() => {
    if (showMode === 'catalog') {
      getIssuers({ search: '', offset, page: 1 })
    }
  }, [getIssuers, showMode])

  const fetchIssuer = async () => {
    const data = await getIssuer(currentIssuer.id)
    if (data) setCurrentIssuer({ ...currentIssuer, ...data })
  }

  useEffect(() => {
    if (currentIssuer?.id) {
      fetchIssuer()
    }
  }, [issuers, currentIssuer?.id])

  useEffect(() => {
    getIssuers({ page: 1, offset, ...(searchValue && { search: searchValue }) })
  }, [getIssuers, searchValue])

  const onPageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getIssuers({ search: searchValue, page, offset })
  }

  const handleResetState = async () => {
    setCurrentIssuer(initialIssuerState)
    setShowMode('catalog')
    setIssuerErrors({
      name: null,
      logo: null,
      url: null,
    })
  }

  const handleEditTokenClick = (token: any) => {
    const editToken = token?.token ? { ...token, wrappedTokenAddress: token.token.address } : token
    setCurrentToken(editToken)
    toggle()
  }

  const handleSaveClick = async () => {
    const { name, url, file } = currentIssuer
    const validationErrors = validateIssuer(currentIssuer)

    if (validationErrors.url || validationErrors.logo || validationErrors.name) {
      setIssuerErrors(validationErrors)
    } else {
      if (showMode === 'add_issuer') {
        const data = await addIssuer({ name, url, description: 'desciption', logo: file })
        if (data === BROKER_DEALERS_STATUS.SUCCESS) {
          addPopup({
            info: {
              success: true,
              summary: 'Issuer was successfully created.',
            },
          })
          handleResetState()
        }
      }
      if (showMode === 'edit_issuer') {
        const data = await editIssuer(currentIssuer.id, { name, url, description: 'desciption', logo: file })
        if (data === BROKER_DEALERS_STATUS.SUCCESS) {
          addPopup({
            info: {
              success: true,
              summary: 'Issuer was successfully edited.',
            },
          })
          handleResetState()
        }
      }
    }
  }

  const handleDeleteToken = async (tokenId: number) => {
    toggleDeleteTokenPopup()
    setDeleteTokenId(tokenId)
  }

  const handleCreateClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentIssuer(initialIssuerState)
    setShowMode('add_issuer')
  }

  const handleEditClick = (editIssuer: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

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
    <>
      {loadingRequest && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      <Container>
        {['add_issuer', 'edit_issuer'].includes(showMode) && (
          <>
            <Box>
              <ButtonText
                style={{ textDecoration: 'none' }}
                display="flex"
                marginBottom="26px"
                onClick={handleResetState}
              >
                <ArrowLeft />
                <TYPE.title5 marginLeft="10px">{showMode === 'add_issuer' ? 'Add issuer' : 'Edit issuer'}</TYPE.title5>
              </ButtonText>

              <FormGrid>
                <Box>
                  <Label marginBottom="11px" htmlFor="issuer-name">
                    <TYPE.title11 color="text2">
                      <Trans>Name</Trans>
                    </TYPE.title11>
                  </Label>
                  <InputPanel id={'item-name'}>
                    <ContainerRow>
                      <InputContainer>
                        <Input
                          id="issuer-name"
                          value={currentIssuer?.name}
                          onChange={(e) => setCurrentIssuer({ ...currentIssuer, name: e.currentTarget.value })}
                        />
                      </InputContainer>
                    </ContainerRow>
                  </InputPanel>
                  {issuerErrors?.name && (
                    <TYPE.small marginTop="4px" color={'red1'}>
                      {issuerErrors.name}
                    </TYPE.small>
                  )}
                </Box>
                <Box>
                  <Label marginBottom="11px" htmlFor="issuer-url">
                    <TYPE.title11 color="text2">
                      <Trans>URL</Trans>
                    </TYPE.title11>
                  </Label>
                  <InputPanel id={'item-url'}>
                    <ContainerRow>
                      <InputContainer>
                        <Input
                          id="issuer-url"
                          value={currentIssuer?.url}
                          onChange={(e) => setCurrentIssuer({ ...currentIssuer, url: e.currentTarget.value })}
                        />
                      </InputContainer>
                    </ContainerRow>
                  </InputPanel>
                  {issuerErrors?.url && (
                    <TYPE.small marginTop="4px" color={'red1'}>
                      {issuerErrors.url}
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
                    <Upload
                      accept={AcceptFiles.IMAGE}
                      file={currentIssuer?.file}
                      onDrop={(file) => handleDropImage(file)}
                    >
                      <Logo>
                        {currentIssuer?.filePath || currentIssuer?.logo?.public ? (
                          <img
                            style={{ borderRadius: '36px' }}
                            width="100%"
                            height="100%"
                            src={currentIssuer?.filePath || currentIssuer?.logo?.public}
                          />
                        ) : (
                          <LogoImage />
                        )}
                      </Logo>
                    </Upload>
                  </ButtonText>
                  {issuerErrors?.logo && (
                    <TYPE.small textAlign="center" marginTop="4px" color={'red1'}>
                      {issuerErrors.logo}
                    </TYPE.small>
                  )}
                </Box>
              </FormGrid>
            </Box>

            <Box>
              {showMode === 'edit_issuer' && (
                <EditButton marginBottom="20px" onClick={() => handleEditTokenClick(null)}>
                  <TYPE.body3 color="white" fontWeight={600}>
                    <Trans>+ Add token</Trans>
                  </TYPE.body3>
                </EditButton>
              )}
              <Box overflow={isMobile ? 'scroll' : 'visible'}>
                {currentIssuer?.tokens?.length > 0 &&
                  currentIssuer.tokens.map((token: any) => {
                    const { id, address, ticker, logo, url, featured, active, token: wrappedToken } = token

                    return (
                      <TokenCard style={{ marginBottom: 20 }} key={`token-${id}`}>
                        <Box>
                          <img style={{ borderRadius: '24px' }} width="30px" height="30px" src={logo?.public} />
                          <TYPE.body3 color="text1" marginLeft="12px">
                            {ticker}
                          </TYPE.body3>
                        </Box>
                        <TYPE.body3 color="text1">{address}</TYPE.body3>
                        <TYPE.body3 color="text1">
                          <ExternalLink
                            style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            href={url}
                          >
                            {url}
                          </ExternalLink>
                        </TYPE.body3>
                        <TYPE.body3 color="text1">{featured ? 'Featured' : 'Not Featured'}</TYPE.body3>
                        <TYPE.body3 color="text1">{active ? 'Active' : 'Not Active'}</TYPE.body3>
                        <TYPE.body3 color="text1">{wrappedToken ? 'Tradable' : 'Non Tradable'}</TYPE.body3>
                        <Box>
                          <EditButton onClick={() => handleEditTokenClick(token)}>
                            <TYPE.body3 fontWeight={600}>
                              <Trans>Edit</Trans>
                            </TYPE.body3>
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
            </Box>

            <ButtonIXSGradient onClick={handleSaveClick} style={{ width: 226 }}>
              <Trans>Save</Trans>
            </ButtonIXSGradient>
          </>
        )}

        {showMode === 'catalog' && (
          <>
            <Flex flexDirection={isMobile ? 'column' : 'row'} marginBottom="33px">
              <Search style={{ marginBottom: 0 }} setSearchValue={setSearchValue} placeholder={t`Search`} />
              <StyledButtonGradientBorder
                marginTop={isMobile ? '16px' : '0px'}
                marginLeft={isMobile ? '0px' : '33px'}
                onClick={handleCreateClick}
              >
                <Trans>+ Add issuer</Trans>
              </StyledButtonGradientBorder>
            </Flex>
            <Flex flexDirection="column">
              {issuers?.items.length > 0 ? (
                <>
                  {issuers.items.map((issuer: any) => (
                    <BrokerDealerCard key={`bd-${issuer.id}`} issuer={issuer} handleEditClick={handleEditClick} />
                  ))}
                  <Pagination page={issuers.page} totalPages={issuers.totalPages} onPageChange={onPageChange} />
                </>
              ) : (
                <NoData>
                  <Trans>No results</Trans>
                </NoData>
              )}
            </Flex>
          </>
        )}

        <TokenPopup setCurrentToken={setCurrentToken} token={currentToken} currentIssuer={currentIssuer} />
        <DeleteTokenConfirmationPopup tokenId={deleteTokenId} />
      </Container>
    </>
  )
}

export default AdminSecurityCatalog
