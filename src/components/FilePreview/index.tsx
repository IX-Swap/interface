import React, { CSSProperties, FC } from 'react'
import { FileWithPath } from 'react-dropzone'

import { TYPE } from 'theme'
import { KYCStatusIcons } from 'pages/KYC/styleds'
import { KYCStatuses } from 'pages/KYC/enum'
import { ButtonText } from 'components/Button'

import { Wrapper, StyledPdfImage } from './styleds'

interface Props {
  index: number
  file: FileWithPath
  handleDeleteClick: any
  style?: CSSProperties
  withBackground?: boolean
  isDisabled?: boolean
}

export const FilePreview: FC<Props> = ({
  file,
  style,
  handleDeleteClick,
  withBackground = true,
  isDisabled = false,
}: Props) => {
  const deleteIcon = KYCStatusIcons[KYCStatuses.REJECTED]

  return (
    <Wrapper withBackground={withBackground} marginBottom="10px" width="fit-content" alignItems="center" style={style}>
      <StyledPdfImage style={{ minWidth: 32, minHeight: 32 }} />
      <TYPE.subHeader
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        lineHeight="40px"
        marginLeft="12px"
        marginRight="18px"
      >
        {file.name}
      </TYPE.subHeader>
      {!isDisabled && (
        <ButtonText style={{ minWidth: 24, minHeight: 24 }} onClick={handleDeleteClick} type="button">
          {deleteIcon()}
        </ButtonText>
      )}
    </Wrapper>
  )
}
