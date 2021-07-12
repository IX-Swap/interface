import React from 'react'
import LoadingThin from 'assets/images/loader_thin.svg'
import styled, { keyframes } from 'styled-components'

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
`
export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export const LoaderThin = ({
  size = 16,
  ...rest
}: {
  size?: number
  stroke?: string
  thin?: boolean
  [k: string]: any
}) => {
  return (
    <StyledRotate>
      <IconWrapper size={size}>
        <img src={LoadingThin} alt={'Loading...'} />
      </IconWrapper>
    </StyledRotate>
  )
}
