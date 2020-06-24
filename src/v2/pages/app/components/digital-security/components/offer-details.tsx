import React from 'react'
import { formatMoney } from '../../../../../helpers/numbers'
import { Dso } from '../../../../../types/dso'
import { Asset } from '../../../../../types/asset'
import EditableWithLabel from '../../../../../components/form/hard-label-editable'

interface OfferProps {
  dso: Dso
  currency: Asset
  editMode?: boolean
}

const OfferDetails = ({ dso, currency, editMode = false }: OfferProps) => {
  return (
    <>
      <EditableWithLabel
        name='status'
        label='Status'
        value={dso.status}
      />
      <EditableWithLabel
        name='capitalStructure'
        editMode={editMode}
        label='Capital Structure'
        value={dso.capitalStructure}
      />
      <EditableWithLabel
        name='pricePerUnit'
        editMode={editMode}
        label='Unit Price'
        value={formatMoney(dso.pricePerUnit || 0, currency.symbol)}
        raw={`${dso.pricePerUnit || ''}`}
      />
      <EditableWithLabel
        name='totalFundraisingAmount'
        editMode={editMode}
        label='Total Fundraising Amount'
        value={formatMoney(dso.totalFundraisingAmount || 0, currency.symbol)}
        raw={`${dso.totalFundraisingAmount || ''}`}
      />
      <EditableWithLabel
        name='minimumInvestment'
        editMode={editMode}
        label='Minimum Investment'
        value={formatMoney(dso.minimumInvestment || 0, dso.tokenSymbol)}
        raw={`${dso.minimumInvestment || ''}`}
      />
    </>
  )
}

export default OfferDetails
