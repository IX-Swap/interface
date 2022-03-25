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
  token: any
  userHaveValidKyc: boolean
}

function getStatusMessage(
  accreditationRequest: AccreditationRequest | null,
  symbolText: string,
  platform: SecTokenPlatform | null
) {
  const status = accreditationRequest?.status
  switch (status) {
    case AccreditationStatusEnum.PENDING:
    // case AccreditationStatusEnum.PENDING_KYC:
    //   return t`Checking your KYC on ${platform?.name || 'primary issuer'}`
    case AccreditationStatusEnum.PENDING_CUSTODIAN:
      return t`KYC approved on ${platform?.name || 'primary issuer'}. Waiting for KYC approval on Custodian...`
    case AccreditationStatusEnum.FAILED:
      return (
        accreditationRequest?.message ||
        t`Could not verify KYC. Please check your account and/or KYC status on ${removeProtocolFromUrl(
          platform?.website || 'primary issuer website'
        )}. Retry passing accreditation once your KYC is approved by ${platform?.name || 'primary issuer'}. [retry]`
      )
    case AccreditationStatusEnum.REJECTED: {
      return accreditationRequest?.message || t`Accreditation rejected`
    }
    case undefined:
    default:
      return (
        <>
          <div>
            {t`Create your own safe custodian vault for ${symbolText} tokens to deposit and get wrapped tokens to start trading.`}
          </div>
          <div>{t`You need to pass accreditation and KYC to create a vault.`}</div>
        </>
      )
  }
}
export const NoVault = ({ currency, status, accreditationRequest, platform, token, userHaveValidKyc }: Props) => {
  const symbolText = useMemo(() => token?.ticker ?? currency?.name ?? '', [currency, token])
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleChooseBrokerDealerModal = useChooseBrokerDealerModalToggle()
  const currencyId: string | undefined = (currency as any)?.address
  const tokenId = useSecTokenId({ currencyId })

  return (
    <NoVaultWrapper>
      <NoVaultTitle style={{ order: 1 }}>
        <TYPE.title3>
          {userHaveValidKyc ? <Trans>Create {symbolText} Vault</Trans> : <Trans>NOT AVAILABLE</Trans>}
        </TYPE.title3>
      </NoVaultTitle>

      {userHaveValidKyc && (
        <>
          <VaultStatusDescription style={{ order: status === AccreditationStatusEnum.REJECTED ? 3 : 2 }}>
            <TYPE.descriptionThin>{getStatusMessage(accreditationRequest, symbolText, platform)}</TYPE.descriptionThin>
          </VaultStatusDescription>

          {status && <AccreditationStatus status={status} />}
        </>
      )}
      {userHaveValidKyc ? (
        <RowCenter style={{ order: 4 }}>
          {!account && (
            <ButtonIXSGradient
              style={{ marginTop: '28px', padding: '16px 24px' }}
              onClick={toggleWalletModal}
              disabled={!!account}
              data-testid="connect-wallet-in-vault"
            >
              <Trans>Connect Wallet</Trans>
            </ButtonIXSGradient>
          )}

          {Boolean(account && !(PENDING_ACCREDITATION_STATUSES as any).includes(status)) && (
            <ButtonIXSGradient
              style={{ marginTop: '28px', padding: '16px 24px' }}
              data-testid="pass-kyc-and-accreditation"
              onClick={toggleChooseBrokerDealerModal}
            >
              {status === undefined && <Trans>Pass KYC and Accreditation</Trans>}
              {status && ERROR_ACCREDITATION_STATUSES.includes(status) && <Trans>Retry pass accreditation</Trans>}
            </ButtonIXSGradient>
          )}
          <ChooseBrokerDealerPopup tokenId={tokenId} currencyId={currencyId} />
        </RowCenter>
      ) : (
        <VaultStatusDescription style={{ order: 2 }}>
          <TYPE.descriptionThin>
            <Trans>This Security Token is not available for your KYC type</Trans>
          </TYPE.descriptionThin>
        </VaultStatusDescription>
      )}
    </NoVaultWrapper>
  )
}
