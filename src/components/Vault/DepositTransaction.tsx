import React, { useEffect, useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import dayjs from 'dayjs'
import { LinearProgress } from '@material-ui/core'
import { Flex } from 'rebass'
import { useDispatch } from 'react-redux'

import Column from 'components/Column'
import { RowCenter, RowBetween } from 'components/Row'
import { CopyAddress } from 'components/CopyAddress'
import { useDepositState } from 'state/deposit/hooks'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { Colors } from 'theme/styled'
import {
  ActionTypes,
  DepositStatus,
  depositSuccessStatuses,
  getActionStatusPercent,
  getActionStatusText,
  getStatusColor,
  isDeposit,
  withdrawSuccessStatuses,
} from './enum'
import { LiniarProgressContainer } from './styleds'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import styled, { css } from 'styled-components'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { PinnedContentButton } from 'components/Button'
import { DepositView, setWalletState } from 'state/wallet'
import Loader from 'components/Loader'

interface Props {
  currency?: Currency & { originalSymbol: string }
}

export const DepositTransaction = ({ currency }: Props) => {
  const { depositError } = useDepositState()
  const { eventLog } = useEventState()
  const getEvents = useGetEventCallback()
  const dispatch = useDispatch()

  const data = eventLog ? eventLog[0] : null

  const amount = useMemo(() => {
    return data?.amount
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      getEvents({ page: 1, filter: 'all' })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const status = data?.status ?? data?.params?.status ?? DepositStatus.PENDING
  const statusText = getActionStatusText(data.type, status, currency?.originalSymbol, currency?.symbol)
  const formattedDate = dayjs(data?.createdAt).format('MMM D, YYYY HH:mm')
  const isSuccess = (data.type === ActionTypes.DEPOSIT ? depositSuccessStatuses : withdrawSuccessStatuses).includes(
    status
  )
  const statusColor = getStatusColor(data.type, status)
  const percent = getActionStatusPercent(data.type, status)
  const originalNetworkName = getOriginalNetworkFromToken(currency)

  const depositMore = () => {
    dispatch(setWalletState({ depositView: DepositView.CREATE_REQUEST }))
  }

  return (
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

      <Column style={{ rowGap: '8px', marginTop: 8 }} className="info">
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

        {depositError && (
          <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
            <TYPE.main1>{depositError}</TYPE.main1>
          </RowCenter>
        )}
      </Column>

      <div style={{ marginTop: 48 }}>
        <PinnedContentButton style={{ textTransform: 'unset' }} disabled={!isSuccess} onClick={depositMore}>
          {!isSuccess ? <Loader /> : <>Deposit More</>}
        </PinnedContentButton>
      </div>
    </Container>
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
    padding: 10px 0;
  }

  > div:first-child {
    margin-top: 50px;

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
