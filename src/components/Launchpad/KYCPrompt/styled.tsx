import { text11, text9 } from 'components/LaunchpadMisc/typography'
import styled from 'styled-components'

export const KYCPromptContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 480px;
  padding: 3rem 2.5rem;
  gap: 1rem;
  position: relative;

  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 8px;
`

export const KYCPromptIconContainer = styled.div`
  display: grid;
  place-content: center;

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 50%;
  width: 80px;
  height: 80px;
`

export const KYCPromptTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  line-height: 29px;
  letter-spacing: -0.04em;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export const Caption = styled.div`
  ${text11}
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  opacity: 0.6;
`

export const KYCButton = styled.button`
  display: grid;
  place-content: center;
  height: 60px;
  width: 100%;
  text-align: center;
  text-decoration: none;

  ${text9}

  cursor: pointer;
  color: ${(props) => props.theme.launchpad.colors.text.light};
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  outline: 0;
`

export const ExitIconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  svg {
    fill: ${(props) => props.theme.launchpad.colors.text.body};
  }
`
