import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { Table, BodyRow, HeaderRow } from 'components/Table'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Box } from 'rebass'
import { useGetStakings, useStakingState } from 'state/stake/hooks'
import { dateFormatter } from 'state/stake/reducer'
import { PeriodsEnum } from 'constants/stakingPeriods'
import Row from 'components/Row'
import Column from 'components/Column'
import { ReactComponent as LockIcon } from 'assets/images/lock.svg'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'

import { TYPE } from 'theme'

const Header = () => {
  return (
    <StyledHeaderRow>
      <div className="header-label">
        <Trans>Tier</Trans>
      </div>
      <div>
        <div className="header-label">
          <Trans>APY</Trans>
        </div>
        <MouseoverTooltip
          style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
          text={t`Full amount of APY is applied only to amount of IXS staked till the end of staking period.`}
        >
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </div>
      <div className="header-label">
        <Trans>Period of staking</Trans>
      </div>
      <div className="header-label">
        <Trans>Lock Period</Trans>
      </div>
      <div className="header-label">
        <Trans>Amount</Trans>
      </div>
      <div className="header-label">
        <Trans>Distributed</Trans>
      </div>
      <div>
        <div className="header-label">
          <Trans>Estimated Rewards</Trans>
        </div>
        <MouseoverTooltip
          style={{ whiteSpace: 'pre-line', textAlign: 'center' }}
          text={t`Estimated rewards are based on assumption that your staked amount will be fully kept for the whole period of staking. In this case maximum APY will be applied 
                  ${'' ?? ''}
                  If you partially or fully unstake your IXS before the end date - 5% APY will be applied to unstaked amount. `}
        >
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </div>
    </StyledHeaderRow>
  )
}

const Body = () => {
  const { stakings } = useStakingState()

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

  function formatDate(dateUnix: number) {
    return dateFormatter.format(new Date(dateUnix * 1000))
  }

  function getDateShortTime(dateUnix: number) {
    return new Date(dateUnix * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  function getDateFullTime(dateUnix: number) {
    return new Date(dateUnix * 1000).toLocaleTimeString('en-GB')
  }

  return (
    <>
      {stakings?.map(
        ({ period, startDateUnix, endDateUnix, lockedTillUnix, apy, stakeAmount, distributeAmount, reward }) => (
          <StyledBodyRow key={startDateUnix}>
            <Tier>
              <span className="digit">{getPeriodDigit(period)}</span>&nbsp;{getPeriodString(period).toUpperCase()}
            </Tier>
            <div>{apy}%</div>
            <Column>
              <Row>
                {formatDate(startDateUnix)} <MutedText>{getDateFullTime(startDateUnix)}</MutedText>
              </Row>
              <Row>
                {formatDate(endDateUnix)} <MutedText>{getDateFullTime(endDateUnix)}</MutedText>
              </Row>
            </Column>
            <div>{getLockPeriod(period)}</div>
            <div>{formatAmount(stakeAmount)} IXS</div>
            <div>{formatAmount(distributeAmount)} IXSgov</div>
            <div className="rewards">{formatAmount(reward)} IXS</div>
            <LockedTillColumn>
              <Row>
                <LockIcon className="lock-icon" />
                <Trans>Locked till</Trans>
              </Row>
              <Row>
                {formatDate(lockedTillUnix)} {getDateShortTime(lockedTillUnix)}
              </Row>
            </LockedTillColumn>
          </StyledBodyRow>
        )
      )}
    </>
  )
}

export const MyStakingsTable = () => {
  const getStakings = useGetStakings()
  const { stakings, hasStakedSuccessfully } = useStakingState()

  useEffect(() => {
    getStakings()
    console.log('stakings: ', stakings)
  }, [getStakings, hasStakedSuccessfully])

  return (
    <Box style={{ width: '100%' }}>
      <Box marginBottom={22}>
        <TYPE.title5>
          <Trans>My stakes</Trans>
        </TYPE.title5>
      </Box>
      {false && (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      )}
      {stakings.length === 0 ? (
        <NoData>
          <Trans>You have no ongoing stakings at the moment</Trans>
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
  margin-top: 39px
  font-weight: 400;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
  background-color: #2c254a80;
  border-radius: 30px;
  padding: 36px;
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
  grid-template-columns: 160px 100px 190px 160px 160px 180px auto;
  min-width: 1270px;

  .header-label {
    color: ${({ theme: { text2 } }) => text2};
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    opacity: 0.5;
  }
`

const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 160px 100px 190px 160px 160px 180px 180px auto;
  min-width: 1270px;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;

  .rewards {
    color: #9df9b1;
  }
`
const MutedText = styled.span`
  color: ${({ theme: { text2 } }) => text2};
  opacity: 0.5;
  padding-left: 0.5em;
`

const LockedTillColumn = styled(Column)`
  color: ${({ theme: { text2 } }) => text2};
  opacity: 0.5;
  font-size: 12px;
  line-height: 18px;

  .lock-icon {
    margin-right: 0.5em;
    margin-bottom: 4px;
  }
`
