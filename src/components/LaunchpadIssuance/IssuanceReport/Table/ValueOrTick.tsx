import React from 'react'

export const ValueOrTick = ({ children }: { children?: React.ReactNode }) => {
  return <>{children ? children : '-'}</>
}
