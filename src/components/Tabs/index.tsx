import { RowCenter } from 'components/Row'
import styled from 'styled-components'
import { hexToRGBA } from 'utils/themeHelper'

export const ToggleWrapper = styled(RowCenter)`
  background-color: transparent;
  border-radius: 12px;
  padding: 0px 6px;
  grid-gap: 6px;
  column-gap: 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   flex-direction:column;
   gap: 10px;
  `};
`

export const ToggleOption = styled.div<{ active?: boolean }>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  font-weight: 600;
  font-size: 22px;
  line-height: 40px;
  /* text-transform: uppercase; */
  background-color: transparent;
  color: ${({ theme, active }) => (active ? theme.text2 : hexToRGBA(theme.text2, 0.7))};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
export const Border = styled.div<{ active?: boolean }>`
  height: 2px;
  width: 100%;
  position: absolute;
  top: 100%;
  background: ${({ theme, active }) => (active ? theme.bgG3 : 'transparent')};
`
