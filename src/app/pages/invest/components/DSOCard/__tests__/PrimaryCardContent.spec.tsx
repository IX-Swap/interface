import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import {
  PrimaryCardContent,
  PrimaryCardContentProps
} from 'app/pages/invest/components/DSOCard/PrimaryCardContent'
import { formatDateToDDMonYYYY } from 'helpers/dates'
import { percentageToNumber } from 'app/pages/issuance/utils/utils'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

const defaultLabeledValueProps = {
  isRedesigned: true,
  item: true,
  reverse: true,
  labelColor: 'gray',
  labelFontSize: 14,
  valueFontSize: 14
}

describe('PrimaryCardContent', () => {
  const props: PrimaryCardContentProps = { data: dso }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Closing Date with correct props', () => {
    render(<PrimaryCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        ...defaultLabeledValueProps,
        valueColor: 'default',
        label: 'Closing Date',
        value: formatDateToDDMonYYYY(dso.completionDate, true)
      },
      {}
    )
  })

  it('renders Expected Return with correct props when capitalStructure is not Debt', () => {
    render(<PrimaryCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        ...defaultLabeledValueProps,
        valueColor: 'default',
        align: 'right',
        label: 'Expected Return',
        value: percentageToNumber(dso.grossIRR)?.toFixed(2).concat('%')
      },
      {}
    )
  })

  it('renders Expected Return with correct props when capitalStructure is Debt', () => {
    render(
      <PrimaryCardContent
        {...{ data: { ...props.data, capitalStructure: 'Debt' } }}
      />
    )

    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      {
        ...defaultLabeledValueProps,
        valueColor: 'default',
        align: 'right',
        label: 'Expected Return',
        value: percentageToNumber(dso.interestRate)?.toFixed(2).concat('%')
      },
      {}
    )
  })

  it('renders Min. Investment with correct props', () => {
    render(<PrimaryCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        ...defaultLabeledValueProps,
        label: 'Min. Investment'
      }),
      {}
    )
  })

  it('renders Total Fundraising with correct props', () => {
    render(<PrimaryCardContent {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        ...defaultLabeledValueProps,
        align: 'right',
        reverse: true,
        label: 'Total Fundraising'
      }),
      {}
    )
  })
})
