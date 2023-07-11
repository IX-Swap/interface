import React from 'react'
import Portal from '@reach/portal'
import styled from 'styled-components'
import { text2, text7 } from 'components/LaunchpadMisc/typography'

interface Props {
  title: React.ReactNode
  body: React.ReactNode
}

interface Position {
  x: number
  y: number
}

export const Tooltip: React.FC<Props & React.PropsWithChildren> = (props) => {
  const timeout = React.useRef<NodeJS.Timeout>()
  const container = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<Position | null>(null)
  const [showTooltip, setShowTooltip] = React.useState(false)

  const toggleTooltip = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setShowTooltip(true)
  }, [])

  const startTooltipTimer = React.useCallback(() => {
    timeout.current = setTimeout(() => setShowTooltip(false), 500)
  }, [])

  const clearTooltipTimer = React.useCallback(() => {
    if (!timeout.current) {
      return
    }

    clearTimeout(timeout.current)
  }, [timeout])

  React.useEffect(() => {
    const rect = container.current?.getBoundingClientRect()
    if (!rect) return
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowTooltip(false)
        setPosition(null)
      }
    }

    if (showTooltip) {
      setPosition({
        x: rect.x + window.scrollX + rect.width / 2 - 160,
        y: rect.y + window.scrollY,
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
      <ChildrenWrapper ref={container} onMouseEnter={toggleTooltip} onMouseLeave={startTooltipTimer}>
        {props.children}
      </ChildrenWrapper>

      {showTooltip && position && (
        <Portal>
          <TooltipContainer
            x={position.x}
            y={position.y}
            onMouseEnter={clearTooltipTimer}
            onMouseLeave={startTooltipTimer}
          >
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

  height: fit-content;

  padding: 0;
  margin: 0;
`

const TooltipContainer = styled.article<{ x: number; y: number }>`
  position: absolute;

  width: 320px;

  z-index: 20;

  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  transform: translate(0, -100%);

  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  box-shadow: 0px 4px 4px rgba(138, 138, 164, 0.1);
  border-radius: 4px;

  padding: 1.5rem;

  header {
    ${text2}
    color: ${(props) => props.theme.launchpad.colors.text.title};
  }

  main {
    ${text7}

    color: ${(props) => props.theme.launchpad.colors.text.body};
  }

  a {
    color: ${(props) => props.theme.launchpad.colors.primary};
  }
`
