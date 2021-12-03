import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/info-filled.svg'
import { ReactComponent as LockIcon } from 'assets/images/lock.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import Row from 'components/Row'
import { Table } from 'components/Table'
import { MouseoverTooltip } from 'components/Tooltip'
import { IStaking } from 'constants/stakingPeriods'
import useIXSCurrency from 'hooks/useIXSCurrency'
import React from 'react'
import { Box } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { useStakingState } from 'state/stake/hooks'
import { TYPE } from 'theme'
import { formatAmount } from 'utils/formatCurrencyAmount'
import { formatDate, getDateFullTime, getDateShortTime } from 'utils/time'
import {
  Container,
  LoaderContainer,
  LockedTillColumn,
  MutedText,
  NoData,
  StyledBodyRow,
  StyledHeaderRow,
  Tier,
  UnstakeButton,
} from './style'
import { UnstakeModal } from './Unstaking/UnstakeModal'
import { getLockPeriod, getPeriodDigit, getPeriodString } from './utils'

let activeStake: IStaking

const Header = () => {
  const currency = useIXSCurrency()
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
          text={t`Full amount of APY is applied only to amount of ${currency?.symbol} staked till the end of staking period.`}
        >
          <IconWrapper size={20} style={{ marginLeft: '12px' }}>
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
                  If you partially or fully unstake your ${
                    currency?.symbol
                  } before the end date - 5% APY will be applied to unstaked amount. `}
        >
          <IconWrapper size={20} style={{ marginLeft: '12px' }}>
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
  const currency = useIXSCurrency()
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
          <div>
            {formatAmount(stake.stakeAmount)} {currency?.symbol}
          </div>
          <div>{formatAmount(stake.distributeAmount)} IXSgov</div>
          <div className="rewards">
            {formatAmount(stake?.totalReward)} {currency?.symbol}
          </div>
          {stake.canUnstake ? (
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
      return (
        <LoaderContainer>
          <LoaderThin size={96} />
        </LoaderContainer>
      )
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
      <Box style={{ width: '100%' }}>{showTableData()}</Box>
      <UnstakeModal onDismiss={toggleUnstakeModal} stake={activeStake} />
    </>
  )
}
