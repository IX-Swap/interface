import React from 'react'
import LoadingThin from 'assets/images/loader_thin.svg'
import styled, { keyframes } from 'styled-components'
import { SvgIconWrapper } from 'theme'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledRotate = styled.div`
  animation: 2s ${rotate} linear infinite;
  width: fit-content;
`

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export const LoaderThin = ({ size = 16 }: { size?: number; stroke?: string; thin?: boolean; [k: string]: any }) => {
  return (
    <StyledRotate>
      <SvgIconWrapper size={size}>
        <img src={LoadingThin} alt={'Loading...'} />
      </SvgIconWrapper>
    </StyledRotate>
  )
}
