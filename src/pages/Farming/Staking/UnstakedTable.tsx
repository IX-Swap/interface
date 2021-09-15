import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Table } from 'components/Table'
import { MouseoverTooltip } from 'components/Tooltip'
import dayjs from 'dayjs'
import React from 'react'
import { Box } from 'rebass'
import { useStakingState } from 'state/stake/hooks'
import { unixTimeToFormat } from 'utils/time'
import { Container, NoData, RewardsBodyRow, StyledHeaderRow } from './style'

const dateFormat = 'MMM D, YYYY HH:mm:ss'

const Header = () => {
  return (
    <StyledHeaderRow>
      <div className="header-label">
        <Trans>Date of unstake</Trans>
      </div>
      <div>
        <div className="header-label">
          <Trans>APY</Trans>
        </div>
      </div>
      <div className="header-label">
        <Trans>Amount</Trans>
      </div>
      <div>
        <div className="header-label">
          <Trans>Total Rewards</Trans>
        </div>
        <MouseoverTooltip style={{ whiteSpace: 'pre-line', textAlign: 'center' }} text={t``}>
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </div>
      <div>
        <div className="header-label">
          <Trans>Rewards in vesting</Trans>
        </div>
        <MouseoverTooltip style={{ whiteSpace: 'pre-line', textAlign: 'center' }} text={t``}>
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </div>

      <div className="header-label">
        <Trans>Claimable Rewards</Trans>
      </div>
    </StyledHeaderRow>
  )
}

const Body = () => {
  const { rewards } = useStakingState()

  return (
    <>
      {rewards?.map(({ start, end, amount, claimed, cliff, segments }) => (
        <RewardsBodyRow key={start}>
          <div>{unixTimeToFormat({ time: start, format: dateFormat })}</div>
          <div>{unixTimeToFormat({ time: end, format: dateFormat })}</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </RewardsBodyRow>
      ))}
    </>
  )
}
export const UnstakedTable = () => {
  const { rewards, rewardsLoading } = useStakingState()

  function showTableData() {
    if (rewardsLoading) {
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
