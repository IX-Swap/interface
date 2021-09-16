import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState, useEffect } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CloseIcon, TYPE } from 'theme'
import Row, { RowBetween } from 'components/Row'
import { StakeModalTop } from 'components/earn/styled'
import { useIncreaseIXSGovAllowance, useUnstakeFrom, useUnstakingState } from 'state/stake/unstake/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { StakeInfoContainer, EllipsedText, ModalBottom } from '../style'
import { IStaking, periodsInDays } from 'constants/stakingPeriods'
import styled from 'styled-components'

interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
}

function formatAmount(amount: number): string {
  return amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

export function FullUnstake({ onDismiss, stake }: UnstakingModalProps) {
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const [isEnoughAllowance, setIsEnoughAllowance] = useState(true)
  const [error, setError] = useState('')
  const { chainId, account } = useActiveWeb3React()
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const { IXSGovAllowanceAmount, isApprovingIXSGov, isUnstaking } = useUnstakingState()
  const unstake = useUnstakeFrom(stake.period)
  const increaseAllowance = useIncreaseIXSGovAllowance()

  useEffect(() => {
    if (!isEnoughIXSGov()) {
      setError('Not Enough IXSGov')
    }
  }, [])

  useEffect(() => {
    if (!IXSGovAllowanceAmount) return
    if (parseFloat(IXSGovAllowanceAmount) >= parseFloat(stakeAmount)) {
      setIsEnoughAllowance(true)
    } else {
      setIsEnoughAllowance(false)
    }
  }, [IXSGovAllowanceAmount, stakeAmount])

  const wrappedOnDismiss = useCallback(() => {
    if (isUnstaking || isApprovingIXSGov) {
      return
    }
    onDismiss()
  }, [onDismiss])

  function isEnoughIXSGov(): boolean {
    if (!IXSGovBalance) return false
    return parseFloat(IXSGovBalance.toSignificant(5)) >= stake?.stakeAmount
  }

  async function onUnstake() {
    unstake(stake)
  }

  async function onApprove() {
    increaseAllowance(stakeAmount)
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
        {!isEnoughIXSGov() && (
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
                  {stakeAmount}&nbsp;IXSGov ({IXSGovBalance?.toSignificant(5)} <Trans>available</Trans>)
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
                <div>{stake.reward * 0.1}&nbsp;IXS</div>
              </EllipsedText>
            }
          />
          <TextRow
            textLeft={t`Rewards to be vested (10% weekly)`}
            textRight={
              <EllipsedText>
                <div>{stake.reward * 0.9}&nbsp;IXS</div>
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
            disabled={isEnoughAllowance || isApprovingIXSGov || Boolean(error)}
            onClick={onApprove}
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
            disabled={!isEnoughAllowance || isApprovingIXSGov || Boolean(error)}
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
