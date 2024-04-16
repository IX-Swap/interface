import React from 'react';
import styled from 'styled-components';
import { TYPE } from 'theme';
import { ReactComponent as FileIcon } from '../../../assets/images/fileNew.svg';
import { ReactComponent as EyeIcon } from '../../../assets/images/eyeIconNew.svg';


export default function AdditionalDocuments() {
  const DocumentWrapper = styled.div`
    margin-top: 40px;
  `;
  const DocumentView = styled.div`
    border: 1px solid #e6e6ff;
    border-radius: 8px;
    padding: 24px 16px;
    margin: 16px 0px;
    display: flex;
    align-items: center;
  `;

  return (
    <DocumentWrapper>
      <TYPE.label fontSize={'20px'}>Additional Documents</TYPE.label>
      <DocumentView>
     <FileIcon style={{marginRight: '6px'}}/>   <TYPE.subHeader1 color={'#8F8FB2'}> Selfie with Proof of Identity.png</TYPE.subHeader1>
        <EyeIcon style={{ marginLeft: 'auto' }} />
      </DocumentView>
      <DocumentView>
     <FileIcon style={{marginRight: '6px'}}/>   <TYPE.subHeader1 color={'#8F8FB2'}> Selfie with Proof of Identity.png</TYPE.subHeader1>
        <EyeIcon style={{ marginLeft: 'auto' }} />
      </DocumentView>
      <DocumentView>
     <FileIcon style={{marginRight: '6px'}}/>   <TYPE.subHeader1 color={'#8F8FB2'}> Selfie with Proof of Identity.png</TYPE.subHeader1>
        <EyeIcon style={{ marginLeft: 'auto' }} />
      </DocumentView>
    </DocumentWrapper>
  );
}
