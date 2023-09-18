import { ButtonEmpty } from 'components/Button'
import React, { useState } from 'react'
import Truncate from 'react-truncate'
import styled from 'styled-components'

export const ReadMoreButton = styled(ButtonEmpty)`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  margin-left: 5px;
  color: ${({ theme }) => theme.bg26} !important;
  :hover {
    text-decoration: underline;
  }
`

export const ReadMore = ({
  children,
  more,
  less,
  lines = 3,
}: {
  children: string | React.ReactElement
  more: string | React.ReactElement
  less: string | React.ReactElement
  lines: number
}) => {
  const [truncated, setTruncated] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const handleTruncate = (truncatedChange: boolean) => {
    if (truncated !== truncatedChange) {
      setTruncated(truncatedChange)
    }
  }

  const toggleLines = (event: any) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  return (
    <div>
      <Truncate
        lines={!expanded && lines}
        ellipsis={
          <span>
            ...<ReadMoreButton onClick={toggleLines}>{more}</ReadMoreButton>
          </span>
        }
        onTruncate={handleTruncate}
      >
        {children}
      </Truncate>
      {!truncated && expanded && (
        <span>
          <ReadMoreButton onClick={toggleLines}>{less}</ReadMoreButton>
        </span>
      )}
    </div>
  )
}
