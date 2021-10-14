/* eslint-disable @typescript-eslint/no-empty-function */
import { Trans } from '@lingui/macro'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { QRCodeWrap } from 'components/QRCodeWrap'
import Row, { RowCenter } from 'components/Row'
import { useCurrency } from 'hooks/Tokens'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { AddressInput } from 'components/AddressInputPanel/AddressInput'
import React from 'react'
import { Copy } from 'react-feather'
import { useDepositState } from 'state/deposit/hooks'
import { useEventState } from 'state/eventLog/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { shortAddress } from '../../utils'
import useENS from 'hooks/useENS'

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
  const { address, loading } = useENS(sender)
  const error = Boolean(sender.length > 0 && !loading && !address)
  const currency = useCurrency(currencyId)
  const [isCopied, setCopied] = useCopyClipboard()
  const { activeEvent } = useEventState()

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ paddingBottom: '36px' }}>
        <Row style={{ marginTop: '20px', padding: '0px' }}>
          <TYPE.description3>
            <b>
              <Trans>Info:</Trans>
            </b>
            &nbsp;
            <Trans>Copy this address and send tokens to this wallet.</Trans>
          </TYPE.description3>
        </Row>

        <Column style={{ marginTop: '33px' }}>
          <TYPE.body1 marginBottom="11px">
            <Trans>{`${amount || ''} ${(currency as any)?.tokenInfo?.symbol} from`}</Trans>
          </TYPE.body1>
          <AddressInput
            {...{
              id: 'sender-input',
              value: address ? shortAddress(address) : '',
              error,
              onChange: () => {},
              disabled: true,
              rightItem: (
                <div onClick={() => setCopied(address ?? '')}>
                  {isCopied ? (
                    <Trans>Copied</Trans>
                  ) : (
                    <IconWrapper size={18}>
                      <StyledCopy />
                    </IconWrapper>
                  )}
                </div>
              ),
            }}
          />
        </Column>

        <Column style={{ marginTop: '16px', marginBottom: '69px' }}>
          <TYPE.body1 marginBottom="11px">
            <Trans>To</Trans>
          </TYPE.body1>
          <AddressInput
            {...{
              id: 'receiver-input',
              value: activeEvent?.depositAddress ? shortAddress(activeEvent.depositAddress) : '',
              error,
              onChange: () => {},
              disabled: true,
            }}
          />
        </Column>

        {activeEvent?.depositAddress && (
          <RowCenter style={{ marginBottom: '22px' }}>
            <QRCodeWrap value={activeEvent?.depositAddress}></QRCodeWrap>
          </RowCenter>
        )}
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
