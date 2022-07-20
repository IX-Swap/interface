import React from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ReactComponent as CopySvg } from '../../assets/images/copy.svg'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { LinkStyledButton } from '../../theme'
import { IconWrapperWithBg } from './styleds'

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
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      <TransactionStatusText>
        <IconWrapperWithBg size={8}>
          <CopySvg />
        </IconWrapperWithBg>
      </TransactionStatusText>
      {isCopied ? t`Copied` : props.children}
    </CopyIcon>
  )
}
