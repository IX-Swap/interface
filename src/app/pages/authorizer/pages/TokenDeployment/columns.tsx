import React from 'react'
import { TableColumn } from 'types/util'
import { DigitalSecurityOffering } from 'types/dso'
import { formatDateToMMDDYY } from 'helpers/dates'
import {
  renderAmount,
  renderMinimumInvestment,
  ViewButton
} from 'helpers/tables'
import { Status } from 'ui/Status/Status'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

const View = ({
  tokenId,
  userId,
  status
}: {
  tokenId: string
  userId: string
  status: string
}) => {
  const location = useLocation()
  const splitted = location.pathname.split('/')
  const category = splitted[splitted.length - 1]

  return (
    <Box display={'flex'} gap={1}>
      <Status label={status} type={status.toLowerCase()} />
      <ViewButton
        href={`/app/authorizer/${category}/${userId}/${tokenId}/view`}
        title='View Token'
      />
    </Box>
  )
}

export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'tokenName',
    label: 'Security Token'
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'pricePerUnit',
    label: 'Unit Price',
    render: renderAmount
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'minimumInvestment',
    label: 'Minimum Investment',
    render: renderMinimumInvestment
  },
  {
    key: 'marketType',
    label: 'Market Type'
  },
  {
    key: 'deploymentStatus',
    label: 'Status',
    render: (status, row) => (
      <View tokenId={row._id} userId={row.user} status={status} key={row._id} />
    )
  }
]
