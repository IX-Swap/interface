import React, { CSSProperties, FC } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Copy } from 'react-feather'
import { Flex } from 'rebass'

import { IconWrapper } from 'components/AccountDetails/styleds'
import { shortenAddress } from 'utils'
import useCopyClipboard from 'hooks/useCopyClipboard'

export const StyledCopy = styled(Copy)`
  margin-left: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`

interface Props {
  address: string
  size?: number
  wrapperStyles?: CSSProperties
  isShortenAddress?: boolean
}

export const CopyAddress: FC<Props> = ({ address, wrapperStyles, size = 18, isShortenAddress = true }) => {
  const [copied, setCopied] = useCopyClipboard()

  return (
    <>
      {copied ? (
        <Trans>Copied!</Trans>
      ) : (
        <Flex style={wrapperStyles}>
          {isShortenAddress ? shortenAddress(address || '') : address}
          <IconWrapper
            style={wrapperStyles}
            size={size}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setCopied(address || '')
            }}
          >
            <StyledCopy />
          </IconWrapper>
        </Flex>
      )}
    </>
  )
}
