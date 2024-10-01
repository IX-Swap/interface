import React, { useCallback, useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import dayjs from 'dayjs'
import { LinearProgress } from '@material-ui/core'
import { Flex } from 'rebass'
import styled, { css } from 'styled-components'

import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { RowCenter, RowBetween } from 'components/Row'
import { CopyAddress } from 'components/CopyAddress'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleTransactionModal } from 'state/application/hooks'
import { useDepositState } from 'state/deposit/hooks'
import { useEventState } from 'state/eventLog/hooks'
import { ModalBlurWrapper, TYPE, CloseIcon, ExternalLink, MEDIA_WIDTHS } from 'theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { LogItem } from 'state/eventLog/actions'
import { useActiveWeb3React } from 'hooks/web3'
import { Colors } from 'theme/styled'
import {
  ActionTypes,
  ActionTypeText,
  depositSuccessStatuses,
  getActionStatusPercent,
  getActionStatusText,
  getStatusColor,
  isDeposit,
  isWithdraw,
  withdrawSuccessStatuses,
  depositErrorStatuses,
  withdrawErrorStatuses,
  DepositStatus,
} from './enum'

import { InfoModalHeader, LiniarProgressContainer } from './styleds'
import { getNetworkFromToken, getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { WithdrawalWarning } from './WithdrawalWarning'
import { useNativeCurrency } from 'hooks/useNativeCurrency'

interface Props {
  currency?: Currency & { originalSymbol: string }
}

export const TransactionDetails = ({ currency }: Props) => {
  const isOpen = useModalOpen(ApplicationModal.TRANSACTION_DETAILS)
  const toggle = useToggleTransactionModal()
  const { depositError } = useDepositState()
  const { activeEvent, eventLog } = useEventState()
  const native = useNativeCurrency()

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

  const status = data?.status ?? data?.params?.status ?? DepositStatus.PENDING
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
      <ModalBlurWrapper data-testid="depositPopup" style={{ overflowY: 'scroll', width: '500px', padding: '20px' }}>
        <InfoModalHeader>
          <TYPE.title5>
            {currency?.originalSymbol}&nbsp;{ActionTypeText[data.type]}
          </TYPE.title5>
          <CloseIcon style={{ color: '#B8B8CC' }} data-testid="cross" onClick={toggle} />
        </InfoModalHeader>
        <Container isSuccess={isSuccess}>
          <div>
            <div className="title">Status</div>
            <StatusWrap>
              <RowBetween>
                <LiniarProgressContainer
                  style={{ width: '100%', marginTop: 0 }}
                  statusColor={statusColor as Exclude<keyof Colors, 'config'>}
                >
                  <TYPE.description2 marginBottom={'10px'} color={statusColor}>
                    {statusText}
                  </TYPE.description2>
                  <LinearProgress variant="buffer" value={percent} valueBuffer={0} />
                </LiniarProgressContainer>
              </RowBetween>
            </StatusWrap>
          </div>

          <Column style={{ rowGap: '8px' }} className="info">
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
                  <TYPE.small>
                    Fee paid ({data.feeAmount} {native?.symbol || 'ETH'}):
                  </TYPE.small>
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
        </Container>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Container = styled.div<{ isSuccess: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background: ${({ theme }) => theme.bg0};
  border-radius: 0px 0px 20px 20px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 10px 16px;
  }

  > div:first-child {
    margin-top: 18px;

    .title {
      color: rgba(41, 41, 51, 0.9);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.42px;
    }
    label {
      font-size: 14px;
      color: ${({ theme }) => theme.text2};
    }
    > hr {
      margin: 8px 0px;
      border: none;
      height: 1px;
      background-color: ${({ theme }) => theme.text9};
    }
    > div {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      ${({ isSuccess }) =>
        isSuccess &&
        css`
          svg {
            path {
              fill: ${({ theme }) => theme.green1};
            }
          }
        `}
    }
  }

  .info {
    background: ${({ theme }) => theme.bg7};
    border-radius: 8px;
    border: 1px solid #e6e6ff;
    padding: 24px;
    label {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
  }
`

const StatusWrap = styled.div`
  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  padding: 24px 32px;
  margin-top: 10px;
  min-height: 186px;
`
