import React from 'react'
import styled from 'styled-components'

import { LoaderThin } from 'components/Loader/LoaderThin'

interface Props {
  isLoading: boolean
}

export const LoadingIndicator = ({ isLoading }: Props) => {
  if (!isLoading) return null

  return (
    <Loader>
      <LoaderThin size={48} />
    </Loader>
  )
}

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`
