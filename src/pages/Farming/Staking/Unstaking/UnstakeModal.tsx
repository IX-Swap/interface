import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS, IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
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
import { StakeInfoContainer, EllipsedText, ModalBottom } from '../style'

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
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
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
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <StakeModalTop style={{ paddingBottom: '30px' }}>
            <RowBetween>
              <TYPE.title5>
                <Trans>Unstake</Trans>
              </TYPE.title5>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <Row marginTop={20} marginBottom={10}>
              <TYPE.title6 color={'bg14'} style={{ textTransform: 'uppercase' }}>
                <Trans>Warning:</Trans>&nbsp;
              </TYPE.title6>
              <TYPE.body color={'bg14'}>
                <Trans>Your APY will be 5% in case of an early unstake</Trans>
              </TYPE.body>
            </Row>
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
            <Row marginTop={37}>
              <TYPE.body3 style={{ opacity: '0.5' }}>
                <Trans>When your assets have been unstaked they will be transferred to your Metamask</Trans>
              </TYPE.body3>
            </Row>
          </StakeModalTop>
          <ModalBottom>
            <StakeInfoContainer>
              <TextRow
                textLeft={t`IXSGov to return`}
                textRight={
                  <EllipsedText>
                    <div>{typedValue ? typedValue : 0}</div>&nbsp;IXSGov ({IXSGovBalance?.toSignificant(5)}{' '}
                    <Trans>available</Trans>)
                  </EllipsedText>
                }
              />
              <TextRow textLeft={t`APY`} textRight="5%" />
              <TextRow textLeft={t`Total rewards `} textRight={`${0}%`} />
              <TextRow
                textLeft={t`Instant reward payout today`}
                textRight={
                  <EllipsedText>
                    <div>{typedValue ? typedValue : 0}</div>&nbsp;IXS
                  </EllipsedText>
                }
              />
              <TextRow textLeft={t`Rewards to be vested (10% weekly)`} textRight={0} />
              <TextRow textLeft={t`Passed staking period`} textRight={0} />
            </StakeInfoContainer>
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
          </ModalBottom>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
