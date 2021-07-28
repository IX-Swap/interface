import { Currency } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { QRCodeWrap } from 'components/QRCodeWrap'
import Row, { RowBetween, RowCenter } from 'components/Row'
import { ModalContentWrapper } from 'components/SearchModal/styleds'
import dayjs from 'dayjs'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleTransactionModal } from 'state/application/hooks'
import { setLogItem } from 'state/eventLog/actions'
import { useEventState } from 'state/eventLog/hooks'
import { ModalBlurWrapper, SvgIconWrapper, TYPE } from 'theme'
import Success from '../../assets/images/success.svg'
import { CloseIcon } from '../../theme'
import {
  ActionHistoryStatus,
  ActionTypes,
  ActionTypeText,
  getActionStatusText,
  isPendingDeposit,
  isSuccessTransaction,
  isTransaction,
} from './enum'
import { ModalPadding } from './styleds'

interface Props {
  currency?: Currency
}

export const TransactionDetails = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TRANSACTION_DETAILS)
  const toggle = useToggleTransactionModal()
  const dispatch = useDispatch<AppDispatch>()
  const receiver = '0x2966adb1F526069cACac849FDd00C41334652238'
  const { activeEvent } = useEventState()
  const onClose = useCallback(() => {
    toggle()
    dispatch(setLogItem({ logItem: null }))
  }, [toggle, dispatch])
  const [isCopied, setCopied] = useCopyClipboard()

  if (!activeEvent) return null

  const status = (activeEvent?.params?.status as ActionHistoryStatus) ?? ActionHistoryStatus.PENDING
  const statusText = getActionStatusText(activeEvent?.type, status)
  const formattedDate = dayjs(activeEvent?.createdAt).format('MMM D, YYYY HH:mm')
  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={false}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper>
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>
                  {ActionTypeText[activeEvent.type]}&nbsp;{currency?.symbol}
                </Trans>
              </TYPE.title5>
              <CloseIcon onClick={toggle} />
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
                {isTransaction(activeEvent.type) && (
                  <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                    <TYPE.buttonMuted>
                      <Trans>Amount:</Trans>&nbsp;&nbsp;
                    </TYPE.buttonMuted>
                    <TYPE.body3>
                      {activeEvent?.params?.amount}&nbsp;{currency?.symbol}
                    </TYPE.body3>
                  </Row>
                )}
                {activeEvent.type === ActionTypes.DEPOSIT && (
                  <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                    <TYPE.buttonMuted>
                      <Trans>Deposit from:</Trans>&nbsp;&nbsp;
                    </TYPE.buttonMuted>
                    <TYPE.body3>{activeEvent.params?.fromAddress}</TYPE.body3>
                  </Row>
                )}
                {isTransaction(activeEvent.type) && (
                  <Row
                    style={{ marginTop: '16px', flexWrap: 'wrap' }}
                    onClick={() => setCopied(activeEvent.params?.toAddress ?? receiver)}
                  >
                    <TYPE.buttonMuted>
                      <Trans>{currency?.symbol} sent to: </Trans>&nbsp;&nbsp;
                    </TYPE.buttonMuted>
                    <TYPE.body3>{isCopied ? t`Copied` : activeEvent.params?.toAddress ?? receiver}</TYPE.body3>
                  </Row>
                )}
                {activeEvent.type === ActionTypes.DEPOSIT && isPendingDeposit(status) && (
                  <RowCenter style={{ marginTop: '25px' }}>
                    <QRCodeWrap value={activeEvent.params?.toAddress ?? receiver}></QRCodeWrap>
                  </RowCenter>
                )}
                {isSuccessTransaction(activeEvent.type, status) && (
                  <RowCenter style={{ marginTop: '45px', marginBottom: '45px' }}>
                    <SvgIconWrapper size={128}>
                      <img src={Success} alt={'Success!'} />
                    </SvgIconWrapper>
                  </RowCenter>
                )}
                {activeEvent.type === ActionTypes.DEPOSIT && isPendingDeposit(status) && (
                  <RowCenter style={{ marginTop: '45px', marginBottom: '45px' }}>
                    <ButtonGradientBorder style={{ width: '211px' }}>
                      <Trans>Cancel</Trans>
                    </ButtonGradientBorder>
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
