import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Trans } from '@lingui/macro'

import { ButtonText } from 'components/Button'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useDepositModalToggle, useModalOpen } from 'state/application/hooks'
import { setError, setLoading, setModalView } from 'state/deposit/actions'
import { useDepositActionHandlers, useDepositState, useHideAboutWrappingCallback } from 'state/deposit/hooks'
import { DepositModalView } from 'state/deposit/reducer'
import { useUserSecTokens } from 'state/user/hooks'
import { ModalBlurWrapper, ModalContentWrapper, ModalPadding, CloseIcon, TYPE } from 'theme'
import { SecCurrency } from 'types/secToken'

import { DepositAboutWrapping } from './DepositAboutWrapping'
import { DepositError } from './DepositError'
import { DepositPending } from './DepositPending'
import { DepositSendInfo } from './DepositSendInfo'

interface Props {
  currency?: SecCurrency
  token: any
}
export const DepositPopup = ({ currency }: Props) => {
  const { secTokens } = useUserSecTokens()
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const hideAboutWrapping = useHideAboutWrappingCallback()
  const toggle = useDepositModalToggle()
  const { modalView } = useDepositState()
  const dispatch = useDispatch<AppDispatch>()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const { onResetDeposit } = useDepositActionHandlers()

  const onClose = useCallback(() => {
    if (modalView !== DepositModalView.ABOUT_WRAPPING) {
      onResetDeposit()
    }
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
    hideAboutWrapping()
  }, [toggle, dispatch, hideAboutWrapping])

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={() => {}} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper style={{ width: '500px' }} data-testid="depositPopup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              {modalView === DepositModalView.ABOUT_WRAPPING ? (
                <Row align="center">
                  <ButtonText onClick={hideAboutWrapping}>
                    {/* <Box display="flex" alignItems="center" marginRight={'0.5rem'}>
                      <ArrowLeft />
                    </Box> */}
                    <TYPE.titleSmall>
                      <Trans>About Wrapping</Trans>
                    </TYPE.titleSmall>
                  </ButtonText>
                </Row>
              ) : (
                <TYPE.titleSmall>
                  <Trans>{`Deposit ${currency?.originalSymbol || ''} ${
                    modalView === DepositModalView.SEND_INFO ? `to 1st Digital Custodian` : `from ${networkName || ''}`
                  }`}</Trans>
                </TYPE.titleSmall>
              )}
              <CloseIcon data-testid="cross" onClick={onClose} />
            </RowBetween>
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo />}
            {modalView === DepositModalView.PENDING && <DepositPending />}
            {modalView === DepositModalView.ERROR && <DepositError onClose={onClose} />}
            {modalView === DepositModalView.ABOUT_WRAPPING && <DepositAboutWrapping />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
