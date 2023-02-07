import { JoinedCell, OverflowHeader, OverflowRaw, SpreadColumn } from './styled'
import React from 'react'

interface HeaderProps {
  header: string[]
}
export const Header = ({ header }: HeaderProps) => {
  return (
    <OverflowHeader count={header.length}>
      {header.map((title, index) => {
        if (index === 0) {
          return (
            <SpreadColumn key={title}>
              <span style={{ color: 'transparent' }}>Title</span>
              <JoinedCell>{title}</JoinedCell>
            </SpreadColumn>
          )
        }
        return <OverflowRaw key={title}>{title}</OverflowRaw>
      })}
    </OverflowHeader>
  )
}
