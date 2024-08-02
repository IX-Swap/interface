import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'

import { ReactComponent as OpenLink } from '../../assets/images/open-link.svg'
import { ReactComponent as Disconnect } from '../../assets/images/disconnect.svg'
import Copy from './Copy'
import { useWeb3React } from 'connection/web3reactShim'
import { shortAddress } from 'utils'
import { StatusIcon } from 'components/Web3Status'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

interface WalletInfoProps {
  ENSName?: string
  disconnectWallet: () => void
}

const WalletInfo: React.FC<WalletInfoProps> = ({ ENSName = '', disconnectWallet }) => {
  const { account, chainId } = useWeb3React()
  const explorerLink = chainId ? getExplorerLink(chainId, account || '', ExplorerDataType.ADDRESS) : ''

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-between">
        <LeftLabel>Connected</LeftLabel>

        <DisconnectLink onClick={disconnectWallet}>
          <Disconnect /> Disconnect Wallet
        </DisconnectLink>
      </Flex>
      <BoxContainer>
        <Flex alignItems="center" style={{ gap: 8 }}>
          <StatusIcon />
          <Address>{account ? shortAddress(account) : ENSName}</Address>
        </Flex>

        <Flex alignItems="center">
          <Copy toCopy={account || ''} />
          <OpenLinkButton href={explorerLink} target="_blank">
            <OpenLink />
          </OpenLinkButton>
        </Flex>
      </BoxContainer>
    </Container>
  )
}

export default WalletInfo

const BoxContainer = styled.div`
  border-radius: 8px;
  margin-top: 12px;
  border: 1px solid #e6e6ff;
  background: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Address = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #292933;
`

const OpenLinkButton = styled.a`
  background: none;
  border: none;
  cursor: pointer;
`

const LeftLabel = styled.div`
  color: #666680;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 17.6px */
  letter-spacing: -0.22px;
`

const DisconnectLink = styled.div`
  color: rgba(255, 109, 109, 0.9);
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.42px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

const Container = styled.div`
  margin-top: 8px;
`
