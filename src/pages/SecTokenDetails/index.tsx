import { t } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReadMore } from 'components/ReadMore'
import { Vault } from 'components/Vault'
import { VaultState } from 'components/Vault/enum'
import { useCurrency } from 'hooks/Tokens'
import React, { useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { InfoBackground } from './Background'
import { Container, Description, DescriptionText, InfoTitle } from './styleds'
import { TokenDetails } from './TokenDetails'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
export default function SecTokenDetails({
  history,
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const currency = (useCurrency(currencyId) as any) ?? undefined
  const description = useMemo(() => {
    return (currency as any)?.tokenInfo?.description
  }, [currency])
  return (
    <>
      <DepositPopup currency={currency} />
      <WithdrawPopup currency={currency} />
      <InfoBackground />
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
        <Vault status={VaultState.NOT_SUBMITTED} currency={currency} />
      </Container>
    </>
  )
}
