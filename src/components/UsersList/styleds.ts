import styled, { css } from 'styled-components'
import { Flex } from 'rebass'
import { Accordion } from '@material-ui/core'

import { BodyRow, HeaderRow } from 'components/Table'
import { ButtonIXSGradient } from 'components/Button'

export const StyledBodyRow = styled(BodyRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  min-width: 950px;
  width: 100%;
  margin-bottom: 0px;
  background-color: transparent;
  border: none;
  > div {
    padding: 24px 10px;
  }
  button {
    min-height: 32px;
    height: 32px;
    font-weight: 600;
    font-size: 14px;
    padding: 8px 24px;
    line-height: 16px;
  }
`

export const StyledHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  min-width: 950px;
  width: 100%;
`

export const AddButton = styled(ButtonIXSGradient)`
  margin-left: 33px;
  max-height: 60px;
  min-width: 135px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-top: 16px;
    margin-left: 0px;
  `};
`

export const TopContent = styled(Flex)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
  `};
`

export const StyledAccordion = styled(Accordion)`
  min-width: 950px;
  width: 100%;
  color: white !important;
  margin: 0px !important;
  border: 1px solid ${({ theme: { bg11 } }) => bg11}!important;
  border-radius: 20px !important;
  margin-bottom: 8px !important;
  background-color: rgba(39, 31, 74, 0.3) !important;
  .MuiAccordionSummary-content {
    margin: 0px !important;
  }
  hr {
    margin: 0 22px;
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.text9};
  }
  .MuiAccordionDetails-root {
    display: grid;
    padding: 0px;
    margin: 0px;
  }
`

export const ExpandIcon = styled.img<{ expanded: boolean }>`
  transform: rotate(0deg);
  transition: transform 250ms ease-in-out;
  margin-left: 28px;
  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(180deg);
    `}
`

export const NoData = styled.div`
  font-weight: 600;
  color: ${({ theme: { text2 } }) => text2};
  text-align: center;
`
