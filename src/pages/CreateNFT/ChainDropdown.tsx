import Popover from 'components/Popover'
import { RowBetween, RowStart } from 'components/Row'
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO, NETWORK_LABELS, SupportedChainId } from 'constants/chains'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { ChevronElement } from 'components/ChevronElement'
import { VioletCard } from 'components/Card'

export const PopOverContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 15px 20px;
`
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`

export const ChainDropdown = ({
  onSelect,
  selectedChain,
}: {
  onSelect: (chain: SupportedChainId) => void
  selectedChain: SupportedChainId
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const selectChain = useCallback(
    (chainId: SupportedChainId) => {
      onSelect(chainId)
      close()
    },
    [onSelect]
  )
  const popOverContent = useCallback(() => {
    return (
      <PopOverContent style={{ cursor: 'pointer', width: '320px' }}>
        {ALL_SUPPORTED_CHAIN_IDS.map((chainId) => {
          return (
            <RowStart key={chainId} onClick={() => selectChain(chainId)}>
              <Logo src={CHAIN_INFO[chainId].logoUrl} />
              {NETWORK_LABELS[chainId]}
            </RowStart>
          )
        })}
      </PopOverContent>
    )
  }, [selectChain])

  return (
    <VioletCard onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
      <RowBetween>
        <RowBetween>
          <RowStart>
            <Logo src={CHAIN_INFO[selectedChain].logoUrl} />
            <TYPE.body2>{NETWORK_LABELS[selectedChain]}</TYPE.body2>
          </RowStart>
        </RowBetween>
        <Popover show={isOpen} content={popOverContent()} placement="bottom-end" close={close}>
          <ChevronElement showMore={isOpen} />
        </Popover>
      </RowBetween>
    </VioletCard>
  )
}
