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
  color: #b8b8cc;
  width: 17px;
  height: 17px;
`

interface Props {
  address: string
  size?: number
  wrapperStyles?: CSSProperties
  isShortenAddress?: boolean
  network?: string
}

export const CopyAddress: FC<Props> = ({ address, wrapperStyles, size = 18, isShortenAddress = true, network }) => {
  const [copied, setCopied] = useCopyClipboard()

  return (
    <>
      {copied ? (
        <Trans>Copied!</Trans>
      ) : (
        <Flex style={wrapperStyles}>
          {isShortenAddress
            ? network
              ? shortenAddress(address || '', 4, network)
              : shortenAddress(address || '')
            : address}
          <IconWrapper style={wrapperStyles} size={size}>
            <StyledCopy
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCopied(address || '')
              }}
            />
          </IconWrapper>
        </Flex>
      )}
    </>
  )
}
