import { Trans } from '@lingui/macro'
import React, { useState, useRef, useEffect, ReactElement } from 'react'
import styled from 'styled-components'

interface ReadMoreProps {
  children: string | ReactElement
  more: string | ReactElement
  less: string | ReactElement
  lines?: number
}

export const ReadMoreButton = styled.a`
  display: inline-block;
  padding: 0;
  margin-left: 5px; // Space between text and button
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.bg26} !important;
  :hover {
    text-decoration: underline;
  }
  cursor: pointer;
`

const TextWrapper = styled.span<{ isExpanded: boolean; maxHeight: string }>`
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  max-height: ${({ isExpanded, maxHeight }) => (isExpanded ? 'none' : maxHeight)};
  transition: max-height 0.3s ease;
`

export const ReadMore: React.FC<ReadMoreProps> = ({ children, more, less, lines = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const contentRef = useRef<HTMLSpanElement | null>(null)

  const lineHeight = 1.3 // Assuming line-height is 1.2em
  const maxHeight = `${lines * lineHeight}em`

  const toggleLines = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (contentRef.current) {
      const actualHeight = contentRef.current.scrollHeight
      const maxCalculatedHeight = parseFloat(maxHeight) * 16 // Convert `em` to pixels, assuming 1em = 16px
      setIsButtonVisible(actualHeight > maxCalculatedHeight)
    }
  }, [children, maxHeight])

  return (
    <p>
      <TextWrapper ref={contentRef} isExpanded={isExpanded} maxHeight={maxHeight}>
        {children}
      </TextWrapper>

      {isButtonVisible && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <ReadMoreButton onClick={toggleLines}>
            <Trans>{isExpanded ? `${less}` : `${more}`}</Trans>
          </ReadMoreButton>
        </div>
      )}
    </p>
  )
}
