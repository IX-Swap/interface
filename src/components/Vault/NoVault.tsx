import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'

import { ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { useWalletModalToggle, useChooseBrokerDealerModalToggle } from 'state/application/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { TYPE } from 'theme'
import { SecTokenPlatform } from 'types/secToken'
import { removeProtocolFromUrl } from 'utils'
import { RowCenter } from 'components/Row'
import QuestionHelper from 'components/QuestionHelper'

import { VaultStatusDescription, NoVaultTitle, NoVaultWrapper } from './styleds'
import { ChooseBrokerDealerPopup } from './ChooseBrokerDealerPopup'
import {
  AccreditationRequest,
  AccreditationStatusEnum,
  ERROR_ACCREDITATION_STATUSES,
  PENDING_ACCREDITATION_STATUSES,
} from './enum'
import { AccreditationStatus } from './AccreditationStatus'

interface Props {
  currency?: Currency
  brokerDealerStatus: string
  custodianStatus: string
  accreditationRequest: AccreditationRequest | null
  platform: SecTokenPlatform | null
  token: any
  userHaveValidAccount: boolean
  message: string
}

function getStatusMessage(
  accreditationRequest: AccreditationRequest | null,
  symbolText: string,
  platform: SecTokenPlatform | null
) {
  const status = accreditationRequest?.status
  switch (status) {
    case AccreditationStatusEnum.PENDING:
      return t`KYC approved on ${platform?.name || 'primary issuer'}. Waiting for KYC approval on Custodian...`
    case AccreditationStatusEnum.FAILED:
      return (
        accreditationRequest?.message ||
        t`Could not verify KYC. Please check your account and/or KYC status on ${removeProtocolFromUrl(
          platform?.website || 'primary issuer website'
        )}. Retry passing accreditation once your KYC is approved by ${platform?.name || 'primary issuer'}. [retry]`
      )
    case AccreditationStatusEnum.DECLINED: {
      return accreditationRequest?.message || t`Accreditation rejected`
    }
    case undefined:
    default:
      return t`To trade/swap ${symbolText} please pass accreditation.`
  }
}
export const NoVault = ({
  currency,
  brokerDealerStatus,
  custodianStatus,
  accreditationRequest,
  platform,
  token,
  userHaveValidAccount,
  message,
}: Props) => {
  const symbolText = useMemo(() => token?.ticker ?? currency?.name ?? '', [currency, token])
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleChooseBrokerDealerModal = useChooseBrokerDealerModalToggle()
  const currencyId: string | undefined = (currency as any)?.address
  const tokenId = useSecTokenId({ currencyId })

  const statuses = [custodianStatus, brokerDealerStatus]

  return (
    <NoVaultWrapper>
      <NoVaultTitle style={{ order: 1, zIndex: 4 }}>
        <TYPE.title6>
          {userHaveValidAccount ? <Trans>Create {symbolText} Vault</Trans> : <Trans>NOT AVAILABLE</Trans>}
        </TYPE.title6>
        {/* {userHaveValidAccount && (
          <QuestionHelper
            width={512}
            text={
              <>
                <div style={{ marginBottom: 4 }}>
                  <Trans>
                    You need to pass accreditation to create a vault. Creating a vault is the equivalent of creating
                    your own safe custodian vault for {symbolText} tokens to deposit and get wrapped tokens to start
                    trading.
                  </Trans>
                </div>
                <div>
                  <Trans>
                    The accreditation is being verified by the custodian and can take up to 1-3 days. You need to
                    complete this process for each security token you would like to trade.
                  </Trans>
                </div>
              </>
            }
          />
        )} */}
      </NoVaultTitle>

      {userHaveValidAccount && (
        <>
          <VaultStatusDescription style={{ order: statuses.includes(AccreditationStatusEnum.DECLINED) ? 3 : 2 }}>
            <TYPE.body1>{getStatusMessage(accreditationRequest, symbolText, platform)}</TYPE.body1>
          </VaultStatusDescription>

          {(custodianStatus || brokerDealerStatus) && (
            <AccreditationStatus
              message={message}
              custodianStatus={custodianStatus}
              brokerDealerStatus={brokerDealerStatus}
            />
          )}
        </>
      )}
      {userHaveValidAccount ? (
        <RowCenter style={{ order: 4 }}>
          {!account && (
            <PinnedContentButton
              style={{ marginTop: '28px', padding: '16px 24px' }}
              onClick={toggleWalletModal}
              disabled={!!account}
              data-testid="connect-wallet-in-vault"
            >
              <Trans>Connect Wallet</Trans>
            </PinnedContentButton>
          )}

          {Boolean(account && !PENDING_ACCREDITATION_STATUSES.some((status) => statuses.includes(status))) && (
            <PinnedContentButton
              style={{ marginTop: '28px', padding: '16px 24px' }}
              data-testid="pass-kyc-and-accreditation"
              onClick={toggleChooseBrokerDealerModal}
            >
              {statuses.some((status) => !status) && <Trans>Pass KYC & accreditation</Trans>}
              {ERROR_ACCREDITATION_STATUSES.some((status) => statuses.includes(status)) && (
                <Trans>Retry pass accreditation</Trans>
              )}
            </PinnedContentButton>
          )}
          <ChooseBrokerDealerPopup tokenId={tokenId} currencyId={currencyId} symbolText={symbolText} />
        </RowCenter>
      ) : (
        <VaultStatusDescription style={{ order: 2 }}>
          <TYPE.title6>
            <Trans>This Security Token is not available for your KYC type</Trans>
          </TYPE.title6>
        </VaultStatusDescription>
      )}
    </NoVaultWrapper>
  )
}
