import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'app/components/DSO/DSOForm'
import { DSOView } from 'app/components/DSO/DSOView'

export interface DSOProps {
  dsoId?: string
  issuerId?: string
  isEditing?: boolean
  showAuthorizations?: boolean
  showSidebar?: boolean
}

export const DSO: React.FC<DSOProps> = (props: DSOProps) => {
  const {
    dsoId,
    issuerId,
    showSidebar = false,
    showAuthorizations = false,
    isEditing = false
  } = props
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  if (!isEditing) {
    return (
      <DSOView
        data={data}
        showAuthorizations={showAuthorizations}
        showSidebar={showSidebar}
      />
    )
  }

  return <DSOForm data={data} />
}
