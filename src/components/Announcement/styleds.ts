import styled from 'styled-components'

import { RowCenter } from 'components/Row'

export const Card = styled(RowCenter)`
  height: 40px;
  align-items: center;
  background-color: ${({ theme }) => theme.bg10};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    height: 100%;
    padding: 16px;
  `};
`
