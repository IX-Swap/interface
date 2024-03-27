import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ReactComponent as CopySvg } from '../../assets/images/newCopyIcon.svg'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { LinkStyledButton } from '../../theme'
import { IconWrapperWithBg } from './styleds'
import { admin as adminApiUrls } from 'services/apiUrls' // Rename the import to avoid conflict

const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  align-items: center;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`
const TransactionStatusText = styled.span`
  margin-left: -0.2rem;
  font-size: 0.9rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode; isAdmin?: boolean }) {
  const [isCopied, setCopied] = useCopyClipboard()
  const { toCopy, children, isAdmin } = props

  return (
    <CopyIcon onClick={() => setCopied(toCopy)}>
      {isAdmin === true ? (
        <>
              {isCopied ? t`Copied` : children}
          <TransactionStatusText></TransactionStatusText>
          <CopySvg style={{ marginLeft: '10px', width: '30px', height: '15px'}} />
        </>
      ) : (
        <>
          <CopySvg style={{ marginRight: '5px' }} /> 
          <TransactionStatusText></TransactionStatusText>
          {isCopied ? t`Copied` : children}
        </>
      )}


    </CopyIcon>
  )
}
