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
import { useDepositState } from 'state/deposit/hooks'
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

interface Props {
  currency?: Currency
}
export const DepositPopup = ({ currency }: Props) => {
  const { secTokens } = useUserSecTokens()
  const isOpen = useModalOpen(ApplicationModal.DEPOSIT)
  const [showWrapInfo, setShowWrapInfo] = useState(false)
  const toggle = useDepositModalToggle()
  const { modalView } = useDepositState()
  const dispatch = useDispatch<AppDispatch>()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo

  const onClose = useCallback(() => {
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
    setShowWrapInfo(false)
  }, [toggle])

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
      scrollable
    >
      <ModalBlurWrapper data-testid="depositPopup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              {showWrapInfo ? (
                <Row align="center">
                  <ButtonText onClick={() => setShowWrapInfo(false)}>
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
                  <Trans>{`Deposit ${tokenInfo?.symbol || ''} from ${tokenInfo?.network || ''}`}</Trans>
                </TYPE.title5>
              )}
              <CloseIcon data-testid="cross" onClick={onClose} />
            </RowBetween>
            {modalView === DepositModalView.CREATE_REQUEST && (
              <DepositRequestForm showWrapInfo={showWrapInfo} setShowWrapInfo={setShowWrapInfo} currency={currency} />
            )}
            {modalView === DepositModalView.SEND_INFO && <DepositSendInfo onClose={onClose} />}
            {modalView === DepositModalView.PENDING && <DepositPending />}
            {modalView === DepositModalView.ERROR && <DepositError onClose={onClose} />}
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
