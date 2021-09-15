import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { TextRow } from 'components/TextRow/TextRow'
import { IXS_ADDRESS, IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useState, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Column from 'components/Column'
import Row, { RowBetween } from 'components/Row'
import { StakingInputPercentage } from 'components/earn/StakingInputPercentage'
import { ModalBottomWrapper, ModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import { useV2LiquidityTokenPermit } from 'hooks/useERC20Permit'
import { useDerivedIXSStakeInfo, useStakeFor, useCheckAllowance, useStakingState } from 'state/stake/hooks'
import {
  useIncreaseIXSGovAllowance,
  useUnstakeFrom,
  useCheckIXSGovAllowance,
  useUnstakingState,
} from 'state/stake/unstake/hooks'
import { useLiquidityRouterContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { Currency, CurrencyAmount, Percent } from '@ixswap1/sdk-core'
import { tryParseAmount } from 'state/swap/helpers'
import { StakeInfoContainer, EllipsedText, ModalBottom } from '../style'
import { IStaking, PeriodsEnum, periodsInDays, SECONDS_IN_DAY } from 'constants/stakingPeriods'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { MouseoverTooltip } from 'components/Tooltip'
import { IconWrapper } from 'components/AccountDetails/styleds'
import { ReactComponent as InfoIcon } from 'assets/images/attention.svg'
import { EarlyUnstake } from './EarlyUnstakeModalContent'
import { FullUnstake } from './FullUnstakeModalContent'

interface UnstakingModalProps {
  onDismiss: () => void
  stake: IStaking
}

function formatAmount(amount: number): string {
  return amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 })
}

function isEarlyUnstake(stake: IStaking): boolean {
  const unixNow = new Date().getTime() / 1000
  if (!stake) return false
  if (stake.period === PeriodsEnum.WEEK || stake.period === PeriodsEnum.MONTH) {
    return false
  } else if (unixNow < stake.endDateUnix) {
    return true
  }
  return false
}

export function UnstakeModal({ onDismiss, stake }: UnstakingModalProps) {
  const bIsEarlyUnstake = isEarlyUnstake(stake)
  const stakeAmount = formatAmount(stake?.stakeAmount)
  const isOpen = useModalOpen(ApplicationModal.UNSTAKE_IXS)
  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const maxAmountInput = undefined
  const error = ''
  const { library, chainId, account } = useActiveWeb3React()
  // track and parse user input
  const router = useLiquidityRouterContract()
  const { parsedAmount } = useDerivedIXSStakeInfo({ typedValue, currencyId: IXS_ADDRESS[chainId ?? 1] })
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const IXSGovBalance = useCurrencyBalance(account ?? undefined, IXSGovCurrency ?? undefined)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, IXS_ADDRESS[chainId ?? 1])
  const parsedAmountWrapped = parsedAmount?.wrapped
  const { signatureData, gatherPermitSignature } = useV2LiquidityTokenPermit(parsedAmountWrapped, router?.address)
  const { IXSBalance } = useStakingState()
  const stakeIXSCurrencyAmount = tryParseAmount(stakeAmount, currency)
  const { isApprovingIXSGov, isUnstaking, hasUnstakedSuccessfully } = useUnstakingState()
  const checkIXSGovAllowance = useCheckIXSGovAllowance()

  useEffect(() => {
    if (isOpen) {
      checkIXSGovAllowance()
    }
  }, [isOpen])

  useEffect(() => {
    if (hasUnstakedSuccessfully) {
      wrappedOnDismiss()
    }
  }, [hasUnstakedSuccessfully])

  const wrappedOnDismiss = useCallback(() => {
    if (isUnstaking || isApprovingIXSGov) {
      return
    }
    onDismiss()
    setTypedValue('')
  }, [onDismiss])

  async function onStake() {
    console.log('STAKE')
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={wrappedOnDismiss} scrollable>
      <ModalBlurWrapper>
        <ModalContentWrapper>
          {bIsEarlyUnstake ? (
            <EarlyUnstake onDismiss={onDismiss} stake={stake} />
          ) : (
            <FullUnstake onDismiss={onDismiss} stake={stake} />
          )}
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
