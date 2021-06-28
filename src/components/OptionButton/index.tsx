import { RowCenter } from 'components/Row'
import styled from 'styled-components'

export const FancyButton = styled.button`
  color: ${({ theme }) => theme.text1};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 1rem;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  background: ${({ theme }) => theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`

export const Option = styled(FancyButton)<{ active: boolean }>`
  margin-right: 8px;
  font-weight: 600;
  font-size: 22px;
  line-height: 40px;
  width: fit-content;
  height: fit-content;
  border: none;
  padding: 10px 22px;
  :hover,
  :focus {
    cursor: pointer;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.bgG6};
  }
  background: ${({ active, theme }) => (active ? theme.bgG6 : theme.bg7)};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
`
export const OptionRow = styled(RowCenter)`
  grid-gap: 0.5rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;  
  `}
`

export const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  max-width: 130px;
  height: 60px;
  position: relative;
  padding: 10px 22px;
  flex: 1;
  border: ${({ theme, active, warning }) =>
    warning ? `1px solid ${theme.red1}` : active ? `1px solid ${theme.popUpInputBorder}` : 'none'};
  :hover {
    border: ${({ theme, warning }) => (warning ? `1px solid ${theme.red1}` : `1px solid ${theme.popUpInputBorder}`)};
  }
`
