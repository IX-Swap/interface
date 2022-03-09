import React from 'react'
import styled, { css } from 'styled-components'

import { MEDIA_WIDTHS } from 'theme'

export const GridContainer = styled.div<{ spacing?: number }>`
  display: flex;
  margin: ${({ spacing = 0 }) => `${-spacing}px 0 0 ${-spacing}px`};
  width: ${({ spacing = 0 }) => `calc(100% + ${spacing}px)`};
  flex-flow: row wrap;
  > div {
    padding-left: ${({ spacing = 0 }) => `${spacing}px`};
    padding-top: ${({ spacing = 0 }) => `${spacing}px`};
  }
`
export const GridItem = styled.div<{ xs?: number; sm?: number; md?: number; lg?: number; xl?: number }>`
  ${({ xs }) =>
    xs &&
    css`
      @media (min-width: 1px) {
        width: ${`${(xs * 100) / 12}%`};
      }
    `};
  ${({ sm }) =>
    sm &&
    css`
      @media (min-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        width: ${`${(sm * 100) / 12}%`};
      }
    `};
  ${({ md }) =>
    md &&
    css`
      @media (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
        width: ${`${(md * 100) / 12}%`};
      }
    `};
  ${({ lg }) =>
    lg &&
    css`
      @media (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
        width: ${`${(lg * 100) / 12}%`};
      }
    `};
  ${({ xl }) =>
    xl &&
    css`
      @media (min-width: ${MEDIA_WIDTHS.upToLarge}px) {
        width: ${`${(xl * 100) / 12}%`};
      }
    `};
  width: 100%;
`
