import React, { CSSProperties, FC } from 'react'
import { FileWithPath } from 'react-dropzone'
import { TYPE } from 'theme'
import { ButtonText } from 'components/Button'
import { ReactComponent as TrashNoBorder } from 'assets/images/TrashNoBorder.svg'
import { ReactComponent as FileNew } from 'assets/images/fileNew.svg'
import { ReactComponent as CrossIcon } from 'assets/images/newCross.svg'
import { Wrapper, PayoutPreviewImageWrapper } from './styleds'

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
  return (
    <Wrapper withBackground={withBackground} marginBottom="10px" alignItems="center" style={style}>
      <FileNew style={{ minWidth: 14, minHeight: 14 }} />
      <TYPE.subHeader1
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        lineHeight="40px"
        marginLeft="12px"
        marginRight="18px"
        color="#8D8DA3"
        fontSize={'10px'}
        // width={'80px'}
        width={'100%'}
        // minWidth={'100%'}
      >
        {file.name}
      </TYPE.subHeader1>
      {!isDisabled && (
        <ButtonText style={{ minWidth: 18, minHeight: 18 }}>
          <TrashNoBorder
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleDeleteClick(); // Invoke delete handler
            }}
          />
        </ButtonText>
      )}
    </Wrapper>
  );
};


export const FilePreviewPayout: FC<Props> = ({
  file,
  style,
  handleDeleteClick,
  withBackground = true,
  isDisabled = false,
}: Props) => {
  return (
    <PayoutPreviewImageWrapper marginRight={'10px'} withBackground={withBackground} marginBottom="10px" alignItems="center" style={style}>
      <FileNew style={{ minWidth: 14, minHeight: 14 }} />
      <TYPE.subHeader1
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        lineHeight="40px"
        marginLeft="12px"
        marginRight="18px"
        color="#8D8DA3"
        fontSize={'10px'}
        width={'100%'}
      >
        {file.name}
      </TYPE.subHeader1>
      {!isDisabled && (
        <ButtonText style={{ minWidth: 12, minHeight: 12 }}>
          <CrossIcon
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={(event) => {
              event.preventDefault();
              handleDeleteClick();
            }}
          />
        </ButtonText>
      )}
    </PayoutPreviewImageWrapper>
  );
};
