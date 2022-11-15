import Portal from "@reach/portal"
import React from "react"
import styled from "styled-components"

interface Props {
  title: React.ReactNode
  body: React.ReactNode
}

interface Position {
  x: number
  y: number
}

export const Tooltip: React.FC<Props & React.PropsWithChildren> = (props) => {
  const container = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<Position | null>(null)
  const [showTooltip, setShowTooltip] = React.useState(false)

  const toggleTooltip = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setShowTooltip(state => !state)
  }, [])

  React.useEffect(() => {
    const rect = container.current?.getBoundingClientRect();
    
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowTooltip(false)
        setPosition(null)
      }
    }

    if (showTooltip) {
      setPosition({
        x: rect!.x + window.scrollX + (rect!.width / 2) - 160, 
        y: rect!.y + window.scrollY - 170 
      })
      
      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    } else {
      setPosition(null)
    }
  }, [showTooltip, container])

  return (
    <>
      <ChildrenWrapper ref={container} onClick={toggleTooltip}>
        {props.children}
      </ChildrenWrapper>

      {showTooltip && position && (
        <Portal>
          <TooltipContainer x={position.x} y={position.y}>
            <header>{props.title}</header>
            <main>{props.body}</main>
          </TooltipContainer>
        </Portal>
      )}
    </>
  )
}

const ChildrenWrapper = styled.div`
  position: relative;

  cursor: pointer;
`

const TooltipContainer = styled.article<{ x: number; y: number }>`
  position: absolute;

  width: 320px;
  height: 160px;

  z-index: 20;

  left: ${props => props.x}px;
  top: ${props => props.y}px;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  box-shadow: 0px 4px 4px rgba(138, 138, 164, 0.1);
  border-radius: 4px;

  padding: 1.5rem;

  header {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;

    line-height: 40px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.title};
  }

  main {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    line-height: 160%;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.body};
  }

  a {
    color: ${props => props.theme.launchpad.colors.primary}
  }
`
