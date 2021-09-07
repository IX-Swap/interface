import React from 'react'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
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

export const TokenCardWithStaking = () => {
  const toggleManage = useToggleModal(ApplicationModal.MANAGE_REWARD)
  const toggleAddStaking = useToggleModal(ApplicationModal.ADD_STAKE)
  const toggleUnstake = useToggleModal(ApplicationModal.UNSTAKE)
  const { account, chainId } = useActiveWeb3React()
  const governanceCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const governanceBalance = useCurrencyBalance(account ?? undefined, governanceCurrency ?? undefined)
  const IXSCurrency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSBalance = useCurrencyBalance(account ?? undefined, IXSCurrency ?? undefined)
  return (
    <>
      <ManageRewardModal onDismiss={toggleManage} />
      <AddStakingModal onDismiss={toggleAddStaking} />
      <IXSUnstakeModal onDismiss={toggleUnstake} />
      <StackingPositionCard>
        <RowCenter>
          <IconWrapper size={75}>
            <img src={IXSToken} />
          </IconWrapper>
        </RowCenter>
        <RowCenter marginTop={18}>
          <TYPE.body5>
            <Trans>Stacked IXS</Trans>
          </TYPE.body5>
        </RowCenter>
        <Column style={{ gap: '10px' }}>
          <TextRow textLeft={<Trans>Start stake</Trans>} textRight={'05.06.2021'} />
          <TextRow textLeft={<Trans>Annual Return</Trans>} textRight={'10%'} />
          <TextRow
            textLeft={<Trans>Total rewards</Trans>}
            textRight={
              <RowBetween style={{ gap: '5px' }}>
                {IXSBalance ? <>{`${IXSBalance?.toSignificant(6)} ${IXSCurrency?.symbol}`}</> : <Loader />}
                <TextGradient style={{ cursor: 'pointer' }} onClick={toggleManage}>
                  <Trans>(manage)</Trans>
                </TextGradient>
              </RowBetween>
            }
          />
          <TextRow
            textLeft={<Trans>Total balance</Trans>}
            textRight={IXSBalance ? <>{`${IXSBalance?.toSignificant(6)} ${IXSCurrency?.symbol}`}</> : <Loader />}
          />
          <TextRow
            textLeft={
              <MouseoverTooltip text={t`Governance tokens give you the right to vote`}>
                <RowBetween>
                  <Trans>Governance tokens</Trans>
                  <IconWrapper size={20} style={{ transform: 'rotate(180deg)', marginLeft: '7px' }}>
                    <InfoIcon />
                  </IconWrapper>
                </RowBetween>
              </MouseoverTooltip>
            }
            textRight={
              governanceBalance ? (
                <>{`${governanceBalance?.toSignificant(6)} ${governanceCurrency?.symbol}`}</>
              ) : (
                <Loader />
              )
            }
          />
        </Column>
        <ButtonRow>
          <ButtonGradientBorder style={{ width: '172px' }} onClick={toggleUnstake}>
            Unstake
          </ButtonGradientBorder>
          <ButtonIXSGradient style={{ textTransform: 'unset', width: '172px' }} onClick={toggleAddStaking}>
            Add asset
          </ButtonIXSGradient>
        </ButtonRow>
      </StackingPositionCard>
    </>
  )
}
