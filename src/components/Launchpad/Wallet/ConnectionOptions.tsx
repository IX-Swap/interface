import React from 'react'
import styled, { useTheme } from 'styled-components'
import { isMobile } from 'react-device-detect'
import { injected } from 'connectors'
import { useWeb3React } from '@web3-react/core'
import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'
import { ExternalLink } from 'theme'
import MetamaskIcon from 'assets/images/metamask.png'
import { text14, text8 } from 'components/LaunchpadMisc/typography'

interface ConnectionOptionsProps {
  onSelect: (option: WalletInfo) => void
}

export const ConnectionOptions: React.FC<ConnectionOptionsProps> = (props) => {
  const theme = useTheme()
  const { connector } = useWeb3React()

  const isMetaMask = window.ethereum && window.ethereum.isMetaMask

  return (
    <OptionList>
      <PromptTitle>Connect Wallet </PromptTitle>
      {Object.entries(SUPPORTED_WALLETS).map(([key, option]) => {
        if (isMobile) {
          if (!(!window.web3 && !window.ethereum && option.mobile)) {
            return null
          }

          return (
            <Option
              key={key}
              id={`connect-${key}`}
              active={option.connector && option.connector === connector}
              onClick={() => option.connector !== connector && !option.href && props.onSelect(option)}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconURL}
            />
          )
        }

        if (option.connector === injected) {
          if (!(window.web3 || window.ethereum)) {
            if (option.name === 'MetaMask') {
              return (
                <Option
                  id={`connect-${key}`}
                  key={key}
                  header="Install Metamask"
                  link={'https://metamask.io/'}
                  icon={MetamaskIcon}
                  color={theme.launchpad.colors.primary}
                  subheader={null}
                />
              )
            } else {
              return null //dont want to return install twice
            }
          } else if ((option.name === 'MetaMask' && !isMetaMask) || (option.name === 'Injected' && isMetaMask)) {
            return null
          }
        }

        return (
          !isMobile &&
          !option.mobileOnly && (
            <Option
              id={`connect-${key}`}
              onClick={() => {
                props.onSelect(option)
                // option.connector === connector
                //   ? setWalletView(WALLET_VIEWS.ACCOUNT)
                //   : !option.href && tryActivation(option.connector)
              }}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null} //use option.descriptio to bring back multi-line
              icon={option.iconURL}
            />
          )
        )
      })}
    </OptionList>
  )
}

interface OptionsProps {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}

const Option: React.FC<OptionsProps> = (props: OptionsProps) => {
  const onClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick()
    }
  }, [])

  const optionButton = (
    <OptionContainer id={props.id} onClick={onClick} clickable={props.clickable && !props.active}>
      <OptionLabel>
        {props.active && (
          <CircleWrapper>
            <GreenCircle />
          </CircleWrapper>
        )}
        {props.header}
      </OptionLabel>

      <IconWrapper size={props.size}>
        <img src={props.icon} alt={'Icon'} />
      </IconWrapper>
    </OptionContainer>
  )

  if (props.link) {
    return <ExternalLink href={props.link}>{optionButton}</ExternalLink>
  }

  return optionButton
}

const PromptTitle = styled.div`
  text-align: center;
  ${text14}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

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
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  height: 40px;
  width: 100%;
  cursor: pointer;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
  }
`

const OptionLabel = styled.div`
  display: flex;

  ${text8}

  color: ${(props) => props.theme.launchpad.colors.primary};
`

const GreenCircle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-left: -16px;
  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
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
