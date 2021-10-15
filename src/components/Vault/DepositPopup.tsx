import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from 'rebass'
import { AppDispatch } from 'state'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { ApplicationModal } from 'state/application/actions'
import { useDepositModalToggle, useModalOpen } from 'state/application/hooks'
import { setError, setLoading, setModalView } from 'state/deposit/actions'
import { useDepositState, useHideAboutWrappingCallback } from 'state/deposit/hooks'
import { DepositModalView } from 'state/deposit/reducer'
import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import { CloseIcon, TYPE } from '../../theme'
import { DepositError } from './DepositError'
import { DepositPending } from './DepositPending'
import { DepositRequestForm } from './DepositRequestForm'
import { DepositSendInfo } from './DepositSendInfo'
import { ModalPadding } from './styleds'
import { ButtonText } from 'components/Button'
import { useUserSecTokens } from 'state/user/hooks'
import { DepositAboutWrapping } from './DepositAboutWrapping'

interface Props {
  currency?: Currency
}
export const DepositPopup = ({ currency }: Props) => {
  const { secTokens } = useUserSecTokens()
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const hideAboutWrapping = useHideAboutWrappingCallback()
  const toggle = useDepositModalToggle()
  const { modalView } = useDepositState()
  const dispatch = useDispatch<AppDispatch>()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo

  const onClose = useCallback(() => {
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
    hideAboutWrapping()
  }, [toggle])

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="depositPopup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              {modalView === DepositModalView.ABOUT_WRAPPING ? (
                <Row align="center">
                  <ButtonText onClick={hideAboutWrapping}>
                    <Box display="flex" alignItems="center" marginRight={'0.5rem'}>
                      <ArrowLeft />
                    </Box>
                    <TYPE.title5>
                      <Trans>About Wrapping</Trans>
                    </TYPE.title5>
                  </ButtonText>
                </Row>
              ) : (
                <TYPE.title5>
                  <Trans>{`Deposit ${tokenInfo?.symbol || ''} ${
                    modalView === DepositModalView.SEND_INFO
                      ? `to 1st Digital Custodian`
                      : `from ${tokenInfo?.network || ''}`
                  }`}</Trans>
                </TYPE.title5>
              )}
              <CloseIcon
                data-testid="cross"
                onClick={modalView === DepositModalView.ABOUT_WRAPPING ? hideAboutWrapping : onClose}
              />
            </RowBetween>
            {modalView === DepositModalView.CREATE_REQUEST && <DepositRequestForm currency={currency} />}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo onClose={onClose} />}
            {modalView === DepositModalView.PENDING && <DepositPending />}
            {modalView === DepositModalView.ERROR && <DepositError onClose={onClose} />}
            {modalView === DepositModalView.ABOUT_WRAPPING && <DepositAboutWrapping />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
