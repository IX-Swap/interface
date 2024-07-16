import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Box } from 'rebass'

import { Vault } from 'components/Vault'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
import { useCurrency } from 'hooks/Tokens'
import { routes } from 'utils/routes'
import { getAtlasInfo, getToken } from 'state/secCatalog/hooks'
import { LightBackground } from 'theme/Background'
import { BackArrowButton } from 'components/BackArrowButton'
import { TokenLogo } from 'components/TokenLogo'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { useActiveWeb3React } from 'hooks/web3'

import { Container, ValutContainer, InfoTitle, Logo, StyledTitleBig, CompanyName } from './styleds'
import { DetailsInfo } from './DetailsInfo'
import { AddToMetamask } from './AddToMetamask'
import { AtlasInfo } from './AtlasInfo'
import { NotTradable } from './NotTradable'
import styled from 'styled-components'
import { NETWORK_LOGOS } from 'constants/chains'

export default function SecTokenDetails({
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const history = useHistory()
  const currency = (useCurrency(currencyId) as any) ?? undefined
  const [token, setToken] = useState<any>(null)
  const [atlasInfo, setAtlasInfo] = useState<any | null>(null)
  const { account } = useActiveWeb3React()

  const isLoggedIn = !!account
  const network = token?.token?.network
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  useEffect(() => {
    const fetchToken = async () => {
      const data = await getToken(+currencyId)
      setToken(data)

      if (data?.atlasOneId) {
        const atlasData: any = await getAtlasInfo(data?.atlasOneId)
        if (atlasData?.allIssuers) setAtlasInfo(atlasData.allIssuers[0])
      }
    }

    fetchToken()
  }, [currencyId])

  const onBack = () => {
    history.push(routes.securityTokens('tokens'))
  }

  if (!isLoggedIn) return <NotAvailablePage />

  return (
    <>
      <DepositPopup currency={token?.token} token={token} />
      <WithdrawPopup currency={token?.token} token={token} />
      <TokenInfoContainer>
        <Container style={{ position: 'relative' }}>
          {networkLogo ? (
            <LogoWrap>
              <NetworkLogo src={networkLogo} alt="network logo" />
            </LogoWrap>
          ) : null}
          {/* <LightBackground /> */}
          <InfoTitle>
            <BackArrowButton onBack={onBack} />
            {token?.logo ? <TokenLogo logo={token.logo} /> : <Logo currency={currency} size="72px" />}
            <Box display="flex" alignItems="center">
              <StyledTitleBig fontWeight="600">{token?.ticker}</StyledTitleBig>
              {/* <CompanyName>
                &nbsp;-&nbsp;
                {token?.companyName}
              </CompanyName> */}
            </Box>
          </InfoTitle>
          {token && <DetailsInfo token={token} />}
        </Container>
      </TokenInfoContainer>

      {atlasInfo && <AtlasInfo atlasInfo={atlasInfo} />}
      {token?.token?.id && (
        <ValutContainer>
          <Vault token={token} currency={token.token} />
        </ValutContainer>
      )}
      {token && !token.token?.id && <NotTradable ticker={token.ticker} />}
    </>
  )
}

export const TokenInfoContainer = styled.div<{ background?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
  width: 100%;
  padding: 0 2rem;
  // font-family: ${(props) => props.theme.launchpad.font};
  background: #ffffff;
  margin-top: -25px;

  * {
    // font-family: ${(props) => props.theme.launchpad.font};
  }

  /* Media Query for Mobile */
  @media (max-width: 768px) {
    padding: 0 1rem;
    background: #ffffff;
  }
`

const LogoWrap = styled.div`
  position: absolute;
  top: 25px;
  right: 0px;
`

const NetworkLogo = styled.img`
  height: 32px;
  width: 32px;
`
