import { t } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReadMore } from 'components/ReadMore'
import { Vault } from 'components/Vault'
import { VaultState } from 'components/Vault/enum'
import { useCurrency } from 'hooks/Tokens'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { InfoBackground } from './Background'
import { Container, Description, DescriptionText, InfoTitle } from './styleds'
import { TokenDetails } from './TokenDetails'

export default function SecTokenDetails({
  history,
  match: {
    params: { currencyId },
  },
}: RouteComponentProps<{ currencyId: string }>) {
  const currency = useCurrency(currencyId) ?? undefined
  return (
    <>
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
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget
              tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies
              ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet
              quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Quisque velit
              nisi, pretium ut lacinia in, elementum id enim. Praesent sapien massa, convallis a pellentesque nec,
              egestas non nisi. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem
              ut libero malesuada feugiat. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. Nulla
              porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat 4567 457 457 457 457 4574567
              457 457 457 457 4574567 457 457 457 457 4574567 457 457 457 457 457 111 1111 11111111 111 111 1111
              11111111 111 111 1111 11111111 111 111 1111 11111111 111 222 222 222 222 222 222 222 222 222 222 222 222
              222 222 222 222 222 222
            </ReadMore>
          </DescriptionText>
        </Description>
        <TokenDetails />
        <Vault status={VaultState.PENDING} currency={currency} />
      </Container>
    </>
  )
}
