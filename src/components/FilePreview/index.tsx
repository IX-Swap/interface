import React, { CSSProperties, FC } from 'react'
import { FileWithPath } from 'react-dropzone'

import { TYPE } from 'theme'
import { KYCStatusIcons } from 'pages/KYC/styleds'
import { KYCStatuses } from 'components/Vault/enum'
import { ButtonText } from 'components/Button'

import { ReactComponent as PdfImage } from 'assets/images/pdf.svg'
import { Wrapper } from './styleds'

interface Props {
  index: number
  file: FileWithPath
  handleDeleteClick: any
  style?: CSSProperties
  withBackground?: boolean
}

export const FilePreview: FC<Props> = ({ file, style, handleDeleteClick, withBackground = true }: Props) => {
  const deleteIcon = KYCStatusIcons[KYCStatuses.REJECTED]

  return (
    <Wrapper withBackground={withBackground} marginBottom="10px" width="fit-content" alignItems="center" style={style}>
      <PdfImage style={{ minWidth: 32, minHeight: 32 }} />
      <TYPE.subHeader
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        lineHeight="40px"
        marginLeft="12px"
        marginRight="18px"
      >
        {file.name}
      </TYPE.subHeader>
      <ButtonText style={{ minWidth: 24, minHeight: 24 }} onClick={handleDeleteClick} type="button">
        {deleteIcon()}
      </ButtonText>
    </Wrapper>
  )
}
