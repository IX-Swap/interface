import React from 'react'
import { Link } from '@mui/material'
// import { useGetExchangeRules } from 'app/pages/admin/hooks/useGetExchangeRules'
// import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import { API_URL } from 'config'

export const ExchangeRulesLink = () => {
  // const { data, isLoading } = useGetExchangeRules()

  // if (data === undefined || isLoading) {
  //   return null
  // }

  return (
    // <DownloadDocument
    //   documentId={data?._id}
    //   ownerId={data?.user}
    //   name={data?.originalFileName}
    //   action='view'
    // >
    //   {({ download }) => (
    <Link
      href={`${API_URL}/IXExchangeRules.pdf`}
      style={{ cursor: 'pointer' }}
      // onClick={download}
      sx={{
        // textDecoration: 'none',
        whiteSpace: 'nowrap'
        // color: '#778194'
      }}
      target='_blank'
      // rel='noopener noreferrer'
    >
      IX Exchange Rules
    </Link>
    //   )}
    // </DownloadDocument>
  )
}
