import React from 'react'
import CurrencyLogo from 'components/CurrencyLogo'
import styled from 'styled-components'
import { NETWORK_LOGOS } from 'constants/chains'
import { SecTokenLogo } from 'types/secToken'

interface ITokenNetwork {
  token: {
    logo?: SecTokenLogo
  }
  network: string
  width?: string
  height?: string
}

const TokenNetwork = ({
  width='48px',
  height='48px',
  token, network,
}: ITokenNetwork) => {
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  return (
    <div style={{ position: 'relative' }}>
      {token.logo ? (
        <img style={{ borderRadius: '50%' }} width={width} height={height} src={token.logo.public} />
      ) : (
        <CurrencyLogo currency={undefined} size={'46px'} style={{ marginRight: 16, minWidth: 46 }} />
      )}

      {networkLogo ? (
        <LogoWrap>
          <NetworkLogo src={networkLogo} alt="network logo" />
        </LogoWrap>
      ) : null}
    </div>
  )
}

export default TokenNetwork

const LogoWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const NetworkLogo = styled.img`
  height: 16px;
  width: 16px;
  border: 0.5px solid white;
  border-radius: 50%;
`