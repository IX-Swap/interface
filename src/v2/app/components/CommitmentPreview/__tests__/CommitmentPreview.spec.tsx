import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentPreview,
  CommitmentPreviewProps
} from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { commitment } from '__fixtures__/authorizer'
import { LabelledValue } from 'v2/components/LabelledValue'
import { formatDateAndTime } from 'v2/helpers/dates'
import { formatMoney } from 'v2/helpers/numbers'
import { Commitment } from 'v2/types/commitment'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))
jest.mock('v2/app/components/CommitmentIssuance/CommitmentIssuance', () => ({
  CommitmentIssuance: jest.fn(() => null)
}))

describe('CommitmentPreview', () => {
  const props: CommitmentPreviewProps = {
    data: commitment
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <CommitmentPreview
        data={{
          ...(props.data as Commitment),
          withdrawalAddress: undefined
        }}
      />
    )
  })

  it('renders nothing if data is null', () => {
    const { container } = render(<CommitmentPreview data={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders LabelledValue with correct props', () => {
    render(<CommitmentPreview {...props} />)

    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Company Name',
        value: props.data?.dso.corporate.companyLegalName
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Issued By', value: props.data?.dso.issuerName },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      {
        label: 'Issued Date',
        value: formatDateAndTime(props.data?.dso.createdAt ?? '')
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Digital Security', value: expect.anything() },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      {
        label: 'Price Per Unit',
        value: formatMoney(
          props.data?.dso.pricePerUnit as number,
          props.data?.currency.symbol
        )
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      { label: 'Number Of Units', value: props.data?.numberOfUnits },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      7,
      {
        label: 'Investment Structure',
        value: props.data?.dso.investmentStructure
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      8,
      {
        label: 'Total Amount',
        value: formatMoney(
          props.data?.totalAmount as number,
          props.data?.currency.symbol
        )
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      9,
      {
        label: 'Withdrawal Address',
        value: expect.anything()
      },
      {}
    )
  })
})
