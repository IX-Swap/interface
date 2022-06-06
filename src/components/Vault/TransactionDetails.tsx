import React, { useCallback, useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { LinearProgress } from '@material-ui/core'
import { Flex } from 'rebass'

import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { QRCodeWrap } from 'components/QRCodeWrap'
import Row, { RowCenter, RowBetween } from 'components/Row'
import { CopyAddress } from 'components/CopyAddress'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleTransactionModal } from 'state/application/hooks'
import { useDepositState } from 'state/deposit/hooks'
import { useEventState } from 'state/eventLog/hooks'
import { ModalBlurWrapper, TYPE, CloseIcon, ExternalLink } from 'theme'
import { shortenAddress } from 'utils'
import { ReactComponent as SuccessIcon } from 'assets/images/check-2.svg'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { LogItem } from 'state/eventLog/actions'
import { useActiveWeb3React } from 'hooks/web3'
import { Colors } from 'theme/styled'

import {
  ActionTypes,
  ActionTypeText,
  DepositStatus,
  depositSuccessStatuses,
  getActionStatusPercent,
  getActionStatusText,
  getStatusColor,
  isDeposit,
  isWithdraw,
  withdrawSuccessStatuses,
  depositErrorStatuses,
  withdrawErrorStatuses,
} from './enum'

