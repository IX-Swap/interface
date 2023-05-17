import React from 'react'
import { Box } from '@mui/material'
import { Commitment } from 'types/commitment'
import { formatDateAndTime } from 'helpers/dates'
import { DSOLink } from 'app/components/DSOLink'
import { formatMoney } from 'helpers/numbers'
import { SubscriptionDocument } from 'app/components/SubscriptionDocument'
import { Maybe } from 'types/util'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { CommitmentIssuance } from 'app/components/CommitmentIssuance/CommitmentIssuance'
import { CommitmentWithdrawalAddress } from 'app/components/CommitmentWithdrawalAddress'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface CommitmentPreviewProps {
  data: Maybe<Commitment>
  isUserView?: boolean
}

export const CommitmentPreview: React.FC<CommitmentPreviewProps> = (
  props: CommitmentPreviewProps
) => {
  const { data, isUserView = false } = props

  useSetPageTitle(getOfferingName(data))

  if (data === null) {
    return null
  }

  const showTokenIssuance = !isUserView && data.status !== 'Rejected'

  const items = [
    {
      label: 'Company Name',
      value: data.dso.corporate.companyLegalName
    },
    {
      label: 'Issued By',
      value: data.dso.issuerName
    },
    {
      label: 'Issued Date',
      value: formatDateAndTime(data.dso.createdAt)
    },
    {
      label: 'Security Token',
      value: <DSOLink dso={data.dso} />
    },
    {
      label: 'Price Per Unit',
      value: formatMoney(data.dso.pricePerUnit, data.currency.symbol)
    },
    {
      label: 'Number Of Units',
      value: data.numberOfUnits
    },
    {
      label: 'Investment Structure',
      value: data.dso.investmentStructure
    },
    {
      label: 'Total Amount',
      value: formatMoney(data.totalAmount, data.currency.symbol)
    },
    {
      label: 'Blockchain Address',
      value: (
        <CommitmentWithdrawalAddress
          address={data.withdrawalAddress?.address}
        />
      )
    }
  ]

  return (
    <>
      <Box ml={3} mt={3}>
        <FieldGrid items={items} />
      </Box>
      {showTokenIssuance && <CommitmentIssuance data={data} />}
      <SubscriptionDocument document={data.signedSubscriptionDocument} />
    </>
  )
}
