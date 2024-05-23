import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import { TextInput } from 'pages/KYC/common'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import closeIcon from '../../../../assets/images/newCross.svg'

function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

interface AdditionalLinksModalProps {
  isOpen: boolean
  onClose: () => void
  setNewLinkName: (url: string) => void
  setNewLinkUrl: (url: string) => void
  handleAddLink: () => void
}

const AdditionalLinksModal: React.FC<AdditionalLinksModalProps> = ({
  isOpen,
  onClose,
  setNewLinkName,
  setNewLinkUrl,
  handleAddLink,
}) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorUrl, setErrorUrl] = useState('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setErrorUrl('')
    } else {
      setErrorUrl('Please enter link name')
    }
    setName(e.target.value)
    setNewLinkName(e.target.value)
  }

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setErrorUrl('')

      if (!isValidUrl(e.target.value)) {
        setErrorUrl('Please enter valid URL')
      }
    } else {
      setErrorUrl('Please enter URL')
    }
    setUrl(e.target.value)
    setNewLinkUrl(e.target.value)
  }

  const handleSubmit = () => {
    if (!name) {
      setErrorName('Please enter link name')
    }
    if (!url) {
      setErrorUrl('Please enter URL')
    }

    if (!name || !url) {
      return
    }
    handleAddLink()
    onClose()
  }
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose}>
      <ModalContainer>
        <img
          style={{ position: 'absolute', right: '30px', cursor: 'pointer' }}
          src={closeIcon}
          alt={closeIcon}
          width="18px"
          height="18px"
          onClick={onClose}
        />
        <div style={{ justifyContent: 'center' }}>
          <h2>Additional links</h2>
          <div>
            <TextInput
              name="name"
              id="name"
              label="Link Name"
              placeholder="Link Name"
              value={name}
              onChange={handleNameChange}
            />
            {errorName && <ErrorText>{errorName}</ErrorText>}
          </div>

          <div style={{ marginTop: 16 }}>
            <TextInput name="url" label="URL" placeholder="URL" value={url} onChange={handleUrlChange} />
            {errorUrl && <ErrorText>{errorUrl}</ErrorText>}
          </div>

          <div style={{ display: 'flex', margin: '20px 0px', gap: '10px' }}>
            <PinnedContentButton onClick={handleSubmit}>Add</PinnedContentButton>
            <ButtonOutlined onClick={onClose}>Cancel</ButtonOutlined>
          </div>
        </div>
      </ModalContainer>
    </RedesignedWideModal>
  )
}

export default AdditionalLinksModal

const ModalContainer = styled.div`
  background: white;
  padding: 35px;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  width: 500px;
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 20px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ErrorText = styled.span`
  border: none;
  color: red;
  font-size: 12px;
  display: block;
  margin-bottom: 15px;
  margin-top: 10px;
`
