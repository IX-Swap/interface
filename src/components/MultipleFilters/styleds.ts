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
`

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1px;
  .dropdown {
    min-width: 160px;
    border-radius: 0;
  }
  > div:first-child {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  > div:last-child {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`

export const DarkBlueCard = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 176px;
  width: 100%;
  height: 60px;
  cursor: pointer;
  font-weight: 500;
  padding: 18px;
  background-color: ${({ theme, isOpen }) => (isOpen ? theme.bg7 : theme.bg19)};
  color: ${({ theme, isOpen }) => (isOpen ? theme.text2 : theme.text9)};
`

export const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    margin-top: 2px;
    background-color: ${({ theme }) => theme.bg7};
    border-radius: 30px;
    padding: 12px;
    max-height: 216px;
    overflow: hidden;
  }
`

export const PopOverContent = styled.div`
  overflow: auto;
  display: grid;
  gap: 8px;
  flex-direction: column;
  padding-right: 16px;
  color: white;
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
  }
  margin-right: 4px;
`

export const ResetFilters = styled(ButtonText)`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  white-space: nowrap;
  text-decoration: underline;
`
