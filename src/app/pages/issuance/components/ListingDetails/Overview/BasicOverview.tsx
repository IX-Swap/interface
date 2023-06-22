import { WalletAddress } from 'app/components/WalletAddress'
import { formatDateToMMDDYY } from 'helpers/dates'
import React from 'react'
import { stoClassifications } from 'components/form/STOClassificationSelect'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface BasicOverviewProps {
  networkName: string
  capitalStructure: string
  launchDate: string
  completionDate: string
  decimals: string
  tokenAddress: string
  releaseDate: string
  classification: string
}

export const BasicOverview = ({
  networkName,
  capitalStructure,
  launchDate,
  completionDate,
  decimals,
  tokenAddress,
  releaseDate,
  classification
}: BasicOverviewProps) => {
  const classificationObj = stoClassifications.find(
    v => v.value === classification
  )
  const stoClassification =
    typeof classificationObj !== 'undefined'
      ? classificationObj?.label
      : classification

  const items = [
    {
      label: 'Network',
      value: networkName
    },
    {
      label: 'Capital Structure',
      value: capitalStructure
    },
    {
      label: 'Launch Date',
      value: formatDateToMMDDYY(launchDate)
    },
    {
      label: 'Completion Date',
      value: formatDateToMMDDYY(completionDate)
    },
    {
      label: 'Free-to-Trade Date',
      value: formatDateToMMDDYY(releaseDate)
    },
    {
      label: 'Decimal',
      value: decimals
    },
    {
      label: 'Token Address',
      value: <WalletAddress address={tokenAddress} />
    },
    {
      label: 'Classification',
      value: stoClassification
    }
  ]

  return <FieldGrid items={items} />
}
