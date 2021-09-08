import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useWalletModalToggle, useChooseBrokerDealerModalToggle } from 'state/application/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { NoVaultDescription, NoVaultTitle, NoVaultWrapper } from './styleds'
import { ChooseBrokerDealerPopup } from './ChooseBrokerDealerPopup'
import { AccreditationStatusEnum } from './enum'
import { RowCenter } from 'components/Row'
import { AccreditationStatus } from './AccreditationStatus'

interface Props {
  currency?: Currency
  status?: AccreditationStatusEnum
}
export const NoVault = ({ currency, status }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? currency?.name ?? '', [currency])
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleChooseBrokerDealerModal = useChooseBrokerDealerModalToggle()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  return (
    <NoVaultWrapper>
      <NoVaultTitle>
        <TYPE.title3>
          <Trans>Create {symbolText} Vault</Trans>
        </TYPE.title3>
      </NoVaultTitle>
      {status && [AccreditationStatusEnum.PENDING, AccreditationStatusEnum.REJECTED].includes(status) && (
        <AccreditationStatus status={status} />
      )}
      {status === undefined && (
        <NoVaultDescription>
          <TYPE.descriptionThin>
            <Trans>You need to pass accreditation and KYC to start trading with the {symbolText} token.</Trans>
          </TYPE.descriptionThin>
        </NoVaultDescription>
      )}
      <RowCenter>
        {!account && (
          <ButtonIXSGradient onClick={toggleWalletModal} disabled={!!account} data-testid="connect-wallet-in-vault">
            <Trans>Connect Wallet</Trans>
          </ButtonIXSGradient>
        )}

        {Boolean(account && status !== AccreditationStatusEnum.PENDING) && (
          <ButtonIXSGradient data-testid="pass-kyc-and-accreditation" onClick={toggleChooseBrokerDealerModal}>
            {status === undefined && <Trans>Pass KYC and Accreditation</Trans>}
            {status === AccreditationStatusEnum.REJECTED && <Trans>Retry pass accreditation</Trans>}
          </ButtonIXSGradient>
        )}
        <ChooseBrokerDealerPopup tokenId={tokenId} />
      </RowCenter>
    </NoVaultWrapper>
  )
}
