import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { Table, BodyRow, HeaderRow } from 'components/Table'
import { useAdminState, useGetKycList, useGetMe } from 'state/admin/hooks'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { shortenAddress } from 'utils'
import { Box } from 'rebass'
import { useGetStakings, useStakingState, useGetVestings } from 'state/stake/hooks'
import periods_lock_months, { PeriodsEnum } from 'constants/stakingPeriods'

import { TYPE } from 'theme'

const headerCells = [
  t`Tier`,
  t`APY`,
  t`Period of staking`,
  t`Lock Period`,
  t`Amount`,
  t`Distribute`,
  t`Estimated Rewards`,
]

const Header = () => {
  return (
    <StyledHeaderRow>
      {headerCells.map((cell) => (
        <div className="header-cell-label" key={cell}>
          {cell}
        </div>
      ))}
    </StyledHeaderRow>
  )
}

const Body = () => {
  const { stakings } = useStakingState()

  // const getVestings = useGetVestings()
  // useEffect(() => {
  //   getVestings()
  // })

  function formatAmount(amount: number) {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
  }

  function getPeriodDigit(period: PeriodsEnum) {
    if (period === PeriodsEnum.WEEK || period === PeriodsEnum.MONTH) {
      return 1
    } else if (period === PeriodsEnum.TWO_MONTHS) {
      return 2
    } else {
      return 3
    }
  }

  function getPeriodString(period: PeriodsEnum) {
    if (period === PeriodsEnum.WEEK) {
      return 'Week'
    } else if (period === PeriodsEnum.MONTH) {
      return 'Month'
    } else {
      return 'Months'
    }
  }

  function getLockPeriod(period: PeriodsEnum) {
    if (period === PeriodsEnum.WEEK) {
      return '1 Week'
    } else if (period === PeriodsEnum.MONTH || period === PeriodsEnum.TWO_MONTHS) {
      return '1 Month'
    } else {
      return '2 Months'
    }
  }

  return (
    <>
      {stakings?.map(({ period, startDateUnix, apy, stakeAmount, distributeAmount, reward }) => (
        <StyledBodyRow key={startDateUnix}>
          <Tier>
            <span className="digit">{getPeriodDigit(period)}</span>&nbsp;{getPeriodString(period).toUpperCase()}
          </Tier>
          <div>{apy}%</div>
          <div>date</div>
          <div>{getLockPeriod(period)}</div>
          <div>{formatAmount(stakeAmount)} IXS</div>
          <div>{formatAmount(distributeAmount)} IXSgov</div>
          <div className="rewards">{formatAmount(reward)} IXS</div>
          <div>Locked till</div>
        </StyledBodyRow>
      ))}
    </>
  )
}

export const MyStakingsTable = () => {
  const getStakings = useGetStakings()
  const { stakings, hasStakedSuccessfully } = useStakingState()

  useEffect(() => {
    getStakings()
  }, [getStakings, hasStakedSuccessfully])

  return (
    <Box style={{ width: '100%' }}>
      <Box marginBottom={22}>
        <TYPE.title5>
          <Trans>My ongoing stakings</Trans>
        </TYPE.title5>
      </Box>
      {false && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {stakings.length === 0 ? (
        <NoData>
          <Trans>You have no stakings yet</Trans>
        </NoData>
      ) : (
        <Container>
          <Table body={<Body />} header={<Header />} />
        </Container>
      )}
    </Box>
  )
}

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`

const NoData = styled.div`
  font-weight: 600;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
`

const Dash = styled.div`
  background-color: ${({ theme: { bg7 } }) => bg7};
  width: 21px;
  height: 3px;
  border-radius: 40px;
`

const Tier = styled.div`
  background: ${({ theme: { bgG3 } }) => bgG3};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  display: flex;
  align-items: flex-end !important;

  .digit {
    font-size: 32px;
    font-weight: 700;
    line-height: 37px;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 50px;
`

const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 160px 100px 190px 160px 200px 180px auto;
  min-width: 1270px;
  .header-cell-label {
    color: #edceff80;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 160px 100px 190px 160px 200px 180px 180px auto;
  min-width: 1270px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;

  .rewards {
    color: #9df9b1;
  }
`
