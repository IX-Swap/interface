import { Flex } from 'rebass'
import styled from 'styled-components'

export const Wrapper = styled(Flex)<{ withBackground: boolean }>`
  padding: 8px 12px;
  border-radius: 32px;
  background-color: ${({ theme, withBackground }) => (withBackground ? theme.bg11 : 'none')};
  max-width: ${({ withBackground }) => (withBackground ? 228 : 200)}px;
`
