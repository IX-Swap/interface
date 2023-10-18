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
import { ReactComponent as ErrorIcon } from 'assets/images/newCloseIcon.svg'
import { ReactComponent as PendingIcon } from 'assets/images/NewPendingIcon.svg'
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
import { PinnedContentButton } from 'components/Button'

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
      <ModalBlurWrapper data-testid="depositPopup" style={{ overflowY: 'scroll', width: '500px' }}>
        <InfoModalHeader>
          <TYPE.title5>
            <Trans>
              {currency?.originalSymbol}&nbsp;{ActionTypeText[data.type]}
            </Trans>
          </TYPE.title5>
          <CloseIcon style={{ color: '#B8B8CC' }} data-testid="cross" onClick={toggle} />
        </InfoModalHeader>
        <InfoModalBody style={{ position: 'relative' }} isSuccess={isSuccess}>
          {isDeposit(data.type) && status === DepositStatus.PENDING && (
            <DepositWarningInfo style={{ background: '#fff0f1' }}>
              <div style={{ color: '#FF6161', fontSize: '13px', fontWeight: 600 }}>WARNING</div>
              <span style={{ color: '#666680', fontSize: '13px', fontWeight: 400 }}>
                Please execute the transaction of {currency?.originalSymbol} Tokens to the Custodians wallet address on
                the Ethereum Blockchain.
              </span>
            </DepositWarningInfo>
          )}

          <div>
            <label>
              <Trans>Status:</Trans>
            </label>
            {data?.status === 'approved' && (
              <LiniarProgressContainer
                style={{
                  background: '#FFFFFF',
                  padding: '24px 16px',
                  border: '1px solid #E6E6FF',
                  borderRadius: '8px',
                  marginTop: '10px',
                  display: 'block',
                }}
                statusColor={statusColor as Exclude<keyof Colors, 'config'>}
              >
                <TYPE.description2 marginBottom={'10px'} color={statusColor}>
                  {statusText}
                </TYPE.description2>
                <LinearProgress variant="buffer" value={percent} valueBuffer={0} />
              </LiniarProgressContainer>
            )}

            {/* <hr /> */}
            {data?.status !== 'approved' && (
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '24px 16px',
                  border: '1px solid #E6E6FF',
                  borderRadius: '8px',
                  marginTop: '10px',
                }}
              >
                <RowBetween>
                  <TYPE.description2 color={statusColor}>{statusText} </TYPE.description2>
                  {isSuccess ? (
                    <SuccessIcon />
                  ) : data?.status === 'pending' ? (
                    ''
                  ) : data?.status === 'approved' ? (
                    <PendingIcon />
                  ) : (
                    <ErrorIcon />
                  )}
                </RowBetween>

                <LiniarProgressContainer statusColor={statusColor as Exclude<keyof Colors, 'config'>}>
                  <LinearProgress variant="buffer" value={percent} valueBuffer={0} />
                </LiniarProgressContainer>
              </div>
            )}

            <div>
              {isDeposit(data.type) && status === DepositStatus.PENDING && (
                <PendingDepositInfo>
                  {/* <Row style={{ flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', marginTop: '8px' }}> */}
                  <DepoistStatusInfo
                    originalSymbol={currency?.originalSymbol}
                    fromAddress={data.fromAddress}
                    toAddress={data.depositAddress}
                    amount={data.amount}
                    network={originalNetworkName}
                  />
                  {/* </Row> */}

                  <div
                    style={{
                      margin: '0 auto',
                      padding: '10px 10px',
                      border: '1px solid #E6E6FF',
                      background: '#FFFFFF',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <QRCodeWrap
                      value={data.depositAddress ?? ''}
                      size={80}
                      // info={
                      //   <StyledQrInfo>
                      //     {shortenAddress(data?.depositAddress || '', 4, originalNetworkName)}
                      //   </StyledQrInfo>
                      // }
                    ></QRCodeWrap>
                  </div>
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
          </div>

          <Column style={{ rowGap: '8px' }}>
            <RowBetween style={{ flexWrap: 'wrap' }}>
              <TYPE.small>Txn ID:</TYPE.small>&nbsp;&nbsp;
              <TYPE.main1>{data.id}</TYPE.main1>
            </RowBetween>
            <RowBetween style={{ flexWrap: 'wrap' }}>
              <TYPE.small>Date:</TYPE.small>&nbsp;&nbsp;
              <TYPE.main1>{formattedDate}</TYPE.main1>
            </RowBetween>

            <RowBetween style={{ flexWrap: 'wrap' }}>
              <TYPE.small>Amount:</TYPE.small>

              <TYPE.main1>
                {amount}&nbsp;{currency?.originalSymbol}
              </TYPE.main1>
            </RowBetween>

            {data?.fromAddress && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                {isDeposit(data.type) && <TYPE.small>Sender&apos;s address:</TYPE.small>}
                {isWithdraw(data.type) && <TYPE.small>Receiver&apos;s address:</TYPE.small>}

                <TYPE.main1>
                  <Flex>
                    <CopyAddress address={data?.fromAddress || ''} network={originalNetworkName} />
                  </Flex>
                </TYPE.main1>
              </RowBetween>
            )}
            {isDeposit(data.type) && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <label>
                  <TYPE.small>Receiver&apos;s address: </TYPE.small>
                </label>
                <TYPE.main1>
                  <Flex>
                    <CopyAddress address={data?.depositAddress || ''} network={originalNetworkName} />
                  </Flex>
                </TYPE.main1>
              </RowBetween>
            )}

            {isWithdraw(data.type) && chainId && data.feeTxHash && (
              <RowBetween style={{ flexWrap: 'wrap' }}>
                <label>
                  <TYPE.small>Fee paid ({data.feeAmount} MATIC):</TYPE.small>
                </label>
                <ExternalLink href={getExplorerLink(chainId, data.feeTxHash, ExplorerDataType.TRANSACTION)}>
                  <TYPE.small style={{ color: '#6666FF', textDecoration: 'none !important' }}>
                    View on explorer
                  </TYPE.small>
                </ExternalLink>
              </RowBetween>
            )}
            {depositError && (
              <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
                <TYPE.main1>{depositError}</TYPE.main1>
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
          {/* {!isSuccess && <PinnedContentButton>Contact Support</PinnedContentButton>} */}
        </InfoModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
