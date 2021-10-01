import { Currency } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { QRCodeWrap } from 'components/QRCodeWrap'
import Row, { RowBetween, RowCenter } from 'components/Row'
import dayjs from 'dayjs'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleTransactionModal } from 'state/application/hooks'
import { useCancelDepositCallback, useDepositState } from 'state/deposit/hooks'
import { useEventState } from 'state/eventLog/hooks'
import { ModalBlurWrapper, ModalContentWrapper, SvgIconWrapper, TYPE } from 'theme'
import { shortenAddress } from 'utils'
import { durationInHours } from 'utils/time'
import Success from '../../assets/images/success.svg'
import { CloseIcon } from '../../theme'
import {
  ActionHistoryStatus,
  ActionTypeText,
  getActionStatusText,
  isDeposit,
  isPending,
  isPendingDeposit,
  isSuccessTransaction,
  isWithdraw,
} from './enum'
import { ModalPadding } from './styleds'

interface Props {
  currency?: Currency
}

export const TransactionDetails = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TRANSACTION_DETAILS)
  const toggle = useToggleTransactionModal()
  const dispatch = useDispatch<AppDispatch>()
  const { depositError } = useDepositState()
  const { activeEvent } = useEventState()
  const onClose = useCallback(() => {
    toggle()
  }, [toggle, dispatch])

  const amount = useMemo(() => {
    return activeEvent?.amount
  }, [activeEvent])

  const [isCopied, setCopied] = useCopyClipboard()
  const cancelDeposit = useCancelDepositCallback()
  const onSuccess = useCallback(() => {
    onClose()
  }, [onClose])

  const deadlineIn = useMemo(() => {
    return durationInHours(activeEvent?.deadline)
  }, [activeEvent?.deadline])

  if (!activeEvent) return null

  const status = activeEvent?.status ?? activeEvent?.params?.status ?? ActionHistoryStatus.PENDING
  const statusText = getActionStatusText(activeEvent?.type, status)
  const formattedDate = dayjs(activeEvent?.createdAt).format('MMM D, YYYY HH:mm')

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={isDeposit(activeEvent.type) ? 50 : 30}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper data-testid="depositPopup" style={{ overflowY: 'scroll' }}>
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>
                  {ActionTypeText[activeEvent.type]}&nbsp;{currency?.symbol}
                </Trans>
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={toggle} />
            </RowBetween>
            <div style={{ position: 'relative' }}>
              <Column style={{ marginTop: '20px' }}>
                <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                  <TYPE.buttonMuted>
                    <Trans>Status:</Trans>&nbsp;&nbsp;
                  </TYPE.buttonMuted>
                  <TYPE.body3>{statusText}</TYPE.body3>
                </Row>
                <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                  <TYPE.buttonMuted>
                    <Trans>Date:</Trans>&nbsp;&nbsp;
                  </TYPE.buttonMuted>
                  <TYPE.body3>{formattedDate}</TYPE.body3>
                </Row>

                <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                  <TYPE.buttonMuted>
                    <Trans>Amount:</Trans>&nbsp;&nbsp;
                  </TYPE.buttonMuted>
                  <TYPE.body3>
                    {amount}&nbsp;{currency?.symbol}
                  </TYPE.body3>
                </Row>

                {activeEvent?.fromAddress && (
                  <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                    <TYPE.buttonMuted>
                      <Trans>Sent from:</Trans>&nbsp;&nbsp;
                    </TYPE.buttonMuted>
                    <TYPE.body3>{shortenAddress(activeEvent?.fromAddress)}</TYPE.body3>
                  </Row>
                )}
                {activeEvent.depositAddress && (
                  <Row
                    style={{ marginTop: '16px', flexWrap: 'wrap' }}
                    onClick={() => setCopied(activeEvent.depositAddress ?? '')}
                  >
                    <TYPE.buttonMuted>
                      {!isPending(activeEvent.type, status) && <Trans>Recipient address: </Trans>}
                      {isDeposit(activeEvent.type) && isPendingDeposit(status) && (
                        <Trans>Send {currency?.symbol} to: </Trans>
                      )}
                      &nbsp;&nbsp;
                    </TYPE.buttonMuted>
                    <TYPE.body3>{isCopied ? t`Copied` : shortenAddress(activeEvent.depositAddress)}</TYPE.body3>
                  </Row>
                )}
                {isDeposit(activeEvent.type) && isPendingDeposit(status) && activeEvent.depositAddress && (
                  <RowCenter style={{ marginTop: '25px' }}>
                    <QRCodeWrap value={activeEvent.depositAddress ?? ''}></QRCodeWrap>
                  </RowCenter>
                )}
                {isSuccessTransaction(activeEvent.type, status) && (
                  <RowCenter style={{ marginTop: '45px', marginBottom: '45px' }}>
                    <SvgIconWrapper size={128}>
                      <img src={Success} alt={'Success!'} />
                    </SvgIconWrapper>
                  </RowCenter>
                )}
                {isPending(activeEvent.type, status) && (
                  <RowCenter style={{ marginTop: '45px', marginBottom: '45px' }}>
                    <ButtonGradientBorder
                      data-testid="cancel"
                      style={{ width: '211px' }}
                      onClick={() => cancelDeposit({ requestId: activeEvent?.id, onSuccess })}
                    >
                      {isDeposit(activeEvent.type) && <Trans>Cancel deposit</Trans>}
                      {isWithdraw(activeEvent.type) && <Trans>Cancel withdraw</Trans>}
                    </ButtonGradientBorder>
                  </RowCenter>
                )}
                {depositError && (
                  <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
                    <TYPE.description2>{depositError}</TYPE.description2>
                  </RowCenter>
                )}
                {isDeposit(activeEvent.type) && deadlineIn && isPendingDeposit(status) && (
                  <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
                    <TYPE.description2>
                      <Trans>Will be cancelled automatically in {deadlineIn} hours</Trans>
                    </TYPE.description2>
                  </RowCenter>
                )}
              </Column>
            </div>
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
