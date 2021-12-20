import { Trans } from '@lingui/macro'
import { ButtonText } from 'components/Button'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import React, { useCallback } from 'react'
import { Box } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ModalBlurWrapper, ModalContentWrapper, ModalPadding } from 'theme'
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-back.svg'
import { CloseIcon, TYPE } from '../../theme'
import { DepositAboutWrapping } from './DepositAboutWrapping'

export const AboutWrapping = () => {
  const isOpen = useModalOpen(ApplicationModal.ABOUT_WRAPPING)
  const toggle = useToggleModal(ApplicationModal.ABOUT_WRAPPING)
  const onClose = useCallback(() => {
    toggle()
  }, [toggle])

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="depositPopup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <Row align="center">
                <ButtonText onClick={toggle}>
                  <Box display="flex" alignItems="center" marginRight={'0.5rem'}>
                    <ArrowLeft />
                  </Box>
                  <TYPE.title5>
                    <Trans>About Wrapping</Trans>
                  </TYPE.title5>
                </ButtonText>
              </Row>
              <CloseIcon data-testid="cross" onClick={toggle} />
            </RowBetween>
            <DepositAboutWrapping />
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
