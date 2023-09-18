import React, { CSSProperties, FC } from 'react'
import { FileWithPath } from 'react-dropzone'

import { TYPE } from 'theme'
import { KYCStatusIcons } from 'pages/KYC/styleds'
import { KYCStatuses } from 'pages/KYC/enum'
import { ButtonText } from 'components/Button'
import { ReactComponent as TrashNoBorder } from 'assets/images/TrashNoBorder.svg'
import { ReactComponent as FileNew } from 'assets/images/fileNew.svg'

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
  // const deleteIcon = KYCStatusIcons[KYCStatuses.REJECTED]

  return (
    <Wrapper withBackground={withBackground} marginBottom="10px" alignItems="center" style={style}>
      <FileNew />
      <TYPE.subHeader1
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        lineHeight="40px"
        marginLeft="12px"
        marginRight="18px"
        color="#8D8DA3"
      >
        {file.name}
      </TYPE.subHeader1>
      {!isDisabled && (
        // <ButtonText style={{ minWidth: 24, minHeight: 24 }}>
        <TrashNoBorder style={{ marginLeft: 'auto' }} onClick={handleDeleteClick} type="button" />
        // </ButtonText>
      )}
    </Wrapper>
  )
}
