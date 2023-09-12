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
  background: ${({ theme }) => theme.config.background?.main || theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`

export const NewOption = styled(FancyButton)<{ active: boolean }>`
  border-radius: 8px;
  margin-right: 8px;
  font-weight: 600;
  font-size: 22px;
  line-height: 40px;
  width: fit-content;
  height: fit-content;
  border: 1px solid #e6e6ff;
  padding: 10px 22px;
  :hover,
  :focus {
    cursor: pointer;
    border: none;
    outline: none;
  }
  :hover {
    background: ${({ theme }) => theme.bg26};
    color: white;
  }
  background: ${({ active, theme }) => (active ? theme.bg26 : theme.bg25)};
  color: ${({ active, theme }) => (active ? 'white' : theme.launchpad.colors.primary)};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%  
  `}
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
  }
  :hover {
    background: ${({ theme }) => theme.bgG6};
  }
  background: ${({ active, theme }) => (active ? theme.bgG6 : theme.bg12)};
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%
  `}
`
export const OptionRow = styled(RowCenter)`
  grid-gap: 0.5rem;
  margin-top: 36px;
  width: 100%;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;  
    margin-top: 24px;
  `}
`

export const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  min-width: 110px;
  max-width: 130px;
  width: 100%;
  height: 60px;
  position: relative;
  padding: 10px 22px;
  flex: 1;
  border: ${({ theme, active, warning }) =>
    warning ? `1px solid ${theme.red1}` : active ? `1px solid ${theme.popUpInputBorder}` : 'none'};
  :hover {
    border: ${({ theme, warning }) => (warning ? `1px solid ${theme.red1}` : `1px solid ${theme.popUpInputBorder}`)};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      max-width: 100%;
  `}
`
