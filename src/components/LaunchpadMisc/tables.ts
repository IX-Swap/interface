import styled from "styled-components"

import { IssuanceFilter } from '../LaunchpadIssuance/types'

export const TableTitle = styled.div`
  grid-area: title;

  place-self: center start;

  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  margin: auto;
  padding: 0 0 1.25rem;

  width: 100%;
  max-width: 1180px;

  font-family: ${props => props.theme.launchpad.font};

  color: ${props => props.theme.launchpad.colors.text.title};
`

export const IssuanceTable = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;

  width: 100%;
  max-width: 1180px;

  margin: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  > :nth-child(even) {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`



export const TableHeader = styled.div<{ tab: IssuanceFilter }>`
  display: grid;

  grid-template-rows: 60px;

  ${props => props.tab === IssuanceFilter.pending && `
    grid-template-columns: 4fr repeat(3, 2fr);
  `}
  
  ${props => props.tab !== IssuanceFilter.pending && `
    grid-template-columns: 1.5fr repeat(6,1fr) 1.5fr;
  `}

  place-content: center start ;
  align-items: center;

  gap: ${props => props.tab === IssuanceFilter.pending ? '2rem' : '1rem'};

  height: 65px;
  width: 100%;

  padding: 0.25rem 1rem;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 1.5rem;
  letter-spacing: -0.01em;
  
  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

export const IssuanceRow = styled(TableHeader)<{ tab: IssuanceFilter }>`

  color: ${props => props.theme.launchpad.colors.text.title};

  opacity: 0.8;
`

export const Raw = styled.div`
  font-family:  ${props => props.theme.launchpad.font};
`

export const DefaultRaw = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.25rem;
  letter-spacing: -0.01em;

  opacity: 0.8;

  font-family:  ${props => props.theme.launchpad.font};

  color: ${props => props.theme.launchpad.colors.text.bodyAlt}
`

export const CountRow = styled.div`
  opacity: 0.8;
  font-family:  ${props => props.theme.launchpad.font};
  color: ${props => props.theme.launchpad.colors.text.bodyAlt}
`