import styled from 'styled-components'

import { gradientBorder } from 'theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 30px;
  background: ${({ theme }) => theme.bgG12};
  font-size: 16px;
  line-height: 150%;

  ${gradientBorder}
  :before {
    border-radius: 30px;
    padding: 1px;
  }
`
