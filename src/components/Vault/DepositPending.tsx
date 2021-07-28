import { Trans } from '@lingui/macro'
import { IconWrapper } from 'components/AccountDetails/styleds'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import Row, { RowBetween, RowCenter } from 'components/Row'
import useCopyClipboard from 'hooks/useCopyClipboard'
import useENS from 'hooks/useENS'
import React from 'react'
import { Copy } from 'react-feather'
import { useDepositState } from 'state/deposit/hooks'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { shortenAddress } from '../../utils'

const StyledCopy = styled(Copy)`
  color: ${({ theme }) => theme.text1};
  width: 17px;
  height: 17px;
`
export const DepositPending = () => {
  const { sender } = useDepositState()
  const { address, loading } = useENS(sender)
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <Row style={{ marginTop: '50px' }}>
          <TYPE.title8>
            <Trans>Pending</Trans>
          </TYPE.title8>
        </Row>
        {address && !loading && (
          <RowBetween style={{ marginTop: '4px', flexWrap: 'wrap' }} onClick={() => setCopied(address)}>
            <TYPE.title9>{shortenAddress(address)}</TYPE.title9>
            {isCopied ? (
              <Trans>Copied</Trans>
            ) : (
              <IconWrapper size={18}>
                <StyledCopy />
              </IconWrapper>
            )}
          </RowBetween>
        )}

        <RowCenter style={{ marginTop: '68px', marginBottom: '112px' }}>
          <LoaderThin size={128} />
        </RowCenter>
      </Column>
    </div>
  )
}
