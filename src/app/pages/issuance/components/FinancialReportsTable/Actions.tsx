import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import React from 'react'
import { FinancialReport } from 'types/financitalReport'

export interface ActionsProps {
  item: FinancialReport
}

export const Actions = ({ item }: ActionsProps) => {
  return <DownloadDocument documentId={item.documentId} ownerId='' />
}
