import { ToggleWrapper } from 'components/Tabs'
import styled from 'styled-components/macro'
import { gradientBorder } from 'theme'
import { hexToRGBA } from 'utils/themeHelper'
import { AutoColumn } from '../Column'
import Row, { RowBetween, RowFixed } from '../Row'

export const ModalInfo = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 1rem 1rem;
  margin: 0.25rem 0.5rem;
  justify-content: center;
  flex: 1;
  user-select: none;
`
export const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`

export const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 100;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  color: ${({ theme }) => theme.text2};
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  font-size: 1rem;
  text-align: left;
  top: 80px;
`

export const TextDot = styled.div`
  height: 3px;
  width: 3px;
  background-color: ${({ theme }) => theme.text2};
  border-radius: 50%;
`

export const FadedSpan = styled(RowFixed)`
  color: ${({ theme }) => theme.primary1};
  font-size: 14px;
`

export const PaddedColumn = styled(AutoColumn)`
  padding: 20px;
`
export const PaddedColumnList = styled(AutoColumn)`
  padding: 0 0 0 24px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0 0 0 1rem;
  `};
`
export const PaddedColumn40 = styled(PaddedColumn)`
  padding-left: 40px;
  padding-right: 40px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding-left: 1rem;
      padding-right: 1rem;
  `};
`
export const MenuItem = styled(RowBetween)`
  padding: 4px 40px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background: ${({ theme, disabled }) => !disabled && `${hexToRGBA(theme.bg10, 0.1)}`};
    backdrop-filter: blur(4px);
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`
export const UnapprovedMenuItem = styled(Row)`
  padding: 4px 16px;
  height: 56px;
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background: ${({ theme, disabled }) => !disabled && `${hexToRGBA(theme.bg10, 0.1)}`};
    backdrop-filter: blur(4px);
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 15px 22px;
  align-items: center;
  white-space: nowrap;
  border: none;
  outline: none;
  border-radius: 36px;
  color: ${({ theme }) => theme.text8};
  border: none;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.bg11};
  font-size: 20px;
  line-height: 40px;
  width: 100%;
  height: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text8};
  }
  transition: border 100ms;
  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0px 22px;
  `};
`
export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text2};
  opacity: 0.4;
`

export const SeparatorDark = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`

export const UnapprovedTokenWrapper = styled.div`
  ${gradientBorder}
  padding-left: 24px;
  padding-right: 21px;
  align-items: center;
  display: grid;
  width: 100%;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  text-decoration: none;
  color: white;
`

export const StyledToggleWrapper = styled(ToggleWrapper)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
   flex-direction:row;
   gap: 0px;
  `};
`
