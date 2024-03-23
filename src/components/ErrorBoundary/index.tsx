import { Trans } from '@lingui/macro'
import React, { ErrorInfo } from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components/macro'
import { TYPE } from '../../theme'
import { AutoColumn, ColumnCenter } from '../Column'
import { AutoRow } from '../Row'

const FallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  z-index: 1;
`

const BodyWrapper = styled.div<{ margin?: string }>`
  padding: 1rem;
  width: 100%;
`

const CodeBlockWrapper = styled.div`
  background: ${({ theme }) => theme.bg0};
  overflow: auto;
  white-space: pre;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  padding: 18px 24px;
  color: ${({ theme }) => theme.text1};
`

const SomethingWentWrongWrapper = styled.div`
  padding: 6px 24px;
`

type ErrorBoundaryState = {
  error: Error | null
  isChunkError: boolean
}

export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props)
    this.state = { error: null, isChunkError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, isChunkError: /Loading chunk [\d]+ failed/.test(error.message) }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ReactGA.exception({
      ...error,
      ...errorInfo,
      fatal: true,
    })
  }

  render() {
    const { error, isChunkError } = this.state

    if (error !== null && isChunkError) {
      return (
        <FallbackWrapper style={{ height: '100vh', textAlign: 'center' }}>
          <BodyWrapper style={{ height: '100%' }}>
            <ColumnCenter style={{ justifyContent: 'center', height: '100%' }}>
              <SomethingWentWrongWrapper>
                <TYPE.label fontSize={24} fontWeight={600}>
                  <Trans>Error occured while loading the content</Trans>
                </TYPE.label>

                <TYPE.label fontSize={20} fontWeight={600}>
                  <Trans>Please, refresh the page</Trans>
                </TYPE.label>
              </SomethingWentWrongWrapper>
            </ColumnCenter>
          </BodyWrapper>
        </FallbackWrapper>
      )
    } else if (error !== null) {
      // find out what is this const encodedBody = encodeURIComponent(issueBody(error))
      return (
        <FallbackWrapper>
          <BodyWrapper>
            <AutoColumn gap={'md'}>
              <SomethingWentWrongWrapper>
                <TYPE.label fontSize={24} fontWeight={600}>
                  <Trans>Something went wrong</Trans>
                </TYPE.label>
              </SomethingWentWrongWrapper>
              <CodeBlockWrapper>
                <code>
                  <TYPE.main fontSize={10}>{error.stack}</TYPE.main>
                </code>
              </CodeBlockWrapper>
              <AutoRow></AutoRow>
            </AutoColumn>
          </BodyWrapper>
        </FallbackWrapper>
      )
    }
    return (this.props as any).children
  }
}
