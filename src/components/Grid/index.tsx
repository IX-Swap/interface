import styled, { css } from 'styled-components'

import { MEDIA_WIDTHS } from 'theme'

interface GridContainerProps {
  spacing?: number
}

export const GridContainer = styled.div<GridContainerProps>`
  display: flex;
  flex-wrap: wrap;
  margin: ${({ spacing = 0 }) => `${-spacing}px`};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
  > div {
    flex: 0 0 calc(16% - ${({ spacing = 0 }) => `${spacing}px`});
    margin: ${({ spacing = 0 }) => `${spacing}px`};
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    > div {
      flex: 0 0 calc(50% - ${({ spacing = 0 }) => `${spacing}px`});
    }
  }
`

interface GridItemProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  spacing?: number // Add spacing prop here
}

export const GridItem = styled.div<GridItemProps>`
  width: 100%;

  @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex: 0 0 calc(33.33% - ${({ spacing = 0 }) => `${spacing}px`});
  }

  @media (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    flex: 0 0 calc(25% - ${({ spacing = 0 }) => `${spacing}px`});
  }

  @media (min-width: ${MEDIA_WIDTHS.upToLarge}px) {
    flex: 0 0 calc(20% - ${({ spacing = 0 }) => `${spacing}px`});
  }
`
