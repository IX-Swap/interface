import React from 'react'
import { Link } from '@mui/material'
import { useGetExchangeRules } from 'app/pages/admin/hooks/useGetExchangeRules'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

export const ExchangeRulesLink = () => {
  const { data, isLoading } = useGetExchangeRules()

  if (data === undefined || isLoading) {
    return null
  }

  return (
    <DownloadDocument documentId={data._id} ownerId={data.user}>
      {({ download }) => (
        <Link onClick={download} target='_blank' rel='noopener noreferrer'>
          Exchange Rules
        </Link>
      )}
    </DownloadDocument>
  )
}
