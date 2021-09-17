import React, { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import Jazzicon from '@metamask/jazzicon'

const StyledIdenticonContainer = styled.div<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.bg4};
  > div {
    display: flex !important;
  }
`

export default function Identicon({ size = 16 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(size, parseInt(account.slice(2, 10), size)))
    }
  }, [account, size])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer ref={ref as any} size={size} />
}
