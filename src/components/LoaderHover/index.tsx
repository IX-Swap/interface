import React from 'react';
import styled, { css } from 'styled-components';

import { LoaderThin } from 'components/Loader/LoaderThin';

interface LoaderHoverProps {
  isPayout?: boolean;
}

export const LoaderHover = styled.div<LoaderHoverProps>`
  z-index: 5;
  opacity: 0.4;
  display: flex;
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

  /* Conditionally apply background-color */
  ${({ isPayout }) =>
    !isPayout &&
    css`
      background-color: #380846;
    `}
`;

interface LoadableProps {
  loading: boolean;
  isPayout?: boolean;
}

export const Loadable: React.FC<React.PropsWithChildren<LoadableProps>> = ({
  loading,
  isPayout,
  children,
}) => {
  return (
    <>
      {loading && (
        <LoaderHover isPayout={isPayout}>
          <LoaderThin size={64} />
        </LoaderHover>
      )}
      {children}
    </>
  );
};
