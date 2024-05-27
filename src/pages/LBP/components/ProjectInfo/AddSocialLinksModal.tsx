import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'

import { Select, TextInput } from 'pages/KYC/common'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonOutlined, PinnedContentButton } from 'components/Button'
import { socialMediaPlatform } from 'pages/KYC/mock'
import closeIcon from '../../../../assets/images/newCross.svg'
import { isValidUrl } from 'utils'

interface AddSocialLinksModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectChange: (field: string, value: any) => void
  setNewLinkUrl: (url: string) => void
  handleAddLink: () => void
}

const AddSocialLinksModal: React.FC<AddSocialLinksModalProps> = ({
  isOpen,
  onClose,
  onSelectChange,
  setNewLinkUrl,
  handleAddLink,
}) => {
  const [selected, setSelected] = useState<any>(null)
  const [url, setUrl] = useState('')
  const [errorSelect, setErrorSelect] = useState('')
  const [errorUrl, setErrorUrl] = useState('')

  const handleSelect = (value: any) => {
    if (value) {
      setErrorSelect('')
    } else {
      setErrorSelect('Please select social media platform')
    }
    setSelected(value)
    onSelectChange('socialPlatform', value)
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

  const handleSubmit = async () => {
    if (!selected) {
      setErrorSelect('Please select social media platform')
    }
    if (!url) {
      setErrorUrl('Please enter URL')
    }

    if (!selected || !url) {
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
          <h2>Social Link</h2>
          <div>
            <Select
              withScroll
              name="name"
              id="name"
              label="Social Media Platform"
              placeholder="Social Media Platform"
              selectedItem={selected}
              items={socialMediaPlatform}
              onSelect={(selectedItem) => handleSelect(selectedItem)}
            />
            {errorSelect && <ErrorText>{errorSelect}</ErrorText>}
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

export default AddSocialLinksModal

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
