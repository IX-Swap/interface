import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Column from 'components/Column'
import Row, { RowBetween } from 'components/Row'
import { StakingInputPercentage } from 'components/earn/StakingInputPercentage'
import { ModalBottomWrapper, ModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { useDerivedIXSStakeInfo } from 'state/stake/hooks'
import { useLiquidityRouterContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useStakingState } from 'state/stake/hooks'
import { Currency, CurrencyAmount, Percent } from '@ixswap1/sdk-core'
import { tryParseAmount } from 'state/swap/helpers'

interface UnstakingModalProps {
  onDismiss: () => void
  stakeAmount: string
}

export function UnstakeModal({ onDismiss, stakeAmount }: UnstakingModalProps) {
  const isOpen = useModalOpen(ApplicationModal.UNSTAKE_IXS)
  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const maxAmountInput = undefined
  const error = ''
  const { library, chainId, account } = useActiveWeb3React()
  // track and parse user input
  const router = useLiquidityRouterContract()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, IXS_ADDRESS[chainId ?? 1])
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const { IXSBalance } = useStakingState()
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)

  const wrappedOnDismiss = useCallback(() => {
    onDismiss()
    setTypedValue('')
  }, [onDismiss])

  async function onStake() {
    console.log('STAKE')
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <StakeModalTop>
            <RowBetween>
              <TYPE.title5>
                <Trans>Unstake</Trans>
              </TYPE.title5>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <StakingInputPercentage
              {...{
                fieldTitle: t`Amount of IXS to unstake`,
                maxAvailable: stakeIXSCurrencyAmount,
                typedValue,
                onUserInput,
                error,
                currency,
                parsedAmount,
              }}
            />
          </StakeModalTop>
          <ModalBottomWrapper>
            <Column style={{ gap: '5px' }}>
              <TextRow textLeft={t`Reward payout interval`} textRight={t`Twice a week`} />
              <TextRow textLeft={t`Yearly rewards`} textRight={`10%`} />
              <TextRow textLeft={t`Type`} textRight={`On-chain`} />
            </Column>
            <Row style={{ marginTop: '43px' }}>
              {true && (
                <ButtonIXSWide data-testid="approve-staking" disabled={Boolean(error)}>
                  {false ? (
                    <Dots>
                      <Trans>Approving IXS</Trans>
                    </Dots>
                  ) : (
                    <>{<Trans>Approve IXS</Trans>}</>
                  )}
                </ButtonIXSWide>
              )}
              {false && (
                <ButtonIXSWide data-testid="stake-button" disabled={Boolean(error)} onClick={onStake}>
                  <>{<Trans>Stake</Trans>}</>
                </ButtonIXSWide>
              )}
            </Row>
          </ModalBottomWrapper>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