import {
  InfoModalHeader,
  InfoModalBody,
  StyledQrInfo,
  LiniarProgressContainer,
  PendingDepositInfo,
  DepositWarningInfo,
  DeadlineInfo,
} from './styleds'
import { DepoistStatusInfo } from './DepoistStatusInfo'
import { getNetworkFromToken, getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { WithdrawalWarning } from './WithdrawalWarning'

interface Props {
  currency?: Currency & { originalSymbol: string }
}

export const TransactionDetails = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TRANSACTION_DETAILS)
  const toggle = useToggleTransactionModal()
  const { depositError } = useDepositState()
  const { activeEvent, eventLog } = useEventState()

  const { chainId } = useActiveWeb3React()

  const onClose = useCallback(() => {
    toggle()
  }, [toggle])

  const data = useMemo(() => {
    const item = eventLog.find((el) => el.id === activeEvent?.id)
    return (item || activeEvent) as LogItem
  }, [activeEvent, eventLog])

  const amount = useMemo(() => {
    return data?.amount
  }, [data])

  if (!data) return null

  const status = data?.status ?? data?.params?.status ?? 'pending'
  const statusText = getActionStatusText(data.type, status, currency?.originalSymbol, currency?.symbol)
  const formattedDate = dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')
  const isSuccess = (data.type === ActionTypes.DEPOSIT ? depositSuccessStatuses : withdrawSuccessStatuses).includes(
    status
  )

  const isEnded = (
    data.type === ActionTypes.DEPOSIT
      ? [...depositSuccessStatuses, ...depositErrorStatuses]
      : [...withdrawSuccessStatuses, ...withdrawErrorStatuses]
  ).includes(status)
  const statusColor = getStatusColor(data.type, status)
  const percent = getActionStatusPercent(data.type, status)

  const originalNetworkName = getOriginalNetworkFromToken(currency)
  const networkName = getNetworkFromToken(currency)

  return (
    <RedesignedWideModal
      isOpen={isOpen}
      onDismiss={onClose}
      minHeight={isDeposit(data.type) ? 50 : 30}
      maxHeight={'fit-content'}
      mobileMaxHeight={90}
    >
      <ModalBlurWrapper data-testid="depositPopup" style={{ overflowY: 'scroll' }}>
        <InfoModalHeader>
          <TYPE.title5>
            <Trans>
              {currency?.originalSymbol}&nbsp;{ActionTypeText[data.type]}
            </Trans>
          </TYPE.title5>
          <CloseIcon data-testid="cross" onClick={toggle} />
        </InfoModalHeader>
        <InfoModalBody style={{ position: 'relative' }} isSuccess={isSuccess}>
          {isDeposit(data.type) && status === DepositStatus.PENDING && (
            <DepositWarningInfo>
              <div>WARNING</div>
              Please execute the transaction of wCTI Tokens to the Custodians wallet address on the <br />
              Ethereum Blockchain.
            </DepositWarningInfo>
          )}
          <div>
            <label>
              <Trans>Status:</Trans>
            </label>
            <hr />
            <TYPE.descriptionThin color={statusColor}>
              {statusText} {isSuccess && <SuccessIcon />}
            </TYPE.descriptionThin>
            <LiniarProgressContainer statusColor={statusColor as keyof Colors}>
              <LinearProgress variant="buffer" value={percent} valueBuffer={0} />
            </LiniarProgressContainer>
            {isDeposit(data.type) && status === DepositStatus.PENDING && (
              <PendingDepositInfo>
                <Row style={{ flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', marginTop: '8px' }}>
                  <div style={{ flex: '1', minWidth: '60%' }}>
                    <DepoistStatusInfo
                      originalSymbol={currency?.originalSymbol}
                      fromAddress={data.fromAddress}
                      toAddress={data.depositAddress}
                      amount={data.amount}
                    />
                  </div>

                  <div style={{ margin: '0 auto' }}>
                    <QRCodeWrap
                      value={data.depositAddress ?? ''}
                      size={80}
                      info={<StyledQrInfo>{shortenAddress(data?.depositAddress || '')}</StyledQrInfo>}
                    ></QRCodeWrap>
                  </div>
                </Row>
                {data.deadline && (
                  <DeadlineInfo>
                    <Trans>
                      Deposit will be cancelled if no tokens are received until{' '}
                      {dayjs(data.deadline).format('MMM D HH:mm')}
                    </Trans>
                  </DeadlineInfo>
                )}
              </PendingDepositInfo>
            )}
          </div>
          <Column style={{ rowGap: '8px' }}>
            <RowBetween style={{ flexWrap: 'wrap' }}>
              <label>
                <Trans>Txn ID:</Trans>&nbsp;&nbsp;
              </label>
              <TYPE.descriptionThin>{data.id}</TYPE.descriptionThin>
            </RowBetween>
            <RowBetween style={{ flexWrap: 'wrap' }}>
              <label>
                <Trans>Date:</Trans>&nbsp;&nbsp;
              </label>
              <TYPE.descriptionThin>{formattedDate}</TYPE.descriptionThin>
            </RowBetween>

            <RowBetween style={{ flexWrap: 'wrap' }}>
              <label>
                <Trans>Amount:</Trans>
              </label>
              <TYPE.descriptionThin>
                {amount}&nbsp;{currency?.originalSymbol}
              </TYPE.descriptionThin>
            </RowBetween>

            {data?.fromAddress && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <label>
                  {isDeposit(data.type) && <Trans>Sender&apos;s address:</Trans>}
                  {isWithdraw(data.type) && <Trans>Receiver&apos;s address:</Trans>}
                </label>
                <TYPE.descriptionThin>
                  <Flex>
                    <CopyAddress address={data?.fromAddress || ''} />
                  </Flex>
                </TYPE.descriptionThin>
              </RowBetween>
            )}
            {isDeposit(data.type) && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <label>
                  <Trans>Receiver&apos;s address: </Trans>
                </label>
                <TYPE.descriptionThin>
                  <Flex>
                    <CopyAddress address={data?.depositAddress || ''} />
                  </Flex>
                </TYPE.descriptionThin>
              </RowBetween>
            )}

            {isWithdraw(data.type) && chainId && data.feeTxHash && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <label>
                  <Trans>Fee paid ({data.feeAmount} MATIC):</Trans>
                </label>
                <ExternalLink href={getExplorerLink(chainId, data.feeTxHash, ExplorerDataType.TRANSACTION)}>
                  <Trans>View on explorer</Trans>
                </ExternalLink>
              </RowBetween>
            )}
            {depositError && (
              <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
                <TYPE.description2>{depositError}</TYPE.description2>
              </RowCenter>
            )}
          </Column>
          {isWithdraw(data.type) && chainId && !isEnded && (
            <WithdrawalWarning
              originalNetworkName={originalNetworkName}
              networkName={networkName}
              symbol={currency?.originalSymbol}
            />
          )}
        </InfoModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
