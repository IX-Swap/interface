import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useWalletModalToggle } from 'state/application/hooks'
import { useFirstLogin } from 'state/auth/hooks'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useSecTokens } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { ButtonRow, NotSubmittedDescription, NotSubmittedTitle, NotSubmittedWrapper } from './styleds'

interface Props {
  currency?: Currency
}
export const NotSubmitted = ({ currency }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? currency?.name ?? '', [currency])
  const { account } = useActiveWeb3React()
  const { secTokens } = useSecTokens()
  const tokenId = useMemo(() => {
    const id = (secTokens[(currency as any)?.address] as any)?.tokenInfo?.id ?? ''
    return id
  }, [secTokens, currency])
  const login = useFirstLogin()
  const toggleWalletModal = useWalletModalToggle()
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
          onClick={() => {
            login()
          }}
          disabled={!account}
        >
          <Trans>Pass KYC and Accreditation</Trans>
        </ButtonIXSGradient>
      </ButtonRow>
    </NotSubmittedWrapper>
  )
}
