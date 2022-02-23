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

import { Container, ValutContainer, InfoTitle, Logo, StyledTitleBig } from './styleds'
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

  return (
    <>
      <DepositPopup currency={token?.token} />
      <WithdrawPopup currency={token?.token} />
      <LightBackground />
      <Container width={['100%', '90%']} maxWidth={'920px'}>
        <InfoTitle>
          <BackArrowButton />
          {token?.logo ? (
            <img width="72px" height="72px" style={{ borderRadius: '50%' }} src={token.logo.public} />
          ) : (
            <Logo currency={currency} size="72px" />
          )}
          <Box display="flex">
            <StyledTitleBig fontWeight="600">{token?.ticker}</StyledTitleBig>
            <StyledTitleBig>
              &nbsp;-&nbsp;
              {token?.companyName}
            </StyledTitleBig>
          </Box>
        </InfoTitle>
        {token && <DetailsInfo token={token} />}
        {token && <AddToMetamask token={token} />}
        {atlasInfo && <AtlasInfo atlasInfo={atlasInfo} />}
        {token?.token && (
          <ValutContainer>
            <Vault token={token} currency={token.token} />
          </ValutContainer>
        )}
        {token && !token.token && <NotTradable ticker={token.ticker} />}
      </Container>
    </>
  )
}
