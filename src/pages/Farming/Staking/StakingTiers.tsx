import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder, ButtonIXSGradient, ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import AddStakingModal from 'components/earn/AddStakingModal'
import IXSUnstakeModal from 'components/earn/IXSUnstakeModal'
import ManageRewardModal from 'components/earn/ManageRewardModal'
import { RowBetween, RowCenter } from 'components/Row'
import { TextRow } from 'components/TextRow/TextRow'
import { MouseoverTooltip } from 'components/Tooltip'
import { IXS_ADDRESS, IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TextGradient, TYPE } from 'theme'
import Loader from '../../../components/Loader'
import { ButtonRow, StackingPositionCard } from '../styleds'
import { StakingStatus } from 'state/stake/reducer'
import { StakingTierCard } from './StakingTierCard'
import { Box } from 'rebass'
import { useFetchStakingAPY } from 'state/stake/hooks'

export const StakingTiers = ({ stakingStatus }: { stakingStatus: StakingStatus }) => {
  const toggleManage = useToggleModal(ApplicationModal.MANAGE_REWARD)
  const toggleAddStaking = useToggleModal(ApplicationModal.ADD_STAKE)
  const toggleUnstake = useToggleModal(ApplicationModal.UNSTAKE)
  const { account, chainId } = useActiveWeb3React()
  const governanceCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const governanceBalance = useCurrencyBalance(account ?? undefined, governanceCurrency ?? undefined)
  const IXSCurrency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSBalance = useCurrencyBalance(account ?? undefined, IXSCurrency ?? undefined)
  // const fethcAPY = useFetchStakingAPY()

  // useEffect(() => {
  //   fethcAPY()
  // }, [account])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <RowBetween>
        <StakingTierCard period="1 Week" APY={5} />
        <StakingTierCard period="1 Month" APY={18} />
        <StakingTierCard period="2 Months" APY={44} />
        <StakingTierCard period="3 Months" APY={88} />
      </RowBetween>
      <RowCenter marginTop={21}>
        <TYPE.title7 color="#edceff9e">
          <Trans>You’ll have 1 IXSGov for each 1 staked IXS.</Trans>
        </TYPE.title7>
      </RowCenter>
    </div>
  )
}
