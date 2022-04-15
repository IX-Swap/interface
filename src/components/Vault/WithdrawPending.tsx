import { Trans } from '@lingui/macro'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import Row, { RowBetween, RowCenter } from 'components/Row'
import { useCurrency } from 'hooks/Tokens'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React from 'react'
import { Copy } from 'react-feather'
import { useWithdrawState } from 'state/withdraw/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { shortenAddress } from '../../utils'

const StyledCopy = styled(Copy)`
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`
export const WithdrawPending = () => {
  const { amount, receiver, currencyId: cid } = useWithdrawState()
  const currency = useCurrency(cid)
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <Row style={{ marginTop: '50px' }}>
          <TYPE.title8>
            <Trans>
              Sending {amount} {currency?.symbol} here
            </Trans>
          </TYPE.title8>
        </Row>

        <RowBetween style={{ marginTop: '4px', flexWrap: 'wrap' }} onClick={() => setCopied(receiver)}>
          <TYPE.title9>{receiver ? shortenAddress(receiver) : ''}</TYPE.title9>
          {isCopied ? (
            <Trans>Copied</Trans>
          ) : (
            <IconWrapper size={18}>
              <StyledCopy />
            </IconWrapper>
          )}
        </RowBetween>

        <RowCenter style={{ marginTop: '68px', marginBottom: '112px' }}>
          <LoaderThin size={128} />
        </RowCenter>
      </Column>
    </div>
  )
}
