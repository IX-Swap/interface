import { isMobile } from 'react-device-detect'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import { TYPE } from 'theme'
import { ChevronElement } from 'components/ChevronElement'
import { DarkBlueCard } from 'components/Card'
import { testSecTokens, testStableCoinsTokens } from 'constants/addresses'
import { IFaucetToken } from '.'

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
        {[...testStableCoinsTokens, ...testSecTokens].map((token) => {
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
