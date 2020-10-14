/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSODetails,
  OfferProps
} from 'v2/app/components/DSO/components/DSODetails'
import { asset, dso } from '__fixtures__/authorizer'
import EditableWithLabel from 'v2/components/form/HardLabelEditable'
import { formatMoney } from 'v2/helpers/numbers'

jest.mock('v2/components/form/HardLabelEditable', () => jest.fn(() => null))

describe('DSODetails', () => {
  const props: OfferProps = { dso: dso, currency: asset, editMode: false }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSODetails {...props} />)
  })

  it('renders without error if dso.totalFundraisingAmount is null', () => {
    render(
      <DSODetails {...props} dso={{ ...dso, totalFundraisingAmount: null }} />
    )
  })

  it('renders without error if dso.minimumInvestment is null', () => {
    render(<DSODetails {...props} dso={{ ...dso, minimumInvestment: null }} />)
  })

  it('renders EditableWithLabel with correct props', () => {
    render(<DSODetails {...props} />)

    expect(EditableWithLabel).toHaveBeenCalledTimes(5)
    expect(EditableWithLabel).toHaveBeenNthCalledWith(
      1,
      { label: 'Status', name: 'status', value: dso.status },
      {}
    )
    expect(EditableWithLabel).toHaveBeenNthCalledWith(
      2,
      {
        editMode: props.editMode,
        label: 'Capital Structure',
        name: 'capitalStructure',
        required: true,
        value: dso.capitalStructure
      },
      {}
    )
    expect(EditableWithLabel).toHaveBeenNthCalledWith(
      3,
      {
        editMode: props.editMode,
        label: 'Unit Price',
        name: 'pricePerUnit',
        raw: '1',
        required: true,
        value: formatMoney(dso.pricePerUnit, props.currency?.symbol)
      },
      {}
    )
    expect(EditableWithLabel).toHaveBeenNthCalledWith(
      4,
      {
        editMode: props.editMode,
        label: 'Total Fundraising Amount',
        name: 'totalFundraisingAmount',
        raw: dso.totalFundraisingAmount?.toString(),
        value: formatMoney(dso.totalFundraisingAmount, props.currency?.symbol)
      },
      {}
    )
    expect(EditableWithLabel).toHaveBeenNthCalledWith(
      5,
      {
        editMode: props.editMode,
        label: 'Minimum Investment',
        name: 'minimumInvestment',
        raw: dso.minimumInvestment?.toString(),
        value: formatMoney(dso.minimumInvestment, dso.tokenSymbol)
      },
      {}
    )
  })
})
