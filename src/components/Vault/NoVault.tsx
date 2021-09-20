import { Currency } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useWalletModalToggle, useChooseBrokerDealerModalToggle } from 'state/application/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { VaultStatusDescription, NoVaultTitle, NoVaultWrapper } from './styleds'
import { ChooseBrokerDealerPopup } from './ChooseBrokerDealerPopup'
import {
  AccreditationRequest,
  AccreditationStatusEnum,
  ERROR_ACCREDITATION_STATUSES,
  PENDING_ACCREDITATION_STATUSES,
} from './enum'
import { RowCenter } from 'components/Row'
import { AccreditationStatus } from './AccreditationStatus'

interface Props {
  currency?: Currency
  status?: AccreditationStatusEnum
  accreditationRequest: AccreditationRequest | null
}

function getStatusMessage(accreditationRequest: AccreditationRequest | null, symbolText: string) {
  const status = accreditationRequest?.status
  switch (status) {
    case AccreditationStatusEnum.PENDING:
      return t`Checking your KYC on primary issuer`
    case AccreditationStatusEnum.PENDING_CUSTODIAN:
      return t`KYC approved on primary issuer. Waiting for KYC approval on Custodian...`
    case AccreditationStatusEnum.FAILED:
      return accreditationRequest?.message || t`Unknown error`
    case AccreditationStatusEnum.REJECTED:
      return accreditationRequest?.message || t`Accreditation rejected`
    case undefined:
    default:
      return t`You need to pass accreditation and KYC to start trading with the ${symbolText} token.`
  }
}
export const NoVault = ({ currency, status, accreditationRequest }: Props) => {
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
      {status && <AccreditationStatus status={status} />}

      <VaultStatusDescription>
        <TYPE.descriptionThin>{getStatusMessage(accreditationRequest, symbolText)}</TYPE.descriptionThin>
      </VaultStatusDescription>

      <RowCenter>
        {!account && (
          <ButtonIXSGradient
            style={{ marginTop: '25px' }}
            onClick={toggleWalletModal}
            disabled={!!account}
            data-testid="connect-wallet-in-vault"
          >
            <Trans>Connect Wallet</Trans>
          </ButtonIXSGradient>
        )}

        {Boolean(account && !(PENDING_ACCREDITATION_STATUSES as any).includes(status)) && (
          <ButtonIXSGradient
            style={{ marginTop: '25px' }}
            data-testid="pass-kyc-and-accreditation"
            onClick={toggleChooseBrokerDealerModal}
          >
            {status === undefined && <Trans>Pass KYC and Accreditation</Trans>}
            {status && ERROR_ACCREDITATION_STATUSES.includes(status) && <Trans>Retry pass accreditation</Trans>}
          </ButtonIXSGradient>
        )}
        <ChooseBrokerDealerPopup tokenId={tokenId} />
      </RowCenter>
    </NoVaultWrapper>
  )
}
