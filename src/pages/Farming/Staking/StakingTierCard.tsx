import React from 'react'
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
import { StakingTierCardWrapper } from './style'
import { Box } from 'rebass'

export const StakingTierCard = ({ period, APY }: { period: string; APY: number }) => {
  const toggleManage = useToggleModal(ApplicationModal.MANAGE_REWARD)
  const toggleAddStaking = useToggleModal(ApplicationModal.ADD_STAKE)
  const toggleUnstake = useToggleModal(ApplicationModal.UNSTAKE)
  const { account, chainId } = useActiveWeb3React()
  const governanceCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const governanceBalance = useCurrencyBalance(account ?? undefined, governanceCurrency ?? undefined)
  const IXSCurrency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSBalance = useCurrencyBalance(account ?? undefined, IXSCurrency ?? undefined)
  return (
    <StakingTierCardWrapper>
      <RowCenter style={{ marginTop: '8px' }}>
        <img src={IXSToken} />
      </RowCenter>
      <RowCenter marginTop={18}>
        <TYPE.title5 style={{ textTransform: 'uppercase' }}>
          <Trans>{period}</Trans>
        </TYPE.title5>
      </RowCenter>
      <RowCenter marginTop={18}>
        <TYPE.description7 style={{ textTransform: 'uppercase' }}>
          <Trans>APY</Trans>
        </TYPE.description7>
      </RowCenter>
      <RowCenter>
        <TYPE.main0>{APY}%</TYPE.main0>
      </RowCenter>
      <RowCenter marginTop={15}>
        <TYPE.body5 fontWeight={400}>
          <Trans>Unlimited</Trans>
        </TYPE.body5>
        <MouseoverTooltip
          text={t`Overall limit for all stakers for this tier is 
                  2 000 000 IXS.

                  Overall staked for now: 234 747 IXS

                  Available for staking: 
                  1 776 399/2 000 000.

                  Lock period means the time you won’t be able to unstake your IXS fully or partially. Please carefully consider the risks involved.

                  You will be able to redeem your staked IXS fully or partially after lock period. `}
        >
          <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '12px' }}>
            <InfoIcon />
          </IconWrapper>
        </MouseoverTooltip>
      </RowCenter>
      <ButtonIXSWide onClick={toggleAddStaking} style={{ marginBottom: '26px', marginTop: 'auto' }}>
        Stake
      </ButtonIXSWide>
      <RowCenter>
        <TYPE.description3 fontWeight={400} opacity="0.5">
          <Trans>
            Left to fill <span style={{ fontWeight: 700 }}>33389</span> coins
          </Trans>
        </TYPE.description3>
      </RowCenter>
    </StakingTierCardWrapper>
  )
}
