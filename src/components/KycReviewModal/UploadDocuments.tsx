import React from 'react'
import styled from 'styled-components'

import { Block } from './molecules/Block'

import { Documents } from './molecules/Documents'

export const UploadDocuments = () => {
  return (
    <Block title="Upload Documents">
      <Content>
        <Documents
          documents={[
            { fileName: 'Identification. pdf', type: 'Corporate documents', createdAt: new Date().toISOString() },
            { fileName: 'Identification. pdf', type: 'Financial Documents', createdAt: new Date().toISOString() },
            { fileName: 'Identification. pdf', type: 'Proof of Identity', createdAt: new Date().toISOString() },
          ]}
        />
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: flex;
`
