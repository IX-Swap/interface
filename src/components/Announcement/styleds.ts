import styled from 'styled-components'

import { RowCenter } from 'components/Row'

export const Card = styled(RowCenter)`
  height: 40px;
  align-items: center;
  background: radial-gradient(24.62% 985% at 50% 50%, #9191FE 0%, #6666FF 100%);
  
  ${({ theme }) => theme.mediaWidth.upToLarge`
    height: 100%;
    padding: 16px;
  `};
  line {
    stroke: inherit;
  }
`;

