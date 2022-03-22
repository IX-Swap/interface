import React, { Fragment } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'

export interface DSOViewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
  showSidebar?: boolean
}

export const DSOView = (props: DSOViewProps) => {
  const { data, showSidebar = false } = props

  useSetPageTitle(data.tokenName)

  return (
    <Fragment>
      <DSOBaseFieldsView dso={data} />
      <DSOPreview data={data} showSidebar={showSidebar} />
    </Fragment>
  )
}
