import { IssuanceTable, Raw } from 'components/LaunchpadMisc/tables'
import styled, { css } from 'styled-components'
import { TableHeader, TableRow } from 'components/LaunchpadIssuance/utils/tables'
import { Box } from 'rebass'

export const Container = styled.div`
  max-width: 1180px;
  margin: auto;
  width: 100%;

  overflow: hidden;
  position: relative;

  .wrap {
    width: 100%;
    display: inline-block;
    overflow-x: scroll;

    /* height */
    ::-webkit-scrollbar {
      height: 12px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #ededf7;
      border-radius: 8px;
      height: 8px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #ffffff;
      border: 1px solid  #ededf7;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #ffffff;
    }
  }

  .overlay-gradient {
    width: 58px;
    height: 100%;
    position: absolute;
    right: 0;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  }
  .hidden {
    visibility: hidden;
  }
`
export const OverflowIssuanceTable = styled(IssuanceTable)`
  overflow-x: scroll;
  max-width: unset;
  width: fit-content;
  margin: unset;
`
export const UnpaddedOverflowIssuanceTable = styled(OverflowIssuanceTable)`
  padding-bottom: 0;
  overflow-x: unset;
`
export const columnTemplate = (count: number) => css`
  grid-template-columns: repeat(${Number(count) - 1}, minmax(125px, 1fr)) 155px;
  grid-auto-flow: column;
  grid-gap: 80px;
  grid-auto-columns: minmax(160px, 1fr);
`
export const OverflowHeader = styled(TableHeader)<{ count: number }>`
  ${(props) => columnTemplate(props.count)}
`
export const OverflowRow = styled(TableRow)<{ count: number }>`
  ${(props) => columnTemplate(props.count)}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`
export const OverflowRaw = styled(Raw)`
  overflow: visible;
`
export const SpreadColumn = styled(OverflowRaw)`
  display: flex;
  gap: 70px;
  justify-content: space-between;
`

export const JoinedCell = styled.span`
  width: 100%;
  display: grid;
  grid-template-rows: 100%;
  grid-auto-rows: 100%;
  align-items: flex-start;
  grid-template-columns: 1fr 1fr;
`
export const TablesParent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
