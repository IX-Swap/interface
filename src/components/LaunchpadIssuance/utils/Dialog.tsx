import Portal from '@reach/portal'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'

interface Props {
  title: React.ReactNode
  show: boolean

  onClose?: () => void
}

export const IssuanceDialog: React.FC<React.PropsWithChildren<Props>> = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <Portal>
      <DialogWrapper>
        <DialogContainer>
          <DialogCloseButton onClick={props.onClose}>
            <X size={14} />
          </DialogCloseButton>

          <DialogTitle>
            {props.title}
          </DialogTitle>

          {props.children}
        </DialogContainer>
      </DialogWrapper>
    </Portal>
  )
}

const DialogWrapper = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;

  backdrop-filter: blur(5px);
  background: ${props => props.theme.launchpad.colors.text.title + '1e'};
  
  z-index: 30;
`

const DialogCloseButton = styled.div`
  position: absolute;

  top: -2.5rem;
  right: -2.5rem;

  display: grid;
  place-content: center;

  cursor: pointer;

  padding: 0.75rem;

  background: rgba(41, 41, 51, 0.6);
  box-shadow: 0px 2px 2px rgba(122, 122, 204, 0.08);
  backdrop-filter: blur(8px);

  border-radius: 16px;

  transition: transform 0.3s;

  :hover {
    transform: scale(1.1);
  }
`

const DialogContainer = styled.div`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  gap: 1rem;

  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 16px;

  padding: 2rem;

  width: 480px;
  height: 250px;

`

const DialogTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  /* identical to box height, or 26px */

  letter-spacing: -0.03em;
  text-transform: capitalize;

  color: #292933;
`
