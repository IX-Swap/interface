import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { Modal } from '@material-ui/core'
import { ReactComponent as FileIcon } from '../../../assets/images/fileNew.svg'
import { ReactComponent as EyeIcon } from '../../../assets/images/eyeIconNew.svg'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { AcceptFiles } from 'components/Upload/types'
import { isMobile } from 'react-device-detect'

interface Document {
  name: string
  public: string
  mimeType: string
}

interface AdditionalDocumentsProps {
  uploadDocs: any
}

const DocumentWrapper = styled.div`
  margin-top: 40px;
`

const DocumentImage = styled.img`
  width: 100%;
`

const DocumentView = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  padding: 24px 16px;
  margin: 16px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    justify-content: space-between;
  }
`

const DocumentName = styled(TYPE.subHeader1)`
  color: #8f8fb2;
  margin-right: auto;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 12px !important;
  }
`

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScrollableWrapper = styled.div`
  max-width: 90vw;
  max-height: 80vh;
  overflow: auto;
`

const DownloadButton = styled.button`
  display: block;
  margin: auto;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: none;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  color: #6666ff;
  cursor: pointer;
`

export default function AdditionalDocuments({ uploadDocs }: AdditionalDocumentsProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback((doc: Document) => {
    setSelectedDocument(doc)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedDocument(null)
    setIsModalOpen(false)
  }, [])

  const handleDownload = useCallback(async (url: string, fileName: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobURL = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobURL
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(blobURL)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }, [])

  const modalContent = useMemo(() => {
    if (!selectedDocument) return null

    const docs = [{ uri: selectedDocument.public }]

    return (
      <div style={{ background: '#ffffff', padding: '20px' }}>
        {selectedDocument.mimeType.startsWith('image') ? (
          <ScrollableWrapper>
            <DocumentImage src={selectedDocument.public} alt={selectedDocument.name} />
          </ScrollableWrapper>
        ) : selectedDocument.mimeType === AcceptFiles.PDF ? (
          <ScrollableWrapper>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
          </ScrollableWrapper>
        ) : (
          <embed src={selectedDocument.public} type={selectedDocument.mimeType} width="100%" height="100%" />
        )}
        <DownloadButton
          onClick={(e) => {
            e.preventDefault()
            handleDownload(selectedDocument.public, selectedDocument.name)
          }}
        >
          Download
        </DownloadButton>
      </div>
    )
  }, [selectedDocument, handleDownload])

  return (
    <DocumentWrapper>
      <TYPE.label fontSize={'20px'}>Additional Documents</TYPE.label>
      {isMobile ? (
        <div>
          {uploadDocs.map((doc: Document, index: number) => (
            <DocumentView key={index} onClick={() => openModal(doc)}>
              <span style={{display: 'flex', placeItems: 'center'}}>
                <FileIcon style={{ marginRight: '6px' }} />
                <DocumentName>{doc.name}</DocumentName>
              </span>
              <span>
                <EyeIcon style={{ marginLeft: '6px' }} />
              </span>
            </DocumentView>
          ))}
        </div>
      ) : (
        <div>
          {uploadDocs.map((doc: Document, index: number) => (
            <DocumentView key={index} onClick={() => openModal(doc)}>
              {doc.mimeType.startsWith('image') ? (
                <img src={doc.public} alt={doc.name} style={{ marginRight: '6px', width: '24px', height: '24px' }} />
              ) : (
                <FileIcon style={{ marginRight: '6px' }} />
              )}
              <DocumentName>{doc.name}</DocumentName>
              <EyeIcon style={{ marginLeft: '6px' }} />
            </DocumentView>
          ))}
        </div>
      )}
      {isModalOpen && selectedDocument && (
        <CustomModal open={isModalOpen} onClose={closeModal}>
          {modalContent || <div>No content available</div>}
        </CustomModal>
      )}
    </DocumentWrapper>
  )
}
