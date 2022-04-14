import React, { useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon } from 'theme'
import { StyledDocPreviewButton } from 'components/AdminKyc'
import { Download } from 'react-feather'
import { KycItem } from 'state/admin/actions'
import { IconWrapper } from 'components/AccountDetails/styleds'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { createFileFromApi } from 'utils/createFileFromApi'
import { AcceptFiles } from 'components/Upload/types'


interface Props {
  isOpen: boolean
  onClose: () => void
  data: any
}

export const KycDocPreviewModal = ({ isOpen, onClose, data }: Props) => {
  const [isLoading, handleIsLoading] = useState(false)
  const [docs, handleDocs] = useState([])
  const { individualKycId, individual, corporate } = data 
  const kyc = individualKycId ? individual : corporate
  const documents = kyc?.documents

  const fetchDocs = async () => {
    const response = documents?.reduce((acc: any, doc: any) => {
      const res = createFileFromApi(doc.asset)
      return [...acc, res]
    }, [])

    const data = await Promise.all(response as any)

    handleDocs(data as any)
  }
  
  useEffect(() => {
    if (documents?.length) {
      fetchDocs()
    }
  }, [documents])

  console.log('Docs in modal:', data)

  return (
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={onClose}>
        <ModalBlurWrapper style={{ minWidth: '360px', width: '800px', height: '900px', position: 'relative' }}>
          <LoadingIndicator isLoading={isLoading} isRelative />
          <ModalContent>
            <TitleContainer>
              <Title>
                <Trans>Documents</Trans>
                <Wrapper>
                  {/* <StyledDocPreviewButton onClick={() => null} style={{margin: '0 20px 0 0'}}>
                    <IconWrapper style={{margin: 0}} size={18}>
                      <StyledDownload />
                    </IconWrapper>
                  </StyledDocPreviewButton> */}

                  <CloseIcon data-testid="cross" onClick={onClose} />
                </Wrapper>
              </Title>
            </TitleContainer>
            <Body style={{height: '700px', overflowY: 'auto'}}>
              {
                data?.map(({asset, id}: any) => (
                  <>
                    {
                      asset.mimeType === AcceptFiles.PDF
                        ? <iframe frameBorder="0" key={id} width="100%" height="700px" src={asset.public} />
                        : <img src={asset.public} alt="" />
                    }
                  </>
                ))
              }
            </Body>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Body = styled.div`
  display: grid;
  row-gap: 35px;
  overflow: auto;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  width: 100%;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledDownload = styled(Download)`
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`