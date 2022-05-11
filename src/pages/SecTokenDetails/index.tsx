import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box } from 'rebass'

import { Vault } from 'components/Vault'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
import { useCurrency } from 'hooks/Tokens'
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

export default function SecTokenDetails({
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const currency = (useCurrency(currencyId) as any) ?? undefined
  const [token, setToken] = useState<any>(null)
  const [atlasInfo, setAtlasInfo] = useState<any | null>(null)
  const { account } = useActiveWeb3React()

  const isLoggedIn = !!account

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

  if (!isLoggedIn) return <NotAvailablePage />

  return (
    <>
      <DepositPopup currency={token?.token} token={token} />
      <WithdrawPopup currency={token?.token} token={token} />
      <LightBackground />
      <Container width={['100%', '90%']} maxWidth={'920px'}>
        <InfoTitle>
          <BackArrowButton />
          {token?.logo ? <TokenLogo logo={token.logo} /> : <Logo currency={currency} size="72px" />}
          <Box display="flex" alignItems="center">
            <StyledTitleBig fontWeight="600">{token?.ticker}</StyledTitleBig>
            <CompanyName>
              &nbsp;-&nbsp;
              {token?.companyName}
            </CompanyName>
          </Box>
        </InfoTitle>
        {token && <DetailsInfo token={token} />}
        {token && <AddToMetamask token={token} />}
        {atlasInfo && <AtlasInfo atlasInfo={atlasInfo} />}
        {token?.token?.id && (
          <ValutContainer>
            <Vault token={token} currency={token.token} />
          </ValutContainer>
        )}
        {token && !token.token?.id && <NotTradable ticker={token.ticker} />}
      </Container>
    </>
  )
}
