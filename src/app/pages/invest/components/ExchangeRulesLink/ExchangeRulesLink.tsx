import { Link } from '@mui/material'
import { useGetExchangeRules } from 'app/pages/admin/hooks/useGetExchangeRules'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import React from 'react'

export const ExchangeRulesLink = () => {
  const { data, isLoading } = useGetExchangeRules()

  if (data === undefined || isLoading) {
    return null
  }

  return (
    <DownloadDocument
      documentId={data._id}
      ownerId={data.user}
      name={data?.originalFileName}
      action='view'
    >
      {({ download }) => (
        <Link onClick={download} target='_blank' rel='noopener noreferrer'>
          Exchange Rules
        </Link>
      )}
    </DownloadDocument>
  )
}
