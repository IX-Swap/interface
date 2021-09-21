import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { StakeModalTop } from 'components/earn/styled'
import Row, { RowBetween } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { IStaking, periodsInDays } from 'constants/stakingPeriods'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useEffect, useState } from 'react'
import { useUnstakingState } from 'state/stake/unstake/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { CloseIcon, TYPE } from 'theme'
import { floorTo4Decimals } from 'utils/formatCurrencyAmount'
import { EllipsedText, ModalBottom, StakeInfoContainer } from '../style'
interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
  onUnstake: () => void
  onApprove: (amount?: string) => void
}

function formatAmount(amount: number): string {
  return amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

export function FullUnstake({ onDismiss, stake, onUnstake, onApprove }: UnstakingModalProps) {
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const [isEnoughAllowance, setIsEnoughAllowance] = useState(true)
  const [error, setError] = useState('')
  const { chainId, account } = useActiveWeb3React()
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const { IXSGovAllowanceAmount, isApprovingIXSGov, isUnstaking } = useUnstakingState()

  useEffect(() => {
    if (!IXSGovBalance) {
      setError('Please wait...')
      return
    } else if (!isEnoughIXSGov()) {
      setError('Not Enough IXSGov')
    } else {
      setError('')
    }
  }, [IXSGovBalance])

  useEffect(() => {
    if (!IXSGovAllowanceAmount) return
    if (parseFloat(IXSGovAllowanceAmount) >= parseFloat(stakeAmount)) {
      setIsEnoughAllowance(true)
    } else {
      setIsEnoughAllowance(false)
    }
  }, [IXSGovAllowanceAmount, stakeAmount])

  const wrappedOnDismiss = useCallback(() => {
    if (!isUnstaking && !isApprovingIXSGov) {
      onDismiss()
    }
  }, [onDismiss, isUnstaking, isApprovingIXSGov])

  function isEnoughIXSGov(): boolean {
    if (!IXSGovBalance) return false
    return parseFloat(IXSGovBalance.toSignificant(5)) >= stake?.stakeAmount
  }

  return (
    <>
      <StakeModalTop style={{ paddingBottom: '30px' }}>
        <RowBetween>
          <TYPE.title5>
            <Trans>Unstake</Trans>
          </TYPE.title5>
          <CloseIcon onClick={wrappedOnDismiss} />
        </RowBetween>
        <Row marginTop={20} marginBottom={10}>
          <IXSAmountToUnstake>{stakeAmount} IXS</IXSAmountToUnstake>
        </Row>
        {IXSGovBalance && !isEnoughIXSGov() && (
          <TYPE.description2 color={'bg14'}>
            <Trans>
              You don’t have enough IXSGov for unstake all available IXS ({stakeAmount} is available) 1 IXS = 1 IXGov
            </Trans>
          </TYPE.description2>
        )}
      </StakeModalTop>
      <ModalBottom>
        <StakeInfoContainer>
          <TextRow
            textLeft={t`IXSGov to return`}
            textRight={
              <EllipsedText>
                <div>
                  {stakeAmount}&nbsp;IXSGov ({IXSGovBalance?.toSignificant(4)} <Trans>available</Trans>)
                </div>
              </EllipsedText>
            }
          />
          <TextRow textLeft={t`APY`} textRight={`${stake.apy}%`} />
          <TextRow textLeft={t`Total rewards `} textRight={`${stake.reward} IXS`} />
          <TextRow
            textLeft={t`Instant reward payout today`}
            textRight={
              <EllipsedText>
                <div>{floorTo4Decimals(stake.reward * 0.1)}&nbsp;IXS</div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Rewards to be vested (10% weekly)`}
            textRight={
              <EllipsedText>
                <div>{floorTo4Decimals(stake.reward * 0.9)}&nbsp;IXS</div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Passed staking period`}
            textRight={
              <EllipsedText>
                <div>
                  {periodsInDays[stake.period]}&nbsp;<Trans>days (ended)</Trans>
                </div>
              </EllipsedText>
            }
          />
        </StakeInfoContainer>
        <Row style={{ marginTop: '43px' }}>
          <ButtonIXSWide
            data-testid="approve-ixsgov-button"
            disabled={isEnoughAllowance || isApprovingIXSGov || isUnstaking || Boolean(error)}
            onClick={() => onApprove()}
            style={{ marginRight: '14px' }}
          >
            {isApprovingIXSGov ? (
              <Dots>
                <Trans>Approving IXSGov</Trans>
              </Dots>
            ) : (
              <Trans>Approve IXSGov</Trans>
            )}
          </ButtonIXSWide>
          <ButtonIXSWide
            data-testid="unstake-button"
            disabled={!isEnoughAllowance || isApprovingIXSGov || isUnstaking || Boolean(error)}
            onClick={onUnstake}
          >
            {isUnstaking ? (
              <Dots>
                <Trans>Unstaking</Trans>
              </Dots>
            ) : (
              <>{error || <Trans>Unstake</Trans>}</>
            )}
          </ButtonIXSWide>
        </Row>
      </ModalBottom>
    </>
  )
}

const IXSAmountToUnstake = styled(Row)`
  font-size: 40px;
  font-weight: 600;
  line-height: 60px;
`
