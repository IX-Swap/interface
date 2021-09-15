import { CurrencyAmount } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Table } from 'components/Table'
import { MouseoverTooltip } from 'components/Tooltip'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import React from 'react'
import { Box } from 'rebass'
import { useStakingState } from 'state/stake/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { getNextPayoutTime, unixTimeToFormat } from 'utils/time'
import { Container, NoData, RewardsBodyRow, RewardsHeaderRow } from './style'
import { formatAmount } from './utils'

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
  const { rewards, payouts } = useStakingState()
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  return (
    <>
      {rewards?.map(({ start, end, amount, claimed, cliff, segments }, index) => {
        const nextPayoutTime = getNextPayoutTime({ payouts: payouts[index] })
        return (
          <RewardsBodyRow key={Number(start)}>
            <div>
              <Column>
                <div>{unixTimeToFormat({ time: start, format: shortDate })}</div>
                <div>{unixTimeToFormat({ time: end, format: shortDate })}</div>
              </Column>
            </div>
            <div>{nextPayoutTime ? unixTimeToFormat({ time: nextPayoutTime[0], format: longDate }) : '-'}</div>
            {currency && <div>{formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, amount), 10)}</div>}
            <div>vesting</div>
            {currency && <div>{formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, claimed), 10)}</div>}
            <div>Claimable</div>
            <div></div>
          </RewardsBodyRow>
        )
      })}
    </>
  )
}
export const UnstakedTable = () => {
  const { rewards, rewardsLoading, payoutsLoading } = useStakingState()

  function showTableData() {
    if (rewardsLoading || payoutsLoading) {
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
