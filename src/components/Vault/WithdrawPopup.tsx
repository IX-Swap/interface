import React, { useCallback, useState } from 'react'
import { Trans } from '@lingui/macro'

import { LoadingIndicator } from 'components/LoadingIndicator'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween } from 'components/Row'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWithdrawModalToggle } from 'state/application/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import { useWithdrawActionHandlers, useWithdrawState } from 'state/withdraw/hooks'
import { HideSmall, ModalBlurWrapper, ModalContentWrapper, ModalPadding } from 'theme'
import { SecCurrency } from 'types/secToken'

import { CloseIcon, TYPE } from '../../theme'
import { WithdrawError } from './WithDrawError'
import { WithdrawPending } from './WithdrawPending'
import { WithdrawRequestForm } from './WithdrawRequestForm'
import { WithdrawSuccess } from './WithDrawSuccess'
import { useActiveWeb3React } from 'hooks/web3'
import { findChainName } from 'utils/chains'

export enum WithdrawModalView {
  WITHDRAW_REQUEST,
  PENDING,
  SUCCESS,
  ERROR,
}
interface Props {
  currency?: SecCurrency
  token: any
}
export const WithdrawPopup = ({ currency, token }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.WITHDRAW)
  const { amount } = useWithdrawState()
  const { secTokens } = useUserSecTokens()
  const toggle = useWithdrawModalToggle()
  const [modalView, setModalView] = useState<WithdrawModalView>(WithdrawModalView.WITHDRAW_REQUEST)
  const { loading } = useWithdrawState()
  const { onResetWithdraw } = useWithdrawActionHandlers()
  const { chainId } = useActiveWeb3React()
  const chainName = findChainName(chainId) || 'Base'

  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const onClose = useCallback(() => {
    setModalView(WithdrawModalView.WITHDRAW_REQUEST)
    toggle()
    onResetWithdraw()
  }, [toggle, setModalView, onResetWithdraw])

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
      topContent={
        <HideSmall>
          <TYPE.main1
            style={{ padding: '10px 58px', borderRadius: '8px' }}
            backgroundColor="#b4b4ce"
            color="#FFFFFF"
            marginBottom="15px"
            marginTop="20px"
          >
            <Trans>{`${amount || '0'} ${
              tokenInfo?.symbol
            } will be extracted from your ${chainName} wallet and burnt automatically.`}</Trans>
          </TYPE.main1>
        </HideSmall>
      }
    >
      <ModalBlurWrapper style={{ position: 'relative' }}>
        <LoadingIndicator isLoading={loading} isRelative />
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Withdraw from Custodian</Trans>
              </TYPE.title5>
              <CloseIcon onClick={onClose} />
            </RowBetween>
            {modalView === WithdrawModalView.WITHDRAW_REQUEST && (
              <WithdrawRequestForm currency={currency} changeModal={setModalView} token={token} onRedirect={onClose} />
            )}
            {modalView === WithdrawModalView.PENDING && <WithdrawPending />}
            {modalView === WithdrawModalView.SUCCESS && <WithdrawSuccess onClose={onClose} />}
            {modalView === WithdrawModalView.ERROR && <WithdrawError onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
