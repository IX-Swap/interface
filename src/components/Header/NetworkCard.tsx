import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { CHAIN_INFO, NETWORK_LABELS } from 'constants/chains'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useActiveWeb3React } from 'hooks/web3'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ChevronElement } from 'components/ChevronElement'
import { MEDIA_WIDTHS } from 'theme'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

import { VioletCard } from '../Card'

const SelectorControls = styled(VioletCard)`
  cursor: pointer;
  padding: 2px 3px;
  background: transparent;
  min-width: 120px;
  display: flex;
  justify-content: space-between;
  button {
    ${({ theme }) => theme.mediaWidth.upToSmall`
     padding: 0 3px 0 1px;
  `};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    text-overflow: ellipsis;
    flex-shrink: 1;
    padding: 0;
    min-width: 10px;
  `};
`

const NetworkCardWrapper = styled.div`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     max-width: min-content;
  `};
`

const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text1};
  font-weight: 400;
`
const FlyoutMenu = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  position: absolute;
  top: 70px;
  width: 200px;
  z-index: 99;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 54px;
    left: 0;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    right: 70px;
    left: 0;
  }
  @media screen and (max-width: 400px) {
    right: 30px;
    left: 0;
  }
`
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`

const Selector = styled.div`
  margin-right: 5px;
`
const StyledBox = styled.div`
  font-size: 12px;
  border: 1px solid #e6e6ff;
  padding: 12px;
  border-radius: 4px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
     padding: 10px 20px 10px 20px;
  `};
  :active {
    border: 1px solid #4d8fea;
  }
  :hover {
    transform: scale(0.99);
    transition: 0.2s;
    border: 1px solid #4d8fea;
  }
  position: relative;
`

export const NetworkCard = () => {
  const { chainId, provider, account } = useActiveWeb3React()
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR)
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR)
  const info = chainId ? CHAIN_INFO[chainId] : undefined
  useOnClickOutside(node, open ? toggle : undefined)

  function Row({ targetChain }: { targetChain: number }) {
    const handleRowClick = () => {
      if (chainId !== targetChain && provider && provider?.provider?.isMetaMask) {
        switchToNetwork({ provider, chainId: targetChain })
        toggle()
      }
    }
    const active = chainId === targetChain
    return (
      <FlyoutRow onClick={handleRowClick} active={active}>
        <Logo src={CHAIN_INFO[targetChain].logoUrl} />
        <NetworkLabel>{NETWORK_LABELS[targetChain]}</NetworkLabel>
        {chainId === targetChain && <FlyoutRowActiveIndicator />}
      </FlyoutRow>
    )
  }

  const activeChainName = useMemo(() => chainId && NETWORK_LABELS[chainId], [chainId])
  if (!chainId || !NETWORK_LABELS[chainId] || !info || !provider) {
    return null
  }

  return (
    <StyledBox>
      {account && (
        <Selector ref={node as any}>
          <SelectorControls onClick={() => toggle()}>
            <NetworkCardWrapper style={{ color: '#292933', marginRight: '10px' }}>{activeChainName}</NetworkCardWrapper>
            <ChevronElement showMore={open} setShowMore={toggle} />
          </SelectorControls>

          {open && (
            <FlyoutMenu>
              <FlyoutHeader>
                <Trans>Select a network</Trans>
              </FlyoutHeader>
              {(ENV_SUPPORTED_TGE_CHAINS || [42]).map((chainId) => (
                <Row targetChain={chainId} key={chainId} />
              ))}
            </FlyoutMenu>
          )}
        </Selector>
      )}
    </StyledBox>
  )
}
