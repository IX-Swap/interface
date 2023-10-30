import React, { useCallback, useState } from 'react'
import { Trans } from '@lingui/macro'

import { LoadingIndicator } from 'components/LoadingIndicator'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowBetween, RowCenter } from 'components/Row'
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

import { ReactComponent as Newunavaliable } from '../../assets/images/unavaliableNew.svg'
import { Line } from 'components/Line'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

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
          {/* hide this for temporary  */}
          {/* <TYPE.main1
            style={{ padding: '10px 58px', borderRadius: '8px' }}
            backgroundColor="#b4b4ce"
            color="#FFFFFF"
            marginBottom="15px"
            marginTop="20px"
          >
            <Trans>{`${amount || '0'} ${
              tokenInfo?.symbol
            } will be extracted from your Polygon wallet and burnt automatically.`}</Trans>
          </TYPE.main1> */}
        </HideSmall>
      }
    >
      <ModalBlurWrapper style={{ position: 'relative', minWidth: isMobile ? '100%' : '500px' }}>
        <LoadingIndicator isLoading={loading} isRelative />
        <ModalContentWrapper>
          <ModalPadding>
            {/* temporary display */}
            <CloseIcon style={{ right: '20px', position: 'absolute', color: '#B8B8CC' }} onClick={onClose} />
            <RowCenter marginBottom={'30px'}>
              <Newunavaliable />
            </RowCenter>
            <RowCenter marginBottom={'30px'}>
              <TYPE.title5 textAlign={'center'} fontSize={'24px'}>
                <Trans>
                  Withdraw from Custodian <br /> Temporarily Unavailable
                </Trans>
              </TYPE.title5>
            </RowCenter>
            <RowCenter marginBottom={'30px'}>
              <TYPE.title10 textAlign={'center'} fontSize={'13px'}>
                <Trans>
                  This feature is currently under <br /> maintenance. Please come back later.
                </Trans>
              </TYPE.title10>
            </RowCenter>
            <Line style={{ marginBottom: '30px' }} />
            <RowCenter>
              <LinkWrap>
                <Trans>Back to Security Token Vault</Trans>
              </LinkWrap>
            </RowCenter>
            {/* temporary display */}
            {/* hide this for temporary  */}
            {/* <RowBetween>
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
            {modalView === WithdrawModalView.ERROR && <WithdrawError onClose={onClose} />} */}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const LinkWrap = styled.div`
  text-align: center;
  color: #9494ff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
`
