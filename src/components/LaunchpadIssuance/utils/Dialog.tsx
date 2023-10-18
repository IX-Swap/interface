import Portal from '@reach/portal'
import { text48 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'

interface Props {
  show: boolean

  title?: React.ReactNode

  width?: string
  height?: string
  padding?: string

  onClose?: () => void
}

export const IssuanceDialog: React.FC<React.PropsWithChildren<Props>> = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <Portal>
      <DialogWrapper onScroll={(e) => e.stopPropagation()}>
        <OuterContainer>
          <DialogCloseButton onClick={props.onClose}>
            <X size={14} />
          </DialogCloseButton>

          <DialogContainer width={props.width} height={props.height} padding={props.padding}>
            {props.title && <DialogTitle>{props.title}</DialogTitle>}

            <Content>{props.children}</Content>
          </DialogContainer>
        </OuterContainer>
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
  background: ${(props) => props.theme.launchpad.colors.text.title + '1e'};

  z-index: 30;
  * {
    font-family: 'Inter' !important;
  }
`

const DialogCloseButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  display: grid;
  color: #b8b8cc;
  place-content: center;
  cursor: pointer;
  // padding: 0.75rem;
  z-index: 40;
  // background: rgba(41, 41, 51, 0.6);
  // box-shadow: 0px 2px 2px rgba(122, 122, 204, 0.08);
  // backdrop-filter: blur(8px);
  // border-radius: 16px;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.1);
  }

  @media screen and (max-height: 830px) {
    top: 0;
    right: -2.7rem;
  }
`
const OuterContainer = styled.div`
  position: relative;
  max-height: 100vh;
`
const DialogContainer = styled.div<{ height?: string; width?: string; padding?: string }>`
  position: relative;

  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 16px;

  padding: ${(props) => props.padding ?? '2rem'};

  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.height && `height: ${props.height};`}

  max-height: 100vh;
  overflow-y: scroll;
`

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 1rem;
`

const DialogTitle = styled.div`
  ${text48}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
