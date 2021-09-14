import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { Table, BodyRow, HeaderRow } from 'components/Table'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Box } from 'rebass'
import { useStakingState } from 'state/stake/hooks'
import { dateFormatter } from 'state/stake/reducer'
import { PeriodsEnum, IStaking } from 'constants/stakingPeriods'
import Row from 'components/Row'
import Column from 'components/Column'
import { ReactComponent as LockIcon } from 'assets/images/lock.svg'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { ButtonIXSGradient } from 'components/Button'
import { useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { UnstakeModal } from './Unstaking/UnstakeModal'

import { TYPE } from 'theme'

let activeStake: IStaking

function formatAmount(amount: number): string {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

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
  const toggleUnstakeModal = useToggleModal(ApplicationModal.UNSTAKE_IXS)

  useEffect(() => {
    console.log('Stakings: ', stakings)
  }, [stakings])

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
      {stakings?.map((stake) => (
        <StyledBodyRow key={stake.startDateUnix}>
          <Tier>
            <span className="digit">{getPeriodDigit(stake.period)}</span>&nbsp;
            {getPeriodString(stake.period).toUpperCase()}
          </Tier>
          <div>{stake.apy}%</div>
          <Column>
            <Row>
              {formatDate(stake.startDateUnix)} <MutedText>{getDateFullTime(stake.startDateUnix)}</MutedText>
            </Row>
            <Row>
              {formatDate(stake.endDateUnix)} <MutedText>{getDateFullTime(stake.endDateUnix)}</MutedText>
            </Row>
          </Column>
          <div>{getLockPeriod(stake.period)}</div>
          <div>{formatAmount(stake.stakeAmount)} IXS</div>
          <div>{formatAmount(stake.distributeAmount)} IXSgov</div>
          <div className="rewards">{formatAmount(stake.reward)} IXS</div>
          {true ? (
            <UnstakeButton
              onClick={() => {
                activeStake = stake
                toggleUnstakeModal()
              }}
            >
              <TYPE.subHeader1>
                <Trans>Unstake</Trans>
              </TYPE.subHeader1>
            </UnstakeButton>
          ) : (
            <LockedTillColumn>
              <Row>
                <LockIcon className="lock-icon" />
                <Trans>Locked till</Trans>
              </Row>
              <Row>
                {formatDate(stake.lockedTillUnix)} {getDateShortTime(stake.lockedTillUnix)}
              </Row>
            </LockedTillColumn>
          )}
        </StyledBodyRow>
      ))}
    </>
  )
}

export const MyStakingsTable = () => {
  const { stakings, stakingsLoading } = useStakingState()
  const toggleUnstakeModal = useToggleModal(ApplicationModal.UNSTAKE_IXS)

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

  return (
    <>
      <Box style={{ width: '100%' }}>
        <Box marginBottom={22}>
          <TYPE.title5>
            <Trans>My stakes</Trans>
          </TYPE.title5>
        </Box>
        {showTableData()}
      </Box>
      <UnstakeModal onDismiss={toggleUnstakeModal} stake={activeStake} />
    </>
  )
}

const NoData = styled.div`
  margin-top: 39px
  font-weight: 400;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
  background-color: #2c254a80;
  border-radius: 30px;
  padding: 36px;
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

const UnstakeButton = styled(ButtonIXSGradient)`
  align-self: center;
  padding: 16px 26px;
`
