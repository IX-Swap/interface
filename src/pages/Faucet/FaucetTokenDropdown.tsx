import { isMobile } from 'react-device-detect'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Popover from 'components/Popover'
import Row, { RowBetween, RowStart } from 'components/Row'
import { TYPE } from 'theme'
import { ChevronElement } from 'components/ChevronElement'
import { DarkBlueCard } from 'components/Card'
import { ixSwapToken, testSecTokens, testStableCoinsTokens } from 'constants/addresses'
import { IFaucetToken } from '.'
import { Trans } from '@lingui/macro'
import { Line } from 'components/Line'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`

export const FaucetTokenDropdown = ({
  onSelect,
  selectedToken,
}: {
  onSelect: (token: IFaucetToken) => void
  selectedToken: IFaucetToken
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const selectToken = useCallback(
    (newToken: IFaucetToken) => {
      onSelect(newToken)
      close()
    },
    [onSelect]
  )
  const popOverContent = useCallback(() => {
    return (
      <PopOverContent style={{ cursor: 'pointer', width: isMobile ? '100%' : '320px' }}>
        <RowStart>
          <TYPE.body2 style={{ fontWeight: 600 }}>
            <Trans>Non-Security Tokens</Trans>
          </TYPE.body2>
        </RowStart>
        {[...testStableCoinsTokens].map((token) => {
          return (
            <RowStart key={`token-${token.address}`} onClick={() => selectToken(token)}>
              {token.name}
            </RowStart>
          )
        })}
        {[...ixSwapToken].map((token) => {
          return (
            <RowStart key={`token-${token.address}`} onClick={() => selectToken(token)}>
              {token.name}
            </RowStart>
          )
        })}
        <Row style={{ padding: '0', margin: '5px 0' }}>
          <Line />
        </Row>
        <RowStart>
          <TYPE.body2 style={{ fontWeight: 600 }}>
            <Trans>Security Tokens</Trans>
          </TYPE.body2>
        </RowStart>
        {[...testSecTokens].map((token) => {
          return (
            <RowStart key={`token-${token.address}`} onClick={() => selectToken(token)}>
              {token.name}
            </RowStart>
          )
        })}
      </PopOverContent>
    )
  }, [selectToken])

  return (
    <DarkBlueCard onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
      <RowBetween>
        <RowBetween>
          <RowStart>
            <TYPE.body2>{selectedToken.name}</TYPE.body2>
          </RowStart>
        </RowBetween>
        <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
          <ChevronElement showMore={isOpen} />
        </Popover>
      </RowBetween>
    </DarkBlueCard>
  )
}
