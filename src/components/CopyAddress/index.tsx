import React, { CSSProperties, FC } from 'react'
import styled, { css } from 'styled-components'
import { Trans } from '@lingui/macro'
import { Copy } from 'react-feather'
import { Flex } from 'rebass'

import { IconWrapper } from 'components/AccountDetails/styleds'
import { shortenAddress } from 'utils'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { MEDIA_WIDTHS } from 'theme'

interface ContainerProps {
  deposit: boolean
}

const Container = styled.div<ContainerProps>`
  ${(props) =>
    props.deposit &&
    css`
      background: #ffffff;
      border: 1px solid #e6e6ff;
      border-radius: 6px;
      margin-top: 8px;
      padding: 6px 50px;

      @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        padding: 6px 10px;
        gap: 10px;
      }
    `}
`

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
  deposit?: boolean
}

export const CopyAddress: FC<Props> = ({
  address,
  wrapperStyles,
  size = 18,
  isShortenAddress = true,
  network,
  deposit = false,
}) => {
  const [copied, setCopied] = useCopyClipboard()

  return (
    <Container deposit={deposit}>
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
    </Container>
  )
}
