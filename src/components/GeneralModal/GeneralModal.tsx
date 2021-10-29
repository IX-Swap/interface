import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowCenter } from 'components/Row'
import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useGeneralModalState, useModalOpen, useToggleModal } from 'state/application/hooks'
import { ModalType } from 'state/application/reducer'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, SvgIconWrapper, TYPE } from 'theme'
import Attention from '../../assets/images/attention.svg'
import Success from '../../assets/images/success.svg'

export const ModalPadding = styled.div`
  padding: 37px 40px 19px 40px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding: 22px 8px 18px 8px;
  `};
`
export const GeneralModal = () => {
  const isOpen = useModalOpen(ApplicationModal.GENERAL)
  const { modalType, modalTitle, modalMessage } = useGeneralModalState()
  const toggle = useToggleModal(ApplicationModal.GENERAL)
  const onClose = () => toggle()

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="generalModal">
        <ModalContentWrapper>
          <ModalPadding>
            <div style={{ position: 'relative' }}>
              <Column>
                <RowCenter>
                  <TYPE.title4>
                    <Trans>{modalTitle}</Trans>
                  </TYPE.title4>
                </RowCenter>
                <RowCenter style={{ marginTop: 61 }}>
                  <SvgIconWrapper size={128}>
                    {modalType === ModalType.ERROR && <img src={Attention} alt={'Error'} />}
                    {modalType === ModalType.SUCCESS && <img src={Success} alt={'Success'} />}
                  </SvgIconWrapper>
                </RowCenter>
                <RowCenter style={{ marginTop: 14, marginBottom: 53, textAlign: 'center' }}>
                  {modalType === ModalType.ERROR && (
                    <TYPE.error error={true} style={{ fontSize: '21px' }}>
                      {modalMessage}
                    </TYPE.error>
                  )}
                  {modalType === ModalType.SUCCESS && <TYPE.titleSmall>{modalMessage}</TYPE.titleSmall>}
                </RowCenter>
                <RowCenter style={{ marginBottom: 35 }}>
                  <ButtonGradientBorder onClick={onClose} data-testid="close" style={{ width: '112px' }}>
                    <Trans>Close</Trans>
                  </ButtonGradientBorder>
                </RowCenter>
              </Column>
            </div>
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
