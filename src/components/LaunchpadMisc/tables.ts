import styled from 'styled-components'

import { IssuanceFilter } from '../LaunchpadIssuance/types'
import { text42, text53 } from './typography'

export const TableTitle = styled.div`
  grid-area: title;
  place-self: center start;

  ${text53}

  margin: auto;
  padding: 0 0 1.25rem;
  width: 100%;
  max-width: 1180px;
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

export const IssuanceTable = styled.div<{ maxWidth?: string; hideBorder?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1180px'};

  margin: auto;
  border: ${(props) => (props.hideBorder ? 'none' : `1px solid ${props.theme.launchpad.colors.border.default}`)};
  border-radius: 8px;
  > :nth-child(even) {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`

export const TableHeader = styled.div<{ tab: IssuanceFilter }>`
  display: grid;
  grid-template-rows: 60px;
  ${(props) =>
    props.tab === IssuanceFilter.pending &&
    `
    grid-template-columns: repeat(4, 1fr);
  `}
  ${(props) =>
    props.tab !== IssuanceFilter.pending &&
    `
    grid-template-columns: 1.5fr repeat(6,1fr) 1.5fr;
  `}
  place-content: center start;
  align-items: center;
  gap: ${(props) => (props.tab === IssuanceFilter.pending ? '2rem' : '1rem')};
  height: 65px;
  width: 100%;
  padding: 0.25rem 1.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

export const IssuanceRow = styled(TableHeader)<{ tab: IssuanceFilter }>`
  color: ${(props) => props.theme.launchpad.colors.text.title};
  opacity: 0.8;
`

export const Raw = styled.div`
  font-family: ${(props) => props.theme.launchpad.font};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const DefaultRaw = styled.div`
  ${text42}
  opacity: 0.8;
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

export const CountRow = styled.div`
  opacity: 0.8;
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

export const Title = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  font-family: ${(props) => props.theme.launchpad.font};
`
