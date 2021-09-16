import { CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Table } from 'components/Table'
import { IXS_ADDRESS } from 'constants/addresses'
import { BIG_INT_ZERO } from 'constants/misc'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import JSBI from 'jsbi'
import React, { useCallback } from 'react'
import { Box } from 'rebass'
import { useClaimRewards, useStakingState } from 'state/stake/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { getNextPayoutTime, unixTimeToFormat } from 'utils/time'
import { ClaimButton, Container, NoData, RewardsBodyRow, RewardsHeaderRow } from './style'

const longDate = 'MMM D, YYYY HH:mm'
const shortDate = 'MMM D, YYYY'

const Header = () => {
  return (
    <RewardsHeaderRow>
      <div className="header-label">
        <Trans>Period of vesting</Trans>
      </div>

      <div className="header-label">
        <Trans>Next rewards on</Trans>
      </div>

      <div className="header-label">
        <Trans>Total rewards</Trans>
      </div>

      <div className="header-label">
        <Trans>Rewards in vesting</Trans>
      </div>

      <div className="header-label">
        <Trans>Claimed rewards</Trans>
      </div>

      <div className="header-label">
        <Trans>Claimable Rewards</Trans>
      </div>
    </RewardsHeaderRow>
  )
}

const Body = () => {
  const { rewards, payouts, claims } = useStakingState()
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const formatCurrency = useCallback(
    (amount, digits = 10) =>
      currency ? formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, amount), digits) : '-',
    [currency]
  )
  const isAboveZero = useCallback(
    (amount) =>
      currency &&
      JSBI.greaterThan(CurrencyAmount.fromRawAmount(currency, amount).quotient ?? BIG_INT_ZERO, BIG_INT_ZERO),
    [currency]
  )
  const getVestingSum = useCallback(({ total, claimable, claimed }) => {
    const deducted = JSBI.add(JSBI.BigInt(claimable), JSBI.BigInt(claimed))
    const result = JSBI.subtract(JSBI.BigInt(total), deducted)
    return result
  }, [])
  const claimRewards = useClaimRewards()
  return (
    <>
      {rewards?.map(({ start, end, amount, claimed }, index) => {
        const nextPayoutTime = getNextPayoutTime({ payouts: payouts[index] })
        const claimPositive = claims[index] && isAboveZero(claims[index])
        const vestingSum = getVestingSum({ total: amount, claimed, claimable: claims[index] })
        return (
          <RewardsBodyRow key={Number(start)}>
            <div>
              <Column>
                <div>{unixTimeToFormat({ time: start, format: shortDate })}</div>
                <div>{unixTimeToFormat({ time: end, format: shortDate })}</div>
              </Column>
            </div>
            <div>{nextPayoutTime ? unixTimeToFormat({ time: nextPayoutTime[0], format: longDate }) : '-'}</div>
            <div>{formatCurrency(amount, 5)}&nbsp;IXS</div>
            <div>{formatCurrency(vestingSum, 5)}&nbsp;IXS</div>
            <div>{formatCurrency(claimed)}&nbsp;IXS</div>
            <div className={claimPositive ? 'rewards' : ''}>{formatCurrency(claims[index])}&nbsp;IXS</div>
            <div>
              {claimPositive && (
                <ClaimButton onClick={() => claimRewards(index)}>
                  <Trans>Claim</Trans>
                </ClaimButton>
              )}
            </div>
          </RewardsBodyRow>
        )
      })}
    </>
  )
}
export const UnstakedTable = () => {
  const { rewards, rewardsLoading, payoutsLoading, claimLoading } = useStakingState()

  function showTableData() {
    if (rewardsLoading || payoutsLoading || claimLoading) {
      return <LoaderThin size={96} />
    } else if (rewards.length === 0) {
      return (
        <NoData>
          <Trans>You have no rewards at the moment</Trans>
        </NoData>
      )
    } else {
      return (
        <Container>
          <Table body={<Body />} header={<Header />} />
        </Container>
      )
    }
  }

  return <Box style={{ width: '100%' }}>{showTableData()}</Box>
}
