import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { EarnModalContentWrapper, StakeModalTop } from 'components/earn/styled'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import { SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useOpenModal, useToggleModal } from 'state/application/hooks'
import { updateUnderstoodPlayground } from 'state/user/actions'
import { useUserState } from 'state/user/hooks'
import styled from 'styled-components'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'

export default function PlaygroundModal() {
  const isOpen = useModalOpen(ApplicationModal.PLAYGROUND_WARNING)
  const toggle = useToggleModal(ApplicationModal.PLAYGROUND_WARNING)
  const openModal = useOpenModal(ApplicationModal.PLAYGROUND_WARNING)
  const dispatch = useDispatch<AppDispatch>()
  const { hasUnderstoodPlayground } = useUserState()
  const { chainId } = useActiveWeb3React()

  const onClose = useCallback(() => {
    if (hasUnderstoodPlayground) {
      toggle()
    }
  }, [hasUnderstoodPlayground, toggle])

  const onUnderstood = useCallback(() => {
    dispatch(updateUnderstoodPlayground({ understood: true }))
    toggle()
  }, [dispatch, toggle])

  useEffect(() => {
    if (chainId === SupportedChainId.KOVAN && !hasUnderstoodPlayground) {
      openModal()
    }
  }, [chainId, hasUnderstoodPlayground, openModal])

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} scrollable>
      <ModalBlurWrapper>
        <EarnModalContentWrapper>
          <ModalTop>
            <RowBetween>
              <TYPE.title5>
                <Trans>Welcome to the IX Swap Playground</Trans>
              </TYPE.title5>
              <CloseIcon onClick={onClose} />
            </RowBetween>
            <Row style={{ marginTop: '19px' }}>
              <TYPE.body1>
                <Trans>
                  This is just a playground and not a real product yet, this website is only made to experiment with.
                </Trans>
              </TYPE.body1>
            </Row>
          </ModalTop>
          <ModalBottom>
            <ActionButtons>
              <ButtonIXSWide data-testid="understood-button" onClick={onUnderstood}>
                <Trans>I understand</Trans>
              </ButtonIXSWide>
            </ActionButtons>
          </ModalBottom>
        </EarnModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`

const ModalTop = styled(StakeModalTop)`
  @media (max-width: 768px) {
    padding: 15px;
  }
`
export const ModalBottomWrapper = styled(Column)`
  padding: 33px 40px 34px 40px;
  background: ${({ theme }) => theme.bgG7};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

export const ModalBottom = styled(ModalBottomWrapper)`
  @media (max-width: 768px) {
    padding: 15px;
  }

  .text-row {
    font-size: 16px !important;
  }
`
