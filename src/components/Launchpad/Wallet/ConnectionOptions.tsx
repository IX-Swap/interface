import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Connector, useConnect } from 'wagmi'

import { text8 } from 'components/LaunchpadMisc/typography'
import { useOrderedConnections } from './useOrderedConnections'
import { CONNECTOR_ICON_OVERRIDE_MAP } from 'components/Web3Provider/constants'
import { isIFramed } from 'utils/isIFramed'
import Loader from 'components/Icon/LoadingSpinner'
import { Flex } from 'rebass'

interface ConnectionOptionsProps {
  onClose: () => void
}

export const ConnectionOptions: React.FC<ConnectionOptionsProps> = ({ onClose }) => {
  const connectors = useOrderedConnections()

  console.log('connectors', connectors)
  return (
    <OptionList>
      {connectors.map((item: any) => {
        return <Option key={item.id} connector={item} onClose={onClose} />
      })}
    </OptionList>
  )
}

interface OptionsProps {
  connector: Connector
  onClose: () => void
}

const Option: React.FC<OptionsProps> = ({ connector, onClose }: OptionsProps) => {
  const connection = useConnect()
  const icon = CONNECTOR_ICON_OVERRIDE_MAP[connector.id] ?? connector.icon
  const isDisabled = Boolean(connection?.isPending && !isIFramed())
  const isPendingConnection = connection.isPending && connection.variables?.connector === connector
  const isSuccessConnection = connection.isSuccess && connection.variables?.connector === connector

  const handleConnect = () => {
    connection.connect({ connector })
  }
  useEffect(() => {
    if (isSuccessConnection) {
      onClose()
    }
  }, [isSuccessConnection, onClose])

  return (
    <OptionContainer id={connector.id} onClick={handleConnect} disabled={isDisabled} clickable={!isDisabled}>
      <Flex alignItems="center" style={{ gap: 10 }}>
        <IconWrapper size={20}>
          <img src={icon} alt={'Icon'} style={{ borderRadius: 12 }} />
        </IconWrapper>
        <OptionLabel>{connector.name}</OptionLabel>
      </Flex>

      {isPendingConnection ? <Loader /> : null}
    </OptionContainer>
  )
}

const OptionList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  margin: 1rem 0;
`

const OptionContainer = styled.button<{ clickable?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  height: 10px;
  width: 100%;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'not-allowed')};
  }
`

const OptionLabel = styled.div`
  display: flex;
  ${text8}
  color: ${(props) => props.theme.launchpad.colors.primary};
`

const IconWrapper = styled.div<{ size?: number | null }>`
  display: grid;
  place-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '15px')};
    width: ${({ size }) => (size ? size + 'px' : '15px')};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`
