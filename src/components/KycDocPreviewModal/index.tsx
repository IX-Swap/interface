import React from 'react'
import { isFirefox } from 'react-device-detect'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import FileViewer from 'react-file-viewer'
import { Download } from 'react-feather'

import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon, EllipsisText } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradient } from 'components/Button'
import { AcceptFiles } from 'components/Upload/types'

export const Image = styled.img`
  max-width: 100%;

  ${!isFirefox
    ? `
    max-height: 100%;
  `
    : ``}
`

interface Props {
  isOpen: boolean
  onClose: () => void
  data: Array<any>
  downloadFile: (url: string, name: string, mimeType: string) => void
}

export const KycDocPreviewModal = ({ isOpen, onClose, data, downloadFile }: Props) => {
  return (
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={onClose}>
        <ModalBlurWrapper style={{ position: 'relative' }}>
          <ModalContent>
            <TitleContainer>
              <Title>
                <Trans>Documents</Trans>
                <Wrapper>
                  <CloseIcon data-testid="cross" onClick={onClose} />
                </Wrapper>
              </Title>
            </TitleContainer>
            <Body className="file-viewer-canvas-wrapper">
              {data?.map(({ asset, id }: any) => (
                <>
                  {asset.mimeType === AcceptFiles.PDF ? (
                    <div>
                      <div className="file-viewer-title">
                        <EllipsisText style={{ width: 'calc(100% - 40px)', whiteSpace: 'pre-wrap' }}>
                          {asset.name}
                        </EllipsisText>
                        <StyledDocPreviewButton onClick={() => downloadFile(asset.public, asset.name, asset.mimeType)}>
                          <IconWrapper style={{ margin: 0 }} size={18}>
                            <StyledDownload />
                          </IconWrapper>
                        </StyledDocPreviewButton>
                      </div>
                      <FileViewer fileType="pdf" filePath={asset.public} />
                    </div>
                  ) : (
                    <Image key={id} src={asset.public} alt="" />
                  )}
                </>
              ))}
            </Body>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

export const StyledDocPreviewButton = styled(ButtonGradient)`
  min-height: 34px;
  min-width: 34px;
  max-height: 34px;
  max-width: 34px;
  padding: 4px 8px;
  font-size: 14px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Body = styled.div`
  display: grid;
  row-gap: 35px;
  overflow: auto;
  &.file-viewer-canvas-wrapper {
    height: 580px;
    overflow-y: auto;
    overflow-x: hidden;
    canvas {
      width: 100%;
    }
  }

  .file-viewer-title {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 14px);
    align-items: center;
    margin-bottom: 12px;
  }
`

const StyledDownload = styled(Download)`
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 20px 42px;
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
