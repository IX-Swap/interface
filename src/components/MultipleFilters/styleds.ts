import styled from 'styled-components'
import { Popover } from '@material-ui/core'

import { ButtonText } from 'components/Button'
import { MEDIA_WIDTHS } from 'theme'

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    grid-template-columns: 1fr;
    // display: none;
  }
`

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  .dropdown {
    // min-width: 160px;
    border-radius: 0;
  }
  > div:nth-child(2) {
    border-radius: 6px;
    margin-left: -20px;
  }
  > div:second-child {
    border-radius: 6px;
  }
  > div:last-child {
 border-radius: 6px;
  }
`

export const DarkBlueCard = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: left;
  justify-content: left;
  flex: 1;
  min-width: 150px;
  width: 100%;
  height: 60px;
  cursor: pointer;
  font-weight: 500;
  padding: 18px;
  font-size: 13px;
  border: 1px solid #e6e6ff;
  // background-color: ${({ theme, isOpen }) => (isOpen ? theme.bg7 : theme.bg19)};
  color: ${({ theme, isOpen }) => (isOpen ? theme.text6 : theme.text6)};
`

export const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 2px;
    // background-color: ${({ theme }) => theme.bg7};
    border: 1px solid #e6e6ff;
    border-radius: 8px;
    // padding: 10px;
    max-height: 216px;
    overflow: hidden;
  }
`

export const PopOverContent = styled.div`
  overflow: auto;
  display: grid;
  gap: 8px;
  flex-direction: column;
  padding: 40px;
  color: #8f8fb2;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  max-height: 192px;
  button {
    border: none;
    height: 32px;
  }
`

export const Icon = styled.div`
  width: 20px;
  height: 20px;
  svg,
  img {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
  }
`

export const ResetFilters = styled(ButtonText)`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  // color: ${({ theme }) => theme.text2};
  white-space: nowrap;
  text-decoration: underline;
`
