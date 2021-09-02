import { t } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReadMore } from 'components/ReadMore'
import { Vault } from 'components/Vault'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { getVaultState } from 'components/Vault/enum'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
import { useCurrency } from 'hooks/Tokens'
import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box } from 'rebass'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { Container, Description, DescriptionText, InfoTitle } from './styleds'
import { TokenDetails } from './TokenDetails'

export default function SecTokenDetails({
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const currency = (useCurrency(currencyId) as any) ?? undefined
  const { secTokens } = useUserSecTokens()

  // todo remove vaultState if not needed anymore
  const vaultState = useMemo(() => {
    const status = (secTokens[currencyId] as any)?.tokenInfo?.status ?? ''
    return getVaultState(status)
  }, [secTokens, currencyId])

  const description = useMemo(() => {
    return (currency as any)?.tokenInfo?.description
  }, [currency])

  const accreditationRequest = (secTokens[currencyId] as any)?.tokenInfo?.accreditationRequest || {}
  return (
    <>
      <DepositPopup currency={currency} />
      <WithdrawPopup currency={currency} />
      <LightBackground />
      <Container width={['100%', '90%', '65%']} maxWidth={'920px'}>
        <InfoTitle>
          <CurrencyLogo currency={currency} size="72px" />
          <Box display="flex">
            <TYPE.titleBig fontWeight="600">{currency?.symbol}</TYPE.titleBig>
            <TYPE.titleBig>&nbsp;-&nbsp;{currency?.name}</TYPE.titleBig>
          </Box>
        </InfoTitle>
        <Description>
          <DescriptionText>
            <ReadMore lines={7} more={t`Read More`} less={t`Hide`}>
              {description}
            </ReadMore>
          </DescriptionText>
        </Description>
        <TokenDetails currency={currency} />
        <Vault status={vaultState} currency={currency} accreditationRequest={accreditationRequest} />
      </Container>
    </>
  )
}
