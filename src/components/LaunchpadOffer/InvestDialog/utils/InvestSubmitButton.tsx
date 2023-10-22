import { text9 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

export enum InvestSubmitState {
  default = 'default',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

interface Props {
  state: InvestSubmitState
  disabled?: boolean
  onSubmit?: () => void
}

export function useInvestSubmitState() {
  const [state, setState] = React.useState(InvestSubmitState.default)

  return {
    current: state,
    setDefault: () => setState(InvestSubmitState.default),
    setLoading: () => setState(InvestSubmitState.loading),
    setSuccess: () => setState(InvestSubmitState.success),
    setError: () => setState(InvestSubmitState.error),
  }
}

export const InvestFormSubmitButton: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <SubmitButton type="submit" state={props.state} disabled={props.disabled} onClick={props.onSubmit}>
      {props.children}
    </SubmitButton>
  )
}

const SubmitButton = styled.button<{ state: InvestSubmitState; disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.state === InvestSubmitState.default &&
    `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
    border: none;
    ${
      props.disabled &&
      `
      background: ${props.theme.launchpad.colors.text.bodyAlt};
    `
    }
  `}

  ${(props) =>
    props.state === InvestSubmitState.loading &&
    `
    background: ${props.theme.launchpad.colors.primary + '1a'};
    color: ${props.theme.launchpad.colors.primary};
    border: 1px solid ${props.theme.launchpad.colors.primary};
  `}

  ${(props) =>
    props.state === InvestSubmitState.success &&
    `
    background: ${props.theme.launchpad.colors.success + '1a'};
    color: ${props.theme.launchpad.colors.success};
    border: 1px solid ${props.theme.launchpad.colors.success};
  `}

  ${(props) =>
    props.state === InvestSubmitState.error &&
    `
    background: ${props.theme.launchpad.colors.error + '1a'};
    color: ${props.theme.launchpad.colors.error};
    border: 1px solid ${props.theme.launchpad.colors.error};
  `}
  
  ${(props) => !props.disabled && 'cursor: pointer;'}


  border-radius: 6px;
  height: 50px;

  ${text9}
`

export const InvestInfoMessage = styled.div<{ state: InvestSubmitState; disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.state === InvestSubmitState.default &&
    `
    background: ${props.theme.launchpad.colors.primary};
    color: ${props.theme.launchpad.colors.text.light};
    border: none;
  `}

  ${(props) =>
    props.state === InvestSubmitState.loading &&
    `
    background: ${props.theme.launchpad.colors.primary + '1a'};
    color: ${props.theme.launchpad.colors.primary};
    border: 1px solid ${props.theme.launchpad.colors.primary};
  `}

  ${(props) =>
    props.state === InvestSubmitState.success &&
    `
    background: ${props.theme.launchpad.colors.success + '1a'};
    color: ${props.theme.launchpad.colors.success};
    border: 1px solid ${props.theme.launchpad.colors.success};
  `}

  ${(props) =>
    props.state === InvestSubmitState.error &&
    `
    background: ${props.theme.launchpad.colors.error + '1a'};
    color: ${props.theme.launchpad.colors.error};
    border: 1px solid ${props.theme.launchpad.colors.error};
  `}

  border-radius: 6px;
  height: 60px;
  ${text9}
`
