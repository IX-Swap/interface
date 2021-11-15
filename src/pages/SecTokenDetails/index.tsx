import { t } from '@lingui/macro'
import { ReadMore } from 'components/ReadMore'
import { ListType, useCurrencySearch } from 'components/SearchModal/useCurrencySearch'
import { Vault } from 'components/Vault'
import { DepositPopup } from 'components/Vault/DepositPopup'
import { WithdrawPopup } from 'components/Vault/WithdrawPopup'
import { useCurrency } from 'hooks/Tokens'
import React, { useMemo, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FixedSizeList } from 'react-window'
import { Box } from 'rebass'
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
  const description = useMemo(() => {
    return (currency as any)?.tokenInfo?.description
  }, [currency])
  const listRef = useRef<FixedSizeList>()
  const { filteredSortedTokens } = useCurrencySearch({
    listRef,
    list: ListType.OTHER,
  })
  const { accreditationRequest, platform } = useAccreditationStatus(currencyId)
  const notApprovedToken = filteredSortedTokens.find(({ tokenInfo }: any) => tokenInfo.address === currencyId) || null

  return (
    <>
      <DepositPopup currency={currency} />
      <WithdrawPopup currency={currency} />
      <LightBackground />
      <Container width={['100%', '90%', '65%']} maxWidth={'920px'}>
        <InfoTitle>
          <Logo currency={currency} size="72px" />
          <Box display="flex">
            <StyledTitleBig fontWeight="600">{currency?.symbol}</StyledTitleBig>
            <StyledTitleBig>&nbsp;-&nbsp;{currency?.name}</StyledTitleBig>
          </Box>
        </InfoTitle>
        <Description>
          <DescriptionText>
            <ReadMore lines={7} more={t`Read More`} less={t`Hide`}>
              {description}
            </ReadMore>
          </DescriptionText>
        </Description>
        <TokenDetails
          accreditationRequest={accreditationRequest}
          currency={currency}
          platform={notApprovedToken ? (notApprovedToken as any)?.tokenInfo.platform : platform}
        />
        <Vault currency={currency} currencyId={currencyId} />
      </Container>
    </>
  )
}
