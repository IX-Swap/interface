import React from 'react'
import styled from 'styled-components'

import { Document } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { Documents } from '../molecules/Documents'
import { MEDIA_WIDTHS } from 'theme'
import { title } from 'process'

interface Props {
  data: Array<Document>
  title: string
  kycKey: any
}

export const UploadedDocuments = ({ data, title, kycKey }: Props) => {
  return (
    <Block title={title}>
      <Content>
        <Documents documents={data} kycKey={kycKey} />
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: flex;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`
