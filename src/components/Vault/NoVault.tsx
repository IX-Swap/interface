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
import { SecTokenPlatform } from 'types/secToken'
import { removeProtocolFromUrl } from 'utils'

interface Props {
  currency?: Currency
  status?: AccreditationStatusEnum
  accreditationRequest: AccreditationRequest | null
  platform: SecTokenPlatform | null
}

function getStatusMessage(
  accreditationRequest: AccreditationRequest | null,
  symbolText: string,
  platform: SecTokenPlatform | null
) {
  const status = accreditationRequest?.status
  switch (status) {
    case AccreditationStatusEnum.PENDING:
    case AccreditationStatusEnum.PENDING_KYC:
      return t`Checking your KYC on ${platform?.name || 'primary issuer'}`
    case AccreditationStatusEnum.PENDING_CUSTODIAN:
      return t`KYC approved on ${platform?.name || 'primary issuer'}. Waiting for KYC approval on Custodian...`
    case AccreditationStatusEnum.FAILED:
      return (
        accreditationRequest?.message ||
        t`Could not verify KYC. Please check your account and/or KYC status on ${removeProtocolFromUrl(
          platform?.website || 'primary issuer website'
        )}. Retry passing accreditation once your KYC is approved by ${platform?.name || 'primary issuer'}. [retry]`
      )
    case AccreditationStatusEnum.REJECTED:
      return accreditationRequest?.message || t`Accreditation rejected`
    case undefined:
    default:
      return t`You need to pass accreditation and KYC to start trading with the ${symbolText} token.`
  }
}
export const NoVault = ({ currency, status, accreditationRequest, platform }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? currency?.name ?? '', [currency])
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleChooseBrokerDealerModal = useChooseBrokerDealerModalToggle()
  const currencyId: string | undefined = (currency as any)?.address
  const tokenId = useSecTokenId({ currencyId })
  return (
    <NoVaultWrapper>
      <NoVaultTitle>
        <TYPE.title3>
          <Trans>Create {symbolText} Vault</Trans>
        </TYPE.title3>
      </NoVaultTitle>
      {status && <AccreditationStatus status={status} />}

      <VaultStatusDescription>
        <TYPE.descriptionThin>{getStatusMessage(accreditationRequest, symbolText, platform)}</TYPE.descriptionThin>
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
        <ChooseBrokerDealerPopup tokenId={tokenId} currencyId={currencyId} />
      </RowCenter>
    </NoVaultWrapper>
  )
}
