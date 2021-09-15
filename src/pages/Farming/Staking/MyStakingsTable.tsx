import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { ReactComponent as LockIcon } from 'assets/images/lock.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import Row from 'components/Row'
import { Table } from 'components/Table'
import { MouseoverTooltip } from 'components/Tooltip'
import React from 'react'
import { Box } from 'rebass'
import { useStakingState } from 'state/stake/hooks'
import { Container, LockedTillColumn, MutedText, NoData, StyledBodyRow, StyledHeaderRow, Tier } from './style'
import {
  formatAmount,
  formatDate,
  getDateFullTime,
  getDateShortTime,
  getLockPeriod,
  getPeriodDigit,
  getPeriodString,
} from './utils'

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
  const { stakings, stakingsLoading } = useStakingState()

  function showTableData() {
    if (stakingsLoading) {
      return <LoaderThin size={96} />
    } else if (stakings.length === 0) {
      return (
        <NoData>
          <Trans>You have no ongoing stakings at the moment</Trans>
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
