import { Trans } from '@lingui/macro'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { QRCodeWrap } from 'components/QRCodeWrap'
import Row, { RowBetween, RowCenter } from 'components/Row'
import { useCurrency } from 'hooks/Tokens'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React from 'react'
import { Copy } from 'react-feather'
import { useDepositState } from 'state/deposit/hooks'
import { useEventState } from 'state/eventLog/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { shortenAddress } from '../../utils'

const StyledCopy = styled(Copy)`
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`
interface Props {
  onClose: () => void
}
export const DepositSendInfo = ({ onClose }: Props) => {
  const { amount, sender, currencyId, loadingDeposit, depositError } = useDepositState()
  const currency = useCurrency(currencyId)
  const [isCopied, setCopied] = useCopyClipboard()
  const { activeEvent } = useEventState()

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ paddingBottom: '36px' }}>
        <Row style={{ marginTop: '20px' }}>
          <TYPE.description3>
            <b>
              <Trans>Info:</Trans>
            </b>
            &nbsp;
            <Trans>Copy this address and send tokens to this wallet.</Trans>
          </TYPE.description3>
        </Row>
        <Row style={{ marginTop: '16px', textTransform: 'uppercase' }}>
          <TYPE.body1>
            <Trans>Send {currency?.symbol} here</Trans>
          </TYPE.body1>
        </Row>
        {activeEvent?.depositAddress && (
          <RowBetween
            style={{ marginTop: '4px', flexWrap: 'wrap' }}
            onClick={() => setCopied(activeEvent?.depositAddress ?? '')}
          >
            <TYPE.body2>{shortenAddress(activeEvent?.depositAddress)}</TYPE.body2>
            {isCopied ? (
              <Trans>Copied</Trans>
            ) : (
              <IconWrapper size={18}>
                <StyledCopy />
              </IconWrapper>
            )}
          </RowBetween>
        )}
        {activeEvent?.depositAddress && (
          <RowCenter style={{ marginTop: '25px' }}>
            <QRCodeWrap value={activeEvent?.depositAddress}></QRCodeWrap>
          </RowCenter>
        )}
        <Row style={{ marginTop: '16px', textTransform: 'uppercase' }}>
          <TYPE.body1>
            <Trans>Need to send</Trans>
          </TYPE.body1>
        </Row>
        <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
          <TYPE.buttonMuted>
            <Trans>Amount:</Trans>&nbsp;
          </TYPE.buttonMuted>
          <TYPE.body3>
            {amount}&nbsp;
            {currency?.symbol}
          </TYPE.body3>
        </Row>
        <Row style={{ marginTop: '16px', flexWrap: 'wrap' }}>
          <TYPE.buttonMuted>
            <Trans>Sender’s wallet:</Trans>&nbsp;
          </TYPE.buttonMuted>
          <TYPE.body3>{shortenAddress(sender)}</TYPE.body3>
        </Row>
        {loadingDeposit && (
          <RowCenter style={{ marginTop: '18px' }}>
            <LoaderThin size={32} />
          </RowCenter>
        )}
        {depositError && (
          <RowCenter style={{ marginTop: '16px', opacity: '0.7' }}>
            <TYPE.description2>{depositError}</TYPE.description2>
          </RowCenter>
        )}
      </Column>
    </div>
  )
}
