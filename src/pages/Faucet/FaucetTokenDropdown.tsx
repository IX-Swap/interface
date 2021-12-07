import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ChevronElement } from 'components/ChevronElement'
import { DarkBlueCard } from 'components/Card'

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
  onSelect: (token: string) => void
  selectedToken: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const selectToken = useCallback(
    (newToken: string) => {
      onSelect(newToken)
      close()
    },
    [onSelect]
  )
  const popOverContent = useCallback(() => {
    return (
      <PopOverContent style={{ cursor: 'pointer', width: '320px' }}>
        {['Apple', 'Coinbase', 'Tesla'].map((token) => {
          return (
            <RowStart key={`token-${token}`} onClick={() => selectToken(token)}>
              {token}
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
            <TYPE.body2>{selectedToken}</TYPE.body2>
          </RowStart>
        </RowBetween>
        <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
          <ChevronElement showMore={isOpen} />
        </Popover>
      </RowBetween>
    </DarkBlueCard>
  )
}
