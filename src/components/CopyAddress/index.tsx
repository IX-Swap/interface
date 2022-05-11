import React, { CSSProperties, FC } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Copy } from 'react-feather'
import { Flex } from 'rebass'

import { IconWrapper } from 'components/AccountDetails/styleds'
import { shortenAddress } from 'utils'

export const StyledCopy = styled(Copy)`
  margin-left: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`

interface Props {
  address: string
  copied: boolean
  size?: number
  setCopied: (toCopy: string) => void
  wrapperStyles?: CSSProperties
}

export const CopyAddress: FC<Props> = ({ address, copied, setCopied, wrapperStyles, size = 18 }) => {
  return (
    <>
      {copied ? (
        <Trans>Copied!</Trans>
      ) : (
        <Flex style={wrapperStyles}>
          {shortenAddress(address || '')}
          <IconWrapper style={wrapperStyles} size={size} onClick={() => setCopied(address || '')}>
            <StyledCopy />
          </IconWrapper>
        </Flex>
      )}
    </>
  )
}
