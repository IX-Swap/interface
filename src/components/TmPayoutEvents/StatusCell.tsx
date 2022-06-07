import React, { useMemo } from 'react'

import { StatusContainer } from './styleds'

interface Props {
  status: string
}

export const StatusCell = ({ status }: Props) => {
  const color = useMemo(() => {
    switch (status) {
      case 'announced': {
        return 'orange1'
      }
      case 'started': {
        return 'green2'
      }
      case 'ended': {
        return 'blue3'
      }
      case 'draft': {
        return 'transparent'
      }
      case 'scheduled': {
        return 'yellow4'
      }
      default: {
        return 'transparent'
      }
    }
  }, [status])

  const text = useMemo(() => {
    switch (status) {
      case 'announced': {
        return 'Announced'
      }
      case 'started': {
        return 'Started'
      }
      case 'ended': {
        return 'Ended'
      }
      case 'draft': {
        return 'Draft'
      }
      case 'scheduled': {
        return 'Scheduled'
      }
      default: {
        return status
      }
    }
  }, [status])

  return <StatusContainer color={color}>{text}</StatusContainer>
}
