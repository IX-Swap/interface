import { t } from '@lingui/macro'
import { ReadMore } from 'components/ReadMore'
import { Vault } from 'components/Vault'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
import { useCurrency } from 'hooks/Tokens'
import React, { useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box } from 'rebass'
import { getAtlasAll, getAtlasInfo, getToken } from 'state/secCatalog/hooks'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { LightBackground } from 'theme/Background'
import { Container, Description, DescriptionText, InfoTitle, Logo, StyledTitleBig } from './styleds'
import { TokenDetails } from './TokenDetails'

export default function SecTokenDetails({
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const currency = (useCurrency(currencyId) as any) ?? undefined
  const [token, setToken] = useState<any>(null)
  const { accreditationRequest } = useAccreditationStatus(currencyId)

  useEffect(() => {
    const fetchToken = async () => {
      const data = await getToken(+currencyId)
      setToken(data)

      // if (data?.atlasOneId) {
      //   console.log(await getAtlasInfo(data?.atlasOneId))
      //   console.log(await getAtlasAll())
      // }
    }

    fetchToken()
  }, [currencyId])

  return (
    <>
      <DepositPopup currency={token?.token} />
      <WithdrawPopup currency={token?.token} />
      <LightBackground />
      <Container width={['100%', '90%', '65%']} maxWidth={'920px'}>
        <InfoTitle>
          {token?.logo ? (
            <img width="72px" height="72px" style={{ borderRadius: '50%' }} src={token.logo.public} />
          ) : (
            <Logo currency={currency} size="72px" />
          )}
          <Box display="flex">
            <StyledTitleBig fontWeight="600">{token?.ticker}</StyledTitleBig>
            <StyledTitleBig>&nbsp;-&nbsp;{token?.companyName}</StyledTitleBig>
          </Box>
        </InfoTitle>
        <Description>
          <DescriptionText>
            <ReadMore lines={7} more={t`Read More`} less={t`Hide`}>
              {token?.description}
            </ReadMore>
          </DescriptionText>
        </Description>
        <TokenDetails token={token} accreditationRequest={accreditationRequest} />
        {token?.token && <Vault token={token} currency={token.token} />}
      </Container>
    </>
  )
}
