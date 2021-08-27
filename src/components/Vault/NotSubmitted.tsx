import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useWalletModalToggle, useChooseBrokerDealerModalToggle } from 'state/application/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { ButtonRow, NotSubmittedDescription, NotSubmittedTitle, NotSubmittedWrapper } from './styleds'
import { ChooseBrokerDealerPopup } from './ChooseBrokerDealerPopup'

interface Props {
  currency?: Currency
}
export const NotSubmitted = ({ currency }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? currency?.name ?? '', [currency])
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleChooseBrokerDealerModal = useChooseBrokerDealerModalToggle()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  return (
    <NotSubmittedWrapper>
      <NotSubmittedTitle>
        <TYPE.title3>
          <Trans>Create {symbolText} Vault</Trans>
        </TYPE.title3>
      </NotSubmittedTitle>
      <NotSubmittedDescription>
        <TYPE.descriptionThin>
          <Trans>You need to pass accreditation and KYC to start trading with the {symbolText} token.</Trans>
        </TYPE.descriptionThin>
      </NotSubmittedDescription>
      <ButtonRow>
        <ButtonIXSGradient onClick={toggleWalletModal} disabled={!!account} data-testid="connect-wallet-in-vault">
          <Trans>Connect Wallet</Trans>
        </ButtonIXSGradient>

        <ButtonIXSGradient
          data-testid="pass-kyc-and-accreditation"
          onClick={toggleChooseBrokerDealerModal}
          disabled={!account}
        >
          <Trans>Pass KYC and Accreditation</Trans>
        </ButtonIXSGradient>
        <ChooseBrokerDealerPopup tokenId={tokenId} />
      </ButtonRow>
    </NotSubmittedWrapper>
  )
}
