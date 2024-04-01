import React, { CSSProperties, FC } from 'react';
import { FileWithPath } from 'react-dropzone';
import { ButtonText } from 'components/Button';
import { ReactComponent as TrashNoBorder } from 'assets/images/TrashNoBorder.svg';
import { Wrapper } from './styleds';

interface Props {
  file: FileWithPath;
  handleDeleteClick: () => void;
  style?: CSSProperties;
  withBackground?: boolean;
  isDisabled?: boolean;
  index: number;
}

export const ImagePreview: FC<Props> = ({
    file,
    style,
    handleDeleteClick,
    withBackground = true,
    isDisabled = false,
  }: Props) => {
    return (
      <Wrapper  withBackground={withBackground} marginBottom="10px" alignItems="center" style={style}>
        <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '100%', height: '400px', }} />
        {!isDisabled && (
          <ButtonText style={{ position: 'absolute', top: 30, right: 30, cursor: 'pointer' }}>
            <TrashNoBorder
              onClick={(event) => {
                event.preventDefault();
                handleDeleteClick(); 
              }}
            />
          </ButtonText>
        )}
      </Wrapper>
    );
};

  
