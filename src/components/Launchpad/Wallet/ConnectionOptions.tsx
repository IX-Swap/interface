import React from 'react'
import styled, { useTheme } from 'styled-components'
import { isMobile } from 'react-device-detect'
import { metaMask } from 'connectors/metaMask'
import { useWeb3React } from '@web3-react/core'
import { SUPPORTED_WALLETS, WalletInfo } from 'constants/wallet'
import { ExternalLink } from 'theme'
import MetamaskIcon from 'assets/images/metamask.png'
import { text14, text8 } from 'components/LaunchpadMisc/typography'

interface ConnectionOptionsProps {
  onSelect: (option: WalletInfo) => void
}

export const ConnectionOptions: React.FC<ConnectionOptionsProps> = (props) => {
  const { connector } = useWeb3React()

  // const isMetaMask = window.ethereum && window.ethereum.isMetaMask

  // const handleMetaMaskMobile = () => {
  //   if (isMobile && isMetaMask) {
  //     window.location.href = 'https://metamask.app.link/dapp/https://app.ixswap.io/#/kyc'
  //   }
  // }

  function checkMetamaskAppInstalled() {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const metamaskAppScheme = 'ethereum:'

    const testLink = document.createElement('a')
    testLink.href = metamaskAppScheme
    const isMetamaskAppInstalled = isMobileDevice && typeof testLink.href === 'string'

    return isMetamaskAppInstalled
  }
  const isMetamaskAppInstalled = checkMetamaskAppInstalled()

  return (
    <OptionList>
      {Object.entries(SUPPORTED_WALLETS).map(([key, option]) => {
        if (isMobile && isMetamaskAppInstalled && option.name === 'MetaMask') {
          return (
            <Option
              id={`connect-${key}`}
              onClick={() => {
                if (isMobile) {
                  if (isMetamaskAppInstalled) {
                    window.location.href = 'https://metamask.app.link/dapp/https://app.ixswap.io/#/kyc'
                  } else {
                    console.log('Metamask app is not installed')
                  }
                }
              }}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconURL}
            />
          )
        }
        if (option.connector === metaMask) {
          if (!(window.web3 || window.ethereum)) {
            if (option.name === 'MetaMask') {
              return (
                <Option
                  id={`connect-${key}`}
                  key={key}
                  color={'#E8831D'}
                  header={<p>Install Metamask</p>}
                  subheader={null}
                  link={'https://metamask.io/'}
                  icon={MetamaskIcon}
                />
              )
            } else {
              return null //dont want to return install twice
            }
          }
          // else if (!(window.web3 || window.ethereum)) {
          //   if (option.name === 'MetaMask') {
          //     return (
          //       <Option
          //         id={`connect-${key}`}
          //         key={key}
          //         header="Metamask"
          //         link={`https://metamask.app.link/dapp/https://app.ixswap.io/#/kyc`}
          //         icon={MetamaskIcon}
          //         color={theme.launchpad.colors.primary}
          //         subheader={null}
          //       />
          //     )
          //   } else {
          //     return null //don't want to return install twice
          //   }
          // } else if ((option.name === 'MetaMask' && !isMetaMask) || (option.name === 'Injected' && isMetaMask)) {
          //   return null
          // }
        }

        return (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              props.onSelect(option)
              // handleMetaMaskMobile()
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconURL}
          />
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
      <IconWrapper size={props.size}>
        <img src={props.icon} alt={'Icon'} />
      </IconWrapper>
      <OptionLabel>
        {/* {props.active && (
          <CircleWrapper>
            <GreenCircle />
          </CircleWrapper>
        )} */}
        {props.header}
      </OptionLabel>
    </OptionContainer>
  )

  if (props.link) {
    return <ExternalLink href={props.link}>{optionButton}</ExternalLink>
  }

  return optionButton
}

// const PromptTitle = styled.div`
//   text-align: left;
//   ${text14}
//   color: ${(props) => props.theme.launchpad.colors.text.title};
// `

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
  // justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  gap: 10px;
  height: 10px;
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

// const GreenCircle = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   margin-left: -16px;
//   &:first-child {
//     height: 8px;
//     width: 8px;
//     margin-right: 8px;
//     background-color: ${({ theme }) => theme.green1};
//     border-radius: 50%;
//   }
// `

// const CircleWrapper = styled.div`
//   color: ${({ theme }) => theme.green1};
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

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
