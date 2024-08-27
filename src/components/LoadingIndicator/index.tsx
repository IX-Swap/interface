import React from 'react'
import styled from 'styled-components'

import { LoaderThin } from 'components/Loader/LoaderThin'

interface Props {
  isLoading: boolean
  size?: number
  isRelative?: boolean
  isPayout?: boolean
}

export const LoadingIndicator = ({ isLoading, size = 48, isRelative = false, isPayout }: Props) => {
  if (!isLoading) return null

  return (
    <Loader isPayout={isPayout} isRelative={isRelative}>
      <LoaderThin size={size} />
    </Loader>
  )
}

const Loader = styled.div<{ isRelative: boolean; isPayout?: boolean }>`
  position: ${({ isRelative }) => (isRelative ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  width: ${({ isRelative }) => (isRelative ? '100%' : '100vw')};
  height: ${({ isRelative }) => (isRelative ? '100%' : '100vh')};
  background-color: ${({ isPayout }) => (isPayout ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`;

