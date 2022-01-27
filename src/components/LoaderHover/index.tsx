import React from 'react'
import styled from 'styled-components'

import { LoaderThin } from 'components/Loader/LoaderThin'

export const LoaderHover = styled.div`
  z-index: 5;
  opacity: 0.4;
  display: flex;
  background-color: #380846;

  color: #ffffff;
  pointer-events: auto;

  align-items: center;
  justify-content: center;
  position: fixed;
  border-radius: inherit;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100%;
  width: 100%;

  transition: inherit;
  will-change: opacity;
  box-sizing: inherit;
`
interface LoadableProps {
  loading: boolean
}

export const Loadable: React.FC<LoadableProps> = (props: React.PropsWithChildren<LoadableProps>) => {
  return (
    <>
      {props.loading && (
        <LoaderHover>
          <LoaderThin size={64} />
        </LoaderHover>
      )}

      {props.children}
    </>
  )
}
