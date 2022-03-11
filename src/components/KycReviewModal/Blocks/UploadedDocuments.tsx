import React from 'react'
import styled from 'styled-components'

import { Document } from 'state/admin/actions'

import { Block } from '../molecules/Block'
import { Documents } from '../molecules/Documents'

interface Props {
  data: Array<Document>
}

export const UploadedDocuments = ({ data }: Props) => {
  return (
    <Block title="Uploaded documents">
      <Content>
        <Documents documents={data} />
      </Content>
    </Block>
  )
}

const Content = styled.div`
  display: flex;
`
